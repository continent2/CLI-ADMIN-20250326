import { Page } from "components/shared/Page";
import { Input, Button, Switch, Select } from "components/ui";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

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
import { toast } from "sonner";

export const initialState = {
  amountFrom: "",
  currencyFrom: "",
  amountTo: "",
  currencyTo: "",
  bankName: "",
  bankAccount: "",
  isCrypto: 1,
  address: "",
  netType: "",
  quoteSignature: "",
};

export default function WithdrawalRequestForm() {
  const token = localStorage.getItem("authToken");
  const { banks, bankInfo } = useAppDataContext();

  const [isModalVisible, setisModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    color: "",
    title: "",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });

  const onSubmit = async (data) => {
    const bankAccount = banks.find((item) => item.id === +data.bankName);
    const payload = {
      amountFrom: data.amountFrom,
      currencyFrom: data.currencyFrom,
      amountTo: data.amountFrom,
      currencyTo: data.currencyTo,
      bankName: bankAccount.banknameen,
      bankcode: bankAccount.code,
      bankAccount: data.bankAccount,
      isCrypto: data.isCrypto,
      address: data.address,
      netType: data.netType,
      quoteSignature: data.quoteSignature,
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

        toast.success("출금 요청이 성공적으로 접수되었습니다");
        setModalData((prev) => ({
          ...prev,
          message: response.data.message,
          color: "success", // Fixing typo
          title: "Success",
        }));
        setisModalVisible(true);
      } else {

        toast.error("출금 요청 처리 중 오류가 발생했습니다");
        setModalData((prev) => ({
          ...prev,
          message: response.data.message,
          color: "error", // Fixing typo
          title: "Failed",
        }));
        setisModalVisible(true);
      }
    } catch (err) {

      toast.error("출금 요청 처리 중 오류가 발생했습니다");
      setModalData((prev) => ({
        ...prev,
        message: err,
        color: "error",
        title: "Failed",
      }));
      setisModalVisible(true);
    }
  };

  useEffect(() => {
    bankInfo();
  }, []);

  return (
    <Page title="출금 요청">
      <div className="transition-content grid w-full grid-rows-[auto_1fr] px-[--margin-x] pb-8">
        <h2 className="py-6 pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:text-2xl">
          출금 요청
        </h2>

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
                  <div className="flex w-full flex-col gap-5 rounded-lg border p-4 dark:border-gray-600 lg:w-1/2">
                    {/*Amount From*/}
                    <Input
                      placeholder=""
                      label="보내는 금액"
                      {...register("amountFrom")}
                      error={errors?.amountFrom?.message}
                    />

                    {/*Currency From*/}
                    <Input
                      placeholder=""
                      label="보내는 통화"
                      {...register("currencyFrom")}
                      error={errors?.currencyFrom?.message}
                    />

                    {/*Amount to*/}
                    <Input
                      placeholder=""
                      label="받는 금액"
                      {...register("amountTo")}
                      error={errors?.amountTo?.message}
                    />

                    {/*Currency to*/}
                    <Input
                      placeholder=""
                      label="받는 통화"
                      {...register("currencyTo")}
                      error={errors?.currencyTo?.message}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-5 rounded-lg border p-4 dark:border-gray-600 lg:w-1/2">
                    <Select
                      label="은행명"
                      data={[
                        { label: "은행을 선택해주세요", value: "" },
                        ...(banks || []).map((b) => ({
                          label: b.banknameen,
                          value: b.id,
                        })),
                      ]}
                      {...register("bankName")}
                      error={errors?.bankName?.message}
                    />

                    {/*Bank account*/}
                    <Input
                      placeholder=""
                      label="계좌번호"
                      {...register("bankAccount")}
                      error={errors?.bankAccount?.message}
                    />

                    <div>
                      <label className="col-span-2">
                        암호화폐 여부 (0 또는 1
                      </label>
                      <div className="col-span-10">
                        <div className="mt-1 flex">
                          <span className="label me-2">KWR</span>
                          <Switch
                            defaultChecked
                            label="USDT"
                            {...register("isCrypto")}
                            error={errors?.bankName?.message}
                          />
                        </div>
                      </div>
                    </div>

                    {/*Address*/}
                    <Input
                      placeholder=""
                      label="주소"
                      {...register("address")}
                      error={errors?.address?.message}
                    />

                    {/*Net type*/}
                    <Input
                      placeholder=""
                      label="네트워크 유형"
                      {...register("netType")}
                      error={errors?.netType?.message}
                    />

                    {/*Quote signature*/}
                    <Input
                      placeholder=""
                      label="서명 값"
                      {...register("quoteSignature")}
                      error={errors?.quoteSignature?.message}
                    />
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
