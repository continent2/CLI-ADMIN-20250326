import { Page } from "components/shared/Page.jsx";
import { Input, Button, Switch, Select, Card } from "components/ui/index.js";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
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
import { formatNumberWithCommas } from "utils/formatNumberWithCommas.js";
import { toast } from "sonner";
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
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedAgencyBank, setSelectedAgencyBank] = useState("");
  const [selectedAccountOption, setSelectedAccountOption] = useState("");

  const bankOptions = banks?.map((bank) => ({
    value: bank,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src={bank.urllogo || "/images/dummy-bank.png"}
          alt={bank.banknamenative}
          style={{ width: 20, height: 20 }}
          onError={(e) => {
            e.currentTarget.src = "/images/dummy-bank.png";
          }}
        />
        {bank.banknamenative}
      </div>
    ),
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
    resetField,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialState,
  });

  const isCrypto = getValues("isCrypto");
  const isWithdrawal = getValues("isWithdrawal") === "가능";
  const isDisabled = !isWithdrawal;
  const tooltipMessage =
    "출금 가능한 금액이 없거나 선행하는 출금 건이 진행 중입니다";

  const DisabledInfoIcon = () => (
    <span
      data-tooltip-id="withdrawal-disabled-tooltip"
      data-tooltip-content={tooltipMessage}
      className="ml-2 inline-flex items-center text-gray-400"
    >
      <InformationCircleIcon className="h-5 w-5" />
    </span>
  );

  const onSubmit = async (data) => {
    if (isDisabled) return;

    const payload = {
      amount: "12052.424",
      currency: data.isCrypto === 1 ? "USDT" : "KRW",
      iscrypto: data.isCrypto,
      bankid:
        data.isCrypto === 0
          ? agencyBank.find(
            (bank) => data.bankName === bank["bank.banknamenative"],
          )["bank.id"]
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
        setModalData((prev) => ({
          ...prev,
          message: response.data.message,
          color: "error",
          title: "Failed",
        }));
        setisModalVisible(true);
        toast.error("Fail");
      } else {
        setModalData((prev) => ({
          ...prev,
          message: response.data.message,
          color: "success",
          title: "Success",
        }));
        setisModalVisible(true);
        toast.success("Success");
      }
    } catch (err) {
      setModalData((prev) => ({
        ...prev,
        message: err,
        color: "error",
        title: "Failed",
      }));
      setisModalVisible(true);
      toast.error("Error");
    }
  };

  function OnReceivedAddressChange(id) {
    const item = agencyBank.find((item) => item.id === +id);
    if (item) {
      setValue("address", item.address, { shouldValidate: true });
    }
  }

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
        setValue(
          "amountField",
          formatNumberWithCommas(withdraw.amount, { shouldValidate: true }),
        );
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
      value: b,
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={b["bank.urllogo"] || "/images/dummy-bank.png"}
            alt={b.banknamenative}
            style={{ width: 20, height: 20 }}
            onError={(e) => {
              e.currentTarget.src = "/images/dummy-bank.png";
            }}
          />
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <div className="text-xs text-gray-500">
              {b["bank.banknamenative"]}
            </div>{" "}
            - <div className="text-xs text-gray-500">{b["bankaccount"]}</div>
          </div>
        </div>
      ),
      raw: b,
    }));

  return (
    <Card>
      <Page title="출금 요청">
        <Tooltip id="withdrawal-disabled-tooltip" />
        <div className="transition-content grid w-full grid-rows-[auto_1fr] pb-8">
          <h2 className="px-5 pt-5 text-sm font-medium tracking-wide text-gray-800 dark:text-dark-50">
            출금 요청
          </h2>

          <div>
            <div className="h-fit rounded-lg border border-none border-gray-200 bg-white shadow-sm dark:bg-dark-700">
              <div className="p-2">
                <form
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                  id="new-withdrawal-form"
                >
                  <div className="flex flex-col">
                    <div className="flex w-full flex-col gap-5 rounded-lg p-4 pb-5">
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
                                  setValue(
                                    "isCrypto",
                                    e.target.checked ? 0 : 1,
                                    { shouldValidate: true },
                                  );
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
                    <div className="flex w-full flex-col gap-5 rounded-lg p-4 pb-5">
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
                              <div className="-mb-4 flex items-center">
                                <label className="">최근 받은 주소</label>
                                {isDisabled && <DisabledInfoIcon />}
                              </div>
                              <ReactSelect
                                options={[
                                  ...(agencyBank || [])
                                    .filter((b) => b.address)
                                    .map((b) => ({
                                      label: b.address,
                                      value: b.id,
                                    })),
                                ]}
                                value={selectedAgencyBank}
                                placeholder="주소를 선택하세요"
                                onChange={(item) => {
                                  if (!isDisabled) {
                                    setSelectedAgencyBank(item);
                                    const selected = agencyBank.find(
                                      (b) => b?.id === item?.value,
                                    );
                                    if (selected) {
                                      OnReceivedAddressChange(selected.id);
                                    }
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
                                      isFocused &&
                                      "bg-gray-100 dark:bg-gray-700",
                                      isSelected && "bg-blue-500 text-white",
                                    ]
                                      .filter(Boolean)
                                      .join(" "),
                                  menu: () => "bg-white dark:bg-gray-800",
                                  menuList: () => "bg-white dark:bg-gray-800",
                                }}
                                isDisabled={isDisabled}
                              />
                            </>
                          )}

                          <div className="-mb-4 flex items-center">
                            <label className="">
                              받는주소 <span className="text-red-500">*</span>
                            </label>
                            {isDisabled && <DisabledInfoIcon />}
                          </div>
                          <Input
                            placeholder=""
                            {...register("address")}
                            error={errors?.address?.message}
                            disabled={isDisabled}
                          />
                        </>
                      )}

                      {watch("isCrypto") === 0 && (
                        <>
                          {agencyBank && (
                            <>
                              <div className="-mb-4 flex items-center">
                                <label className="">최근받은계정</label>
                                {isDisabled && <DisabledInfoIcon />}
                              </div>
                              <ReactSelect
                                options={receivedAccountOptions}
                                placeholder="계정을 선택하세요"
                                onChange={(selected) => {
                                  setSelectedAccountOption(selected);
                                  setValue(
                                    "bankAccount",
                                    selected.value["bankaccount"],
                                    { shouldValidate: true },
                                  );
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
                                      isFocused &&
                                      "bg-gray-100 dark:bg-gray-700",
                                      isSelected && "bg-blue-500 text-white",
                                    ]
                                      .filter(Boolean)
                                      .join(" "),
                                  menu: () => "bg-white dark:bg-gray-800",
                                  menuList: () => "bg-white dark:bg-gray-800",
                                }}
                                isDisabled={isDisabled}
                              />
                            </>
                          )}

                          <div className="-mb-4 flex items-center">
                            <label className="">
                              받는은행 <span className="text-red-500">*</span>
                            </label>
                            {isDisabled && <DisabledInfoIcon />}
                          </div>
                          <ReactSelect
                            options={bankOptions}
                            value={selectedOption}
                            onChange={(selected) => {
                              setSelectedOption(selected);
                              setValue(
                                "bankName",
                                selected.value["banknamenative"],
                                { shouldValidate: true },
                              );
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

                          <div className="-mb-4 flex items-center">
                            <label className="">
                              받는계정 <span className="text-red-500">*</span>
                            </label>
                            {isDisabled && <DisabledInfoIcon />}
                          </div>
                          <Input
                            placeholder=""
                            {...register("bankAccount")}
                            error={errors?.bankAccount?.message}
                            disabled={isDisabled}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-[14px] flex items-center justify-center gap-2 px-4 rtl:space-x-reverse">
                    <Button
                      onClick={() => {
                        resetField("bankAccount");
                        setSelectedOption(null);
                        resetField("address");
                        resetField("value");
                        setSelectedAgencyBank(null);
                        setSelectedAccountOption(null);
                      }}
                      className="min-w-1/2 flex-1 px-5 text-base font-medium"
                    >
                      취소
                    </Button>
                    <div className="flex items-center">
                      <Button
                        type="submit"
                        className="min-w-1/2 flex-1 text-base font-medium"
                        color="primary"
                        disabled={!isValid || isDisabled}
                      >
                        확인
                      </Button>
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
    </Card>
  );
}
