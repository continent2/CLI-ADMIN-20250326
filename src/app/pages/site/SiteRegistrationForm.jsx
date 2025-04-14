import { Page } from "components/shared/Page";
import { Input, Button, Switch } from "components/ui";
import ReactSelect from "react-select";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema.js";
import { useAppDataContext } from "../../contexts/appData/context.js";
import axios from "../../../utils/axios.js";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline/index.js";

const initialState = {
  siteUrl: "",
  SocialGroupId: "",
  managerSocialId: "",
  isCrypto: 1,
  isReceiveAgencyOrSite: 1,
  bankName: "",
  bankId: "",
  address: "",
};

export default function SiteRegistrationForm() {
  const token = localStorage.getItem("authToken");
  const { banks, bankInfo } = useAppDataContext();
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
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialState,
  });

  const onSubmit = async (data) => {
    const bankAccount = banks.find((item) => item.id === +data.bankName);
    const payload = {
      siteurl: data.siteUrl,
      socialgroupid: data.SocialGroupId,
      managersocialid: data.managerSocialId,
      iscrypto: data.isCrypto,
      isreceiveagencyorsite: data.isReceiveAgencyOrSite,
      bankname: bankAccount.banknameen,
      bankaccount: data.bankAccount,
      bankid: bankAccount.id,
      address: data.address,
    };
    try {
      const response = await axios.post(`/query/item/site`, payload, {
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

  useEffect(() => {
    bankInfo();
  }, []);

  return (
    <Page title="사이트를 등록하세요">
      <div className="transition-content grid w-full grid-rows-[auto_1fr] px-[--margin-x] pb-8">
        <h2 className="py-6 pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:text-2xl">
          사이트를 등록하세요
        </h2>

        <div>
          <div className="h-fit rounded-lg border border-none border-gray-200 bg-white p-[24px] shadow-sm dark:bg-dark-700 md:p-[38px] lg:p-[54px]">
            <div>
              {/*Form*/}
              <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                id="new-site-form"
              >
                <div className="flex flex-col gap-9 md:flex-row">
                  <div className="flex w-full flex-col gap-5 rounded-lg border p-4 pb-5 dark:border-gray-600 md:w-1/2">
                    {/*SiteList URL*/}
                    <Input
                      placeholder="사이트 URL 값"
                      label={
                        <>
                          사이트 URL <span className="text-red-500">*</span>
                        </>
                      }
                      {...register("siteUrl")}
                      error={errors?.siteUrl?.message}
                    />
                    {/*SocialGroupId*/}
                    <Input
                      placeholder="소셜 그룹 ID"
                      label="소셜 그룹 ID"
                      {...register("SocialGroupId")}
                      error={errors?.SocialGroupId?.message}
                    />

                    {/*managerSocialId*/}
                    <Input
                      placeholder="관리자 소셜 ID"
                      label="관리자 소셜 ID"
                      {...register("managerSocialId")}
                      error={errors?.managerSocialId?.message}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-5 rounded-lg border p-4 pb-5 dark:border-gray-600 md:w-1/2">
                    <div className="mx-auto">
                      {/*deposit type*/}
                      <label className="col-span-2">기본 입금 유형</label>
                      <div className="col-span-10">
                        <div className="mt-1 flex">
                          <span className="label me-2">KRW</span>
                          <Switch
                            label="USDT"
                            checked={watch("isCrypto") === 1} // convert to boolean for checked prop
                            onChange={(e) =>
                              setValue("isCrypto", e.target.checked ? 1 : 0)
                            }
                            error={errors?.isCrypto?.message}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto">
                      {/*DepositList address*/}
                      <label className="col-span-2">입금주소</label>
                      <div className="col-span-10">
                        <div className="mt-1 flex">
                          <span className="label me-2">에이전시</span>
                          <Switch
                            label="사이트"
                            checked={watch("isReceiveAgencyOrSite") === 2} //
                            onChange={(e) =>
                              setValue(
                                "isReceiveAgencyOrSite",
                                e.target.checked ? 2 : 1,
                              )
                            } // convert to boolean for checked prop
                            error={errors?.isReceiveAgencyOrSite?.message}
                          />
                        </div>
                      </div>
                    </div>

                    {/* <Select
                      label={
                        <>
                          입금받을 계좌 <span className="text-red-500">*</span>
                        </>
                      }
                      data={[
                        { label: "은행을 선택해주세요", value: "" },
                        ...(banks || []).map((b) => ({
                          label: b.banknameen,
                          value: b.id,
                          image:b.urllogo
                        })),
                      ]}
                      {...register("bankName")}
                      error={errors?.bankName?.message}
                    /> */}
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

                    {/*Bank account*/}
                    <Input
                      placeholder=""
                      label={
                        <>
                          은행 계좌 <span className="text-red-500">*</span>
                        </>
                      }
                      {...register("bankAccount")}
                      error={errors?.bankAccount?.message}
                    />

                    {/*address*/}
                    <Input
                      placeholder="입금주소값"
                      label={
                        <>
                          주소 <span className="text-red-500">*</span>
                        </>
                      }
                      {...register("address")}
                      error={errors?.address?.message}
                    />
                  </div>
                </div>
                {/*Action buttons*/}
                <div className="mt-[24px] flex flex-col items-center justify-center gap-5 md:mt-[38px] md:flex-row lg:mt-[54px] lg:gap-7 rtl:space-x-reverse">
                  <Button className="w-[250px] min-w-[7rem] px-5 text-base font-medium">
                    해제
                  </Button>
                  <Button
                    type="submit"
                    className="w-[250px] min-w-[7rem] text-base font-medium"
                    color="primary"
                    disabled={!isValid}
                  >
                    확인하다
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
