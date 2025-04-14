import { Page } from "components/shared/Page";
import { Button, Input } from "../../../components/ui/index.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankSchema, userUpdateSchema, addressSchema } from "./schema.js";
import axios from "../../../utils/axios.js";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useAppDataContext } from "../../contexts/appData/context.js";
import ReactSelect from "react-select";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function SettingForm() {
  const token = localStorage.getItem("authToken");
  const [isModalVisible, setisModalVisible] = useState(false);
  const { banks, bankInfo } = useAppDataContext();
  const [banksDetail, setBanksDetail] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [settingsData, setSettingsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    existing: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

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
  // Fetch settings data on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/setting", {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (response.data.status === "OK") {
          setSettingsData(response.data);

          // Set default values for password form
          setValue("existingPassword", "");
          setValue("newPassword", "");
          setValue("confirmPassword", "");

          // Set default values for address form
          setValue("address", response.data.myagencyinfo?.address || "");

          // Set default values for bank form
          if (response.data.accountbank) {
            const bank = banks?.find(
              (b) => b.banknameen === response.data.accountbank.bankname,
            );
            if (bank) {
              const bankOption = bankOptions?.find(
                (opt) => opt.value.id === bank.id,
              );
              setSelectedOption(bankOption);
              setValue("bankName", bank.banknameen);
              setValue("bankAccount", response.data.accountbank.bankaccount);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [token]);

  const initialState = {
    existingPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // Update your form initialization with default values
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(userUpdateSchema),
    mode: "all",
    defaultValues: {
      existingPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    register: registerBank,
    handleSubmit: handleSubmitBank,
    setValue: setBankValue,
    formState: { errors: bankErrors, isValid: registerBankIsValid },
  } = useForm({
    resolver: yupResolver(bankSchema),
    mode: "all",
    defaultValues: {
      bankName: settingsData?.accountbank?.bankname || "",
      bankAccount: settingsData?.accountbank?.bankaccount || "",
    },
  });

  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    setValue: setAddressValue,
    formState: { errors: addressErrors, isValid: registerAddressIsValid },
  } = useForm({
    resolver: yupResolver(addressSchema),
    mode: "all",
    defaultValues: {
      address: settingsData?.myagencyinfo?.address || "",
    },
  });

  // Update your bank select initialization
  useEffect(() => {
    if (settingsData?.accountbank && bankOptions?.length > 0) {
      const currentBank = bankOptions.find(
        (opt) => opt.value.banknameen === settingsData.accountbank.bankname,
      );
      if (currentBank) {
        setSelectedOption(currentBank);
        setBankValue("bankName", currentBank.value.banknameen);
      }
    }
  }, [settingsData]);

  const [modalData, setModalData] = useState({
    color: "",
    title: "",
    message: "",
  });

  const onSubmitPassword = async (data) => {
    const userPwd = localStorage.getItem("pw");
    console.log("test");
    if (userPwd === data.existingPassword) {
      try {
        const response = await axios.post(
          `/setting`,
          {
            pw: data.confirmPassword, // Sending confirmPassword as "pw"
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            timeout: 5000, // Timeout after 5 seconds
          },
        );

        localStorage.setItem("pw", data.confirmPassword);

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
    } else {
      toast.error("기존 비밀번호가 올바르지 않습니다");
      navigate("/");
      console.log("test");
      // setModalData((prev) => ({
      //     ...prev,
      //     message: "비밀번호업데이트에실패했습니다",
      //     color: "error",
      //     title: "Failed",
      // }));
      // setisModalVisible(true);
    }
  };

  const onSubmitBank = async (data) => {
    const SelectedBank = banks.find(
      (item) => item.banknameen === data.bankName,
    );
    const payload = {
      bankname: SelectedBank.banknameen,
      bankaccount: data.bankAccount,
      bankid: SelectedBank.id,
    };
    try {
      const response = await axios.post(`/setting`, payload, {
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

  const onSubmitAddress = async (data) => {
    const payload = {
      address: data.address,
    };
    try {
      const response = await axios.post(`/setting`, payload, {
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

  //used for select option for bank
  useEffect(() => {
    if (bankOptions?.length > 0) {
      const firstBank = bankOptions[0];
      setSelectedOption(firstBank); // for ReactSelect UI
      setValue("bankName", firstBank.value.banknameen); // for your form schema
    }
  }, [banksDetail]);

  //set banks to bankdetails
  useEffect(() => {
    if (banks && banks.length > 0) {
      setBanksDetail(banks);
    }
  }, [banks]);

  //run banks api
  useEffect(() => {
    bankInfo();
  }, []);

  return (
    <Page title="세팅">
      <div className="transition-content px-[--margin-x] pb-6 pt-4">
        {/* <h2 className="pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:py-6 lg:text-2xl">
          세팅
        </h2> */}
        <div className="rounded-lg border border-none border-gray-200 bg-white p-[24px] shadow-sm dark:bg-dark-700 md:p-[38px] lg:p-[54px]">
          <div className="grid grid-cols-12 place-content-start gap-4 sm:gap-5 lg:gap-9">
            <div className="col-span-12 md:col-span-6">
              <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmitPassword)}
                id="new-password-form"
              >
                <div className="flex flex-col gap-5 rounded-lg border p-4 dark:border-gray-600">
                  {/* Existing password */}
                  <div className="relative">
                    <Input
                      label={
                        <>
                          기존비밀번호 <span className="text-red-500">*</span>
                        </>
                      }
                      type={showPassword.existing ? "text" : "password"}
                      {...register("existingPassword")}
                      error={errors?.existingPassword?.message}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-[35px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => togglePasswordVisibility("existing")}
                    >
                      {showPassword.existing ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* New password */}
                  <div className="relative">
                    <Input
                      label={
                        <>
                          새 비밀번호 <span className="text-red-500">*</span>
                        </>
                      }
                      type={showPassword.new ? "text" : "password"}
                      {...register("newPassword")}
                      error={errors?.newPassword?.message}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-[35px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => togglePasswordVisibility("new")}
                    >
                      {showPassword.new ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <p className="-mt-4 text-sm text-gray-500">
                    메모: 비밀번호는 8자 이상 20자 이하이며, 숫자와 특수문자를
                    각각 최소 1개 이상 포함해야 합니다.
                  </p>

                  {/* Confirm new password */}
                  <div className="relative">
                    <Input
                      label={
                        <>
                          새 비밀번호 확인{" "}
                          <span className="text-red-500">*</span>
                        </>
                      }
                      type={showPassword.confirm ? "text" : "password"}
                      {...register("confirmPassword")}
                      error={errors?.confirmPassword?.message}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-[35px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => togglePasswordVisibility("confirm")}
                    >
                      {showPassword.confirm ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Action buttons */}
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
                </div>
              </form>
            </div>

            <div className="col-span-12 h-full md:col-span-6">
              <form
                autoComplete="off"
                onSubmit={handleSubmitAddress(onSubmitAddress)}
                id="new-address-form"
              >
                <div className="flex h-full flex-col gap-5 rounded-lg border p-4 dark:border-gray-600">
                  <label>*기본 주소</label>

                  {/*Default address*/}
                  <Input
                    placeholder="기본 주소"
                    label="기본 주소"
                    {...registerAddress("address")}
                    error={addressErrors?.address?.message}
                  />

                  {/*Action buttons*/}
                  <div className="mt-[24px] flex flex-col items-center justify-center gap-5 md:mt-[38px] md:flex-row lg:mt-[54px] lg:gap-7 rtl:space-x-reverse">
                    <Button className="w-[250px] min-w-[7rem] px-5 text-base font-medium">
                      해제
                    </Button>
                    <Button
                      type="submit"
                      className="w-[250px] min-w-[7rem] text-base font-medium"
                      color="primary"
                      disabled={!registerAddressIsValid}
                    >
                      확인하다
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-span-12 md:col-span-6">
              <form
                autoComplete="off"
                onSubmit={handleSubmitBank(onSubmitBank)}
                id="new-bank-form"
              >
                <div className="flex flex-col gap-5 rounded-lg border p-4 dark:border-gray-600">
                  <label>기본 계정</label>
                  {/*<Select*/}
                  {/*    label="은행"*/}
                  {/*    data={[*/}
                  {/*        {label: "은행을 선택해주세요", value: ""},*/}
                  {/*        ...(banks || []).map((b) => ({*/}
                  {/*            label: b.banknameen,*/}
                  {/*            value: b.id*/}
                  {/*        }))*/}
                  {/*    ]}*/}
                  {/*    {...registerBank("bankName")}*/}
                  {/*    error={bankErrors?.bankName?.message}*/}
                  {/*/>*/}

                  {/*Receiving bank*/}
                  <label className="-mb-4">
                    받는은행<span className="text-red-500">*</span>
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

                  <Input
                    placeholder=""
                    label=" 은행계정"
                    {...registerBank("bankAccount")}
                    error={bankErrors?.bankAccount?.message}
                  />
                  {/*Action buttons*/}
                  <div className="mt-[24px] flex flex-col items-center justify-center gap-5 md:mt-[38px] md:flex-row lg:mt-[54px] lg:gap-7 rtl:space-x-reverse">
                    <Button className="w-[250px] min-w-[7rem] px-5 text-base font-medium">
                      해제
                    </Button>
                    <Button
                      type="submit"
                      className="w-[250px] min-w-[7rem] text-base font-medium"
                      color="primary"
                      disabled={!registerBankIsValid}
                    >
                      확인하다
                    </Button>
                  </div>
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
