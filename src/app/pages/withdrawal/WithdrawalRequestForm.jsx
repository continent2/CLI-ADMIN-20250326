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
import { CheckCircleIcon } from "@heroicons/react/24/outline/index.js";
import ReactSelect from "react-select";
import { formatNumberWithCommas } from "utils/formatNumberWithCommas.js";

export const initialState = {
  amountFrom: "",
  currencyFrom: "",
  isWithdrawal: "",
  amountTo: "",
  currencyTo: "",
  bankName: "",
  bankAccount: null,
  isCrypto: 0,
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
  const [selectedOption, setSelectedOption] = useState();

  const bankOptions = banks?.map((bank) => ({
    value: bank, // store the whole bank object
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src={bank.urllogo}
          alt={bank.banknameen}
          style={{ width: 20, height: 20 }}
        />
        {bank.banknameen}
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
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialState,
  });

  const isCrypto = getValues("isCrypto");
  const onSubmit = async (data) => {
    let payload = {
      amountfrom: "",
      currencyfrom: "",
      amount: data.amount,
      currency: data.isCrypto === 0 ? "USDT" : "KRW", // USDT for crypto, KRW for fiat
      bankid: "",
      bankname: data.isCrypto === 1 ? data.bankName : "",
      bankcode: "",
      bankaccount: data.isCrypto === 1 ? data.bankAccount : "",
      iscrypto: data.isCrypto,
      address: data.isCrypto === 0 ? data.address : "", // address only if crypto
      nettype: "",
      quotesignature: data.isCrypto === 0 ? data.quoteSignature : "", //quoteSignature only if crypto
    };

    try {
      const response = await axios.post(`/withdraw/request`, payload, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        timeout: 5000, // Timeout after 5 seconds
      });

      if (response.data.status === "OK") {
        setModalData((prev) => ({
          ...prev,
          message: response.data.message,
          color: "success", // Fixing typo
          title: "Success",
        }));
        setisModalVisible(true);
      } else {
        setModalData((prev) => ({
          ...prev,
          message: response.data.message,
          color: "error", // Fixing typo
          title: "Failed",
        }));
        setisModalVisible(true);
      }
    } catch (err) {
      setModalData((prev) => ({
        ...prev,
        message: err,
        color: "error",
        title: "Failed",
      }));
      setisModalVisible(true);
    }
  };

  function OnReceivedAddressChange(id) {
    const item = agencyBank.find((item) => item.id === +id);
    if (item) {
      setValue("address", item.address);
    }
  }

  function onReceivedAccountChange(id) {
    const item = agencyBank.find((item) => item.id === +id);
    if (item) {
      setValue("bankAccount", item.bankaccount);
    }
  }

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    bankInfo();
    agencyAccountInfo(isCrypto);
    withdrawInfo();
  }, []);

  useEffect(() => {
    agencyAccountInfo(isCrypto);
  }, [isCrypto]);

  useEffect(() => {
    if (withdraw) {
      setValue("amountField", formatNumberWithCommas(withdraw.amount));
      if (isCrypto === 0) {
        setValue("amountField", formatNumberWithCommas(withdraw.amount));
        setValue("amount", formatNumberWithCommas(withdraw.amount_in_base));
      } else if (isCrypto === 1) {
        setValue(
          "amountField",
          formatNumberWithCommas(withdraw.amount_in_quote),
        );
        setValue("amount", formatNumberWithCommas(withdraw.amount_in_quote));

        //sets the bankName byDefault first value
        if (bankOptions?.length > 0) {
          const firstBank = bankOptions[0];
          setSelectedOption(firstBank); // for ReactSelect UI
          setValue("bankName", firstBank.value.banknameen); // for your form schema
        }
      }
      setValue("quoteSignature", withdraw.quotesignature);
      setValue("isWithdrawal", withdraw.iswithdrawable ? "가능" : "불가능");
    }
  }, [withdraw, isCrypto, setValue]);

  return (
    <Page title="출금 요청">
      <div className="transition-content grid w-full grid-rows-[auto_1fr] px-[--margin-x] py-5">
        {/* <h2 className="py-6 pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:text-2xl">
          출금 요청
        </h2> */}

        <div>
          <div className="h-fit rounded-lg border border-none border-gray-200 bg-white p-[24px] shadow-sm dark:bg-dark-700 md:p-[38px] lg:p-[54px]">
            <div>
              {/*Form*/}
              <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                id="new-withdrawal-form"
              >
                <div className="flex flex-col gap-9 lg:flex-row">
                  <div className="flex w-full flex-col gap-5 rounded-lg border p-4 pb-5 dark:border-gray-600 lg:w-1/2">
                    {/*Amount*/}
                    <Input
                      placeholder=""
                      label="출금가능액"
                      {...register("amountField")}
                      error={errors?.amountField?.message}
                      disabled
                    />

                    {/*isWithdrawal*/}
                    <Input
                      placeholder=""
                      label="출금가능여부"
                      {...register("isWithdrawal")}
                      error={errors?.isWithdrawal?.message}
                      disabled
                    />

                    {/*isCrypto*/}
                  </div>
                  <div className="flex w-full flex-col gap-5 rounded-lg border p-4 pb-5 dark:border-gray-600 lg:w-1/2">
                    <div className="mx-auto">
                      <label className="col-span-2">출금종류</label>
                      <div className="col-span-10">
                        <div className="mt-1 flex">
                          <span className="label me-2">USDT</span>
                          <Switch
                            label="KRW"
                            checked={watch("isCrypto") === 1}
                            onChange={(e) =>
                              setValue("isCrypto", e.target.checked ? 1 : 0)
                            }
                            error={errors?.isCrypto?.message}
                          />
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

                    {/*USDT*/}
                    {/*Expected withdrawal amount*/}
                    {watch("isCrypto") === 0 && (
                      <>
                        {/*Recently received address*/}
                        {agencyBank && (
                          <Select
                            label="최근 받은 주소"
                            data={[
                              { label: "주소를 선택하세요", value: "" },
                              ...(agencyBank || [])
                                .filter((b) => b.address) // filters out falsy values like null, undefined, or empty string
                                .map((b) => ({
                                  label: b.address,
                                  value: b.id,
                                })),
                            ]}
                            onChange={(e) => {
                              const selected = agencyBank.find(
                                (b) => b.id === +e.target.value,
                              );
                              if (selected) {
                                OnReceivedAddressChange(selected.id);
                              }
                            }}
                            error={errors?.bankAddress?.message}
                          />
                        )}

                        <Input
                          placeholder=""
                          label={
                            <>
                              받는주소 <span className="text-red-500">*</span>
                            </>
                          }
                          {...register("address")}
                          error={errors?.address?.message}
                        />
                      </>
                    )}

                    {/*KRW*/}
                    {/*Expected withdrawal amount*/}
                    {watch("isCrypto") === 1 && (
                      <>
                        {/*Recently received account*/}
                        {agencyBank && (
                          <Select
                            label="최근받은계정"
                            data={[
                              { label: "계정을 선택하세요", value: "" },
                              ...(agencyBank || [])
                                .filter((b) => b.bankaccount) // filters out falsy values like null, undefined, or empty string
                                .map((b) => ({
                                  label: b.bankaccount,
                                  value: b.id,
                                })),
                            ]}
                            onChange={(e) => {
                              const selected = agencyBank.find(
                                (b) => b.id === +e.target.value,
                              );
                              if (selected) {
                                onReceivedAccountChange(selected.id);
                              }
                            }}
                            error={errors?.bankAccount?.message}
                          />
                        )}

                        {/*Receiving bank*/}
                        <label className="-mb-4">
                          받는은행 <span className="text-red-500">*</span>
                        </label>
                        <ReactSelect
                          options={bankOptions}
                          value={selectedOption}
                          onChange={(selected) => {
                            setSelectedOption(selected); // For select UI
                            setValue("bankName", selected.value.banknameen);
                          }}
                          classNames={{
                            control: () =>
                              "!rounded-lg !bg-transparent hover:!border-gray-400 dark:!border-dark-450",
                            singleValue: () => "text-black dark:text-dark-100",
                            input: () => "text-black dark:text-white",
                            option: ({ isFocused, isSelected }) =>
                              [
                                "text-black dark:text-white",
                                "bg-white dark:bg-dark-800", // ✅ background of dropdown options
                                isFocused && "bg-gray-100 dark:bg-gray-700",
                                isSelected && "bg-blue-500 text-white",
                              ]
                                .filter(Boolean)
                                .join(" "),
                            menu: () => "bg-white dark:bg-gray-800",
                            menuList: () => "bg-white dark:bg-gray-800",
                          }}
                        />

                        {/*Receiving account*/}
                        <Input
                          placeholder=""
                          label={
                            <>
                              받는계정 <span className="text-red-500">*</span>
                            </>
                          }
                          {...register("bankAccount")}
                          error={errors?.bankAccount?.message}
                        />
                      </>
                    )}
                  </div>
                </div>
                {/*Action buttons*/}
                <div className="mt-[24px] flex flex-col items-center justify-center gap-5 md:mt-[38px] md:flex-row lg:mt-[54px] lg:gap-7 rtl:space-x-reverse">
                  <Button className="w-[250px] min-w-[7rem] px-5 text-base font-medium">
                    취소
                  </Button>
                  <Button
                    type="submit"
                    className="w-[250px] min-w-[7rem] text-base font-medium"
                    color="primary"
                    disabled={!isValid}
                  >
                    확인
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/*modal*/}
      <Transition appear show={isModalVisible} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
          onClose={close}
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
