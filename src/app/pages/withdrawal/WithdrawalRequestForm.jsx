import { Page } from "components/shared/Page.jsx";
import { Input, Button, Switch, Select } from "components/ui/index.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema.js";
import { useAppDataContext } from "../../contexts/appData/context.js";
import { Fragment, useEffect, useState } from "react";
import axios from "../../../utils/axios.js";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline/index.js";
import ReactSelect from "react-select";
import {
  formatNumberWithCommas,
  unformatNumberWithCommas,
} from "utils/formatNumberWithCommas.js";
import { Tooltip } from "components/shared/Tooltip";

export const initialState = {
  amountFrom: "",
  currencyFrom: "",
  isWithdrawal: "",
  amountTo: "",
  currencyTo: "",
  bankName: "",
  bankAccount: null,
  isCrypto: 1,
  address: "",
  netType: "",
  quoteSignature: "",
};

export default function WithdrawalRequestForm() {
  const token = localStorage.getItem("authToken");
  const {
    bankInfo,
    agencyBank,
    banks,
    withdraw,
    agencyAccountInfo,
    withdrawInfo,
  } = useAppDataContext();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAgencyBank, setSelectedAgencyBank] = useState(null);
  const [selectedAccountOption, setSelectedAccountOption] = useState(null);

  const bankOptions = banks?.map((bank) => ({
    value: bank.id,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src={bank.urllogo || "/images/dummy-bank.png"}
          alt={bank.banknamenative || "Bank logo"}
          style={{ width: 20, height: 20 }}
          onError={(e) => {
            e.currentTarget.src = "/images/dummy-bank.png";
          }}
        />
        {bank.banknamenative}
      </div>
    ),
    bankData: bank,
  }));

  const [isModalVisible, setisModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    color: "",
    title: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid },
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: initialState,
  });

  const isCrypto = getValues("isCrypto");
  const isWithdrawal = getValues("isWithdrawal") === "가능";
  const isDisabled = !isWithdrawal;
  const tooltipMessage =
    "출금 가능한 금액이 없거나 선행하는 출금 건이 진행 중입니다";

  const onSubmit = async (data) => {
    if (isDisabled) return;

    const payload = {
      amount: unformatNumberWithCommas(data.amount),
      currency: data.isCrypto === 1 ? "USDT" : "KRW",
      iscrypto: data.isCrypto,
      bankid:
        data.isCrypto === 0
          ? agencyBank.find(
              (bank) => data.bankName === bank["bank.banknamenative"],
            )?.["bank.id"]
          : "",
      bankname: data.isCrypto === 0 ? data.bankName : "",
      bankaccount: data.isCrypto === 0 ? data.bankAccount : "",
      address: data.isCrypto === 1 ? data.address : "",
      quotesignature: data.quoteSignature,
    };

    try {
      const response = await axios.post(`/withdraw/request`, payload, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === "ERR") {
        setModalData({
          message: response.data.message,
          color: "error",
          title: "Failed",
        });
        setisModalVisible(true);
      } else {
        setModalData({
          message: response.data.message,
          color: "success",
          title: "Success",
        });
        setisModalVisible(true);
      }
    } catch (err) {
      setModalData({
        message: err.message,
        color: "error",
        title: "Failed",
      });
      setisModalVisible(true);
    }
  };

  function OnReceivedAddressChange(id) {
    const item = agencyBank.find((item) => item.id === +id);
    if (item) {
      setValue("address", item.address, { shouldValidate: true });
    }
  }

  useEffect(() => {
    bankInfo();
    withdrawInfo();
  }, []);

  useEffect(() => {
    agencyAccountInfo(isCrypto);
  }, [isCrypto]);

  useEffect(() => {
    if (withdraw) {
      setValue("amountField", formatNumberWithCommas(withdraw.amount), {
        shouldValidate: true,
      });
      setValue("quoteSignature", withdraw.quotesignature, {
        shouldValidate: true,
      });

      if (isCrypto === 1) {
        setValue("amountField", formatNumberWithCommas(withdraw.amount), {
          shouldValidate: true,
        });
        setValue("amount", formatNumberWithCommas(withdraw.amount_in_base), {
          shouldValidate: true,
        });
      } else if (isCrypto === 0) {
        setValue(
          "amountField",
          formatNumberWithCommas(withdraw.amount_in_quote),
          { shouldValidate: true },
        );
        setValue("amount", formatNumberWithCommas(withdraw.amount_in_quote), {
          shouldValidate: true,
        });
      }

      setValue("isWithdrawal", withdraw.iswithdrawable ? "가능" : "불가능", {
        shouldValidate: true,
      });
    }
  }, [withdraw, isCrypto, setValue]);

  const receivedAccountOptions = agencyBank
    ?.filter((b) => b.bankaccount)
    .map((b) => ({
      value: b.id,
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={b["bank.urllogo"] || "/images/dummy-bank.png"}
            alt={b["bank.banknamenative"] || "Bank logo"}
            style={{ width: 20, height: 20 }}
            onError={(e) => {
              e.currentTarget.src = "/images/dummy-bank.png";
            }}
          />
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <div className="text-xs text-gray-500">
              {b["bank.banknamenative"]}
            </div>{" "}
            - <div className="text-xs text-gray-500">{b.bankaccount}</div>
          </div>
        </div>
      ),
      bankData: b,
    }));

  const DisabledInfoIcon = () => (
    <span
      data-tooltip-id="withdrawal-disabled-tooltip"
      data-tooltip-content={tooltipMessage}
      className="ml-2 inline-flex items-center text-gray-400"
    >
      <InformationCircleIcon className="h-5 w-5" />
    </span>
  );

  return (
    <Page title="출금 요청">
      <Tooltip id="withdrawal-disabled-tooltip" />

      <div className="transition-content grid w-full grid-rows-[auto_1fr] px-[--margin-x] py-5">
        <div className="space-y-4">
          {/* <div className="space-y-2"> */}
          {/*   <h2 className="mb-2 text-base font-semibold"> */}
          {/*     폼 작성 전 참고사항 💡 */}
          {/*   </h2> */}
          {/*   <ul className="list-disc space-y-1 pl-5"> */}
          {/*     <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li> */}
          {/*     <li> */}
          {/*       Ut enim ad minim veniam, quis nostrud exercitation ullamco */}
          {/*       laboris. */}
          {/*     </li> */}
          {/*     <li> */}
          {/*       Duis aute irure dolor in reprehenderit in voluptate velit esse */}
          {/*       cillum. */}
          {/*     </li> */}
          {/*   </ul> */}
          {/* </div> */}
          <div className="h-fit rounded-lg border border-none border-gray-200 bg-white p-[24px] shadow-sm dark:bg-dark-900 md:p-[38px] lg:p-[54px]">
            <div>
              <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                id="new-withdrawal-form"
              >
                <div className="flex flex-col gap-9 lg:flex-row">
                  <div className="flex w-full flex-col gap-5 rounded-lg border p-4 pb-5 dark:border-gray-800 lg:w-1/2">
                    <Input
                      placeholder=""
                      label="출금가능액"
                      {...register("amountField")}
                      error={errors?.amountField?.message}
                      disabled
                    />

                    <Input
                      placeholder=""
                      label="출금가능여부"
                      {...register("isWithdrawal")}
                      error={errors?.isWithdrawal?.message}
                      disabled
                    />
                  </div>

                  <div className="flex w-full flex-col gap-5 rounded-lg border p-4 pb-5 dark:border-gray-800 lg:w-1/2">
                    <div className="mx-auto">
                      <label className="col-span-2">출금종류</label>
                      <div className="col-span-10">
                        <div className="mt-1 flex items-center">
                          <span className="label me-2">USDT</span>
                          <div className="flex items-center">
                            <Switch
                              label="KRW"
                              checked={watch("isCrypto") === 0}
                              onChange={(e) => {
                                if (!isDisabled) {
                                  setValue(
                                    "isCrypto",
                                    e.target.checked ? 0 : 1,
                                    {
                                      shouldValidate: true,
                                    },
                                  );
                                }
                              }}
                              error={errors?.isCrypto?.message}
                              disabled={isDisabled}
                            />
                            {isDisabled && <DisabledInfoIcon />}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Input
                      placeholder=""
                      label={
                        <>
                          예상출금액<span className="text-red-500">*</span>
                        </>
                      }
                      {...register("amount")}
                      error={errors?.amount?.message}
                      disabled
                    />

                    {watch("isCrypto") === 1 && (
                      <>
                        {agencyBank && (
                          <>
                            <div className="-mb-3 flex items-center">
                              <label className="">최근 받은 주소</label>
                              {isDisabled && <DisabledInfoIcon />}
                            </div>
                            {/* <div */}
                            {/*   data-tooltip-id="withdrawal-disabled-tooltip" */}
                            {/*   data-tooltip-content={tooltipMessage} */}
                            {/* > */}
                            <ReactSelect
                              options={agencyBank
                                .filter((b) => b.address)
                                .map((b) => ({
                                  value: b.id,
                                  label: b.address,
                                  bankData: b,
                                }))}
                              value={selectedAgencyBank}
                              getOptionValue={(option) => option.value}
                              placeholder="주소를 선택하세요"
                              onChange={(item) => {
                                if (!isDisabled) {
                                  setSelectedAgencyBank(item);
                                  OnReceivedAddressChange(item.value);
                                }
                              }}
                              classNames={{
                                control: () =>
                                  "!rounded-lg !bg-transparent hover:!border-gray-400 dark:!border-dark-450",
                                singleValue: () =>
                                  "text-black dark:text-dark-100",
                                input: () => "text-black dark:text-white",
                                option: ({ isFocused, isSelected }) =>
                                  [
                                    "text-black dark:text-white",
                                    "bg-white dark:bg-dark-800",
                                    isFocused && "bg-gray-100 dark:bg-gray-700",
                                    isSelected && "bg-blue-500 text-white",
                                  ]
                                    .filter(Boolean)
                                    .join(" "),
                                menu: () => "bg-white dark:bg-gray-800",
                                menuList: () => "bg-white dark:bg-gray-800",
                              }}
                              isDisabled={isDisabled}
                            />
                            {/* </div> */}
                          </>
                        )}

                        <div className="-mb-3 flex items-center">
                          <label className="">
                            받는주소 <span className="text-red-500">*</span>
                          </label>
                          {isDisabled && <DisabledInfoIcon />}
                        </div>
                        {/* <div */}
                        {/* data-tooltip-id="withdrawal-disabled-tooltip" */}
                        {/*   data-tooltip-content={tooltipMessage} */}
                        {/* > */}
                        <Input
                          placeholder=""
                          {...register("address")}
                          error={errors?.address?.message}
                          disabled={isDisabled}
                        />
                        {/*   </div> */}
                      </>
                    )}

                    {watch("isCrypto") === 0 && (
                      <>
                        {agencyBank && (
                          <>
                            <div className="-mb-3 flex items-center">
                              <label className="">최근받은계정</label>
                              {isDisabled && <DisabledInfoIcon />}
                            </div>
                            {/* <div */}
                            {/*   data-tooltip-id="withdrawal-disabled-tooltip" */}
                            {/*   data-tooltip-content={tooltipMessage} */}
                            {/* > */}
                            <ReactSelect
                              options={receivedAccountOptions}
                              value={selectedAccountOption}
                              getOptionValue={(option) => option.value}
                              placeholder="계정을 선택하세요"
                              onChange={(selected) => {
                                if (!isDisabled) {
                                  setSelectedAccountOption(selected);
                                  setValue(
                                    "bankAccount",
                                    selected.bankData.bankaccount,
                                    { shouldValidate: true },
                                  );
                                }
                              }}
                              classNames={{
                                control: () =>
                                  "!rounded-lg !bg-transparent hover:!border-gray-400 dark:!border-dark-450",
                                singleValue: () =>
                                  "text-black dark:text-dark-100",
                                input: () => "text-black dark:text-white",
                                option: ({ isFocused, isSelected }) =>
                                  [
                                    "text-black dark:text-white",
                                    "bg-white dark:bg-dark-800",
                                    isFocused && "bg-gray-100 dark:bg-gray-700",
                                    isSelected && "bg-blue-500 text-white",
                                  ]
                                    .filter(Boolean)
                                    .join(" "),
                                menu: () => "bg-white dark:bg-gray-800",
                                menuList: () => "bg-white dark:bg-gray-800",
                              }}
                              isDisabled={isDisabled}
                            />
                            {/* </div> */}
                          </>
                        )}

                        <div className="-mb-3 flex items-center">
                          <label className="">
                            받는은행 <span className="text-red-500">*</span>
                          </label>
                          {isDisabled && <DisabledInfoIcon />}
                        </div>
                        {/* <div */}
                        {/*   data-tooltip-id="withdrawal-disabled-tooltip" */}
                        {/*   data-tooltip-content={tooltipMessage} */}
                        {/* > */}
                        <ReactSelect
                          options={bankOptions}
                          value={selectedOption}
                          getOptionValue={(option) => option.value}
                          onChange={(selected) => {
                            if (!isDisabled) {
                              setSelectedOption(selected);
                              setValue(
                                "bankName",
                                selected.bankData.banknamenative,
                                {
                                  shouldValidate: true,
                                },
                              );
                            }
                          }}
                          classNames={{
                            control: () =>
                              "!rounded-lg !bg-transparent hover:!border-gray-400 dark:!border-dark-450",
                            singleValue: () => "text-black dark:text-dark-100",
                            input: () => "text-black dark:text-white",
                            option: ({ isFocused, isSelected }) =>
                              [
                                "text-black dark:text-white",
                                "bg-white dark:bg-dark-800",
                                isFocused && "bg-gray-100 dark:bg-gray-700",
                                isSelected && "bg-blue-500 text-white",
                              ]
                                .filter(Boolean)
                                .join(" "),
                            menu: () => "bg-white dark:bg-gray-800",
                            menuList: () => "bg-white dark:bg-gray-800",
                          }}
                          isDisabled={isDisabled}
                        />
                        {/* </div> */}

                        <div className="-mb-3 flex items-center">
                          <label className="">
                            받는계정 <span className="text-red-500">*</span>
                          </label>
                          {isDisabled && <DisabledInfoIcon />}
                        </div>
                        {/* <div */}
                        {/*   data-tooltip-id="withdrawal-disabled-tooltip" */}
                        {/*   data-tooltip-content={tooltipMessage} */}
                        {/* > */}
                        <Input
                          placeholder=""
                          {...register("bankAccount")}
                          error={errors?.bankAccount?.message}
                          disabled={isDisabled}
                        />
                        {/* </div> */}
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-[24px] flex flex-col items-center justify-center gap-5 md:mt-[38px] md:flex-row lg:mt-[54px] lg:gap-7 rtl:space-x-reverse">
                  <Button
                    className="w-[250px] min-w-[7rem] px-5 text-base font-medium"
                    onClick={() => {
                      resetField("bankAccount");
                      setSelectedOption(null);
                      resetField("address");
                      resetField("value");
                      setSelectedAgencyBank(null);
                      setSelectedAccountOption(null);
                    }}
                  >
                    취소
                  </Button>
                  <div className="flex items-center">
                    <div
                      data-tooltip-id="withdrawal-disabled-tooltip"
                      data-tooltip-content={tooltipMessage}
                    >
                      <Button
                        type="submit"
                        className="w-[250px] min-w-[7rem] text-base font-medium"
                        color="primary"
                        disabled={!isValid || isDisabled}
                      >
                        확인
                      </Button>
                    </div>
                    {isDisabled && <DisabledInfoIcon />}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={isModalVisible} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
          onClose={() => setisModalVisible(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-gray-900/50 transition-opacity dark:bg-black/40" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel className="scrollbar-sm relative flex min-w-[400px] max-w-md flex-col overflow-y-auto rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-dark-700 sm:px-5">
              <CheckCircleIcon
                className={`mx-auto inline size-28 shrink-0 text-${modalData.color}`}
              />

              <div className="mt-4">
                <DialogTitle
                  as="h3"
                  className="text-2xl text-gray-800 dark:text-dark-100"
                >
                  {modalData.title}
                </DialogTitle>

                <p className="mt-2">{modalData.message}</p>
                <Button
                  onClick={() => setisModalVisible(false)}
                  color={modalData.color}
                  className="mt-6"
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </Page>
  );
}
