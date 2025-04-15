// Import Dependencies
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import {ChevronDownIcon, LockClosedIcon} from "@heroicons/react/24/outline";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Local Imports
import {schema} from "./schema";
import {Page} from "components/shared/Page";
import axios from "../../../utils/axios.js";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import {Fragment, useState} from "react";
import {CheckCircleIcon} from "@heroicons/react/24/outline/index.js";
import {Input, Button} from "components/ui";
import {useDisclosure} from "hooks";
import {PhoneNumberUtil} from "google-libphonenumber";
import ReactSelect from "react-select";
import ReactCountryFlag from "react-country-flag";
import clsx from "clsx";

// Initialize phone number util
const phoneUtil = PhoneNumberUtil.getInstance();
const supportedRegions = phoneUtil.getSupportedRegions();

// ----------------------------------------------------------------------

const initialState = {
    username: "",
    pwd: "",
    socialId: "",
    socialGroupId: "",
    phoneCountryCode: "+1", // Default to US
    phoneNationalNumber: "",
    email: "",
};

const AdminUserForm = () => {
    const token = localStorage.getItem("authToken");
    const [isModalVisible, setisModalVisible] = useState(false);


    const [show, {toggle}] = useDisclosure();
    const [modalData, setModalData] = useState({
        color: "",
        title: "",
        message: "",
    });

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        watch,
        control,
        setError,
        clearErrors,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "all",
        defaultValues: initialState,
    });

    // Watch phone number fields
    const phoneCountryCode = watch("phoneCountryCode");
    const phoneNationalNumber = watch("phoneNationalNumber");

    // Validate phone number using libphonenumber
    const validatePhoneNumber = () => {
        clearErrors("phoneNationalNumber");
        clearErrors("phoneCountryCode");

        if (!phoneNationalNumber || !phoneCountryCode) return;
        try {
            const countryCode = phoneCountryCode.replace("+", "");
            const regionCode = phoneUtil.getRegionCodeForCountryCode(
                parseInt(countryCode),
            );

            if (!regionCode || !supportedRegions.includes(regionCode)) {
                setError("phoneCountryCode", {
                    type: "manual",
                    message: "지원되지 않는 국가 코드입니다",
                });
                return false;
            }

            const phoneNumber = phoneUtil.parseAndKeepRawInput(
                phoneNationalNumber,
                regionCode,
            );

            if (!phoneUtil.isValidNumber(phoneNumber)) {
                setError("phoneNationalNumber", {
                    type: "manual",
                    message: "유효한 전화번호 형식이 아닙니다",
                });
                return false;
            }

            // Format the phone number to international format
            // const formattedNumber = phoneUtil.format(
            //     phoneNumber,
            //     PhoneNumberUtil.PhoneNumberFormat.INTERNATIONAL,
            // );
            // setValue(
            //     "phoneNationalNumber",
            //     phoneUtil.getNationalSignificantNumber(phoneNumber),
            //     {
            //         shouldValidate: true,
            //     },
            // );
            return true;
        } catch (error) {
            setError("phoneNationalNumber", {
                type: "manual",
                message: "유효한 전화번호 형식이 아닙니다",
            });
            return false;
        }
    };

    const handlePhoneChange = (value, data) => {

        //clear the previous erorr if any
        clearErrors("phoneNationalNumber");
        clearErrors("phoneCountryCode");

        //sets the value
        setValue("phoneCountryCode", `+${data.dialCode}`);
        setValue("phoneNationalNumber", value.slice(data.dialCode.length));
    };

    const onSubmit = async (data) => {
        console.log("data", data)
        // Validate phone number before submission
        if (!validatePhoneNumber()) return;

        const payload = {
            username: data.username,
            pw: data.pwd,
            socialid: data.socialId,
            socialgroupid: data.socialGroupId,
            phonecountrycode: data.phoneCountryCode,
            phonenationalnumber: data.phoneNationalNumber,
            email: data.email,
        };

        console.log("payload", payload)

        try {
            const response = await axios.post(`/query/item/agencyuser`, payload, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                timeout: 10000,
            });

            if (response.data.status === "OK") {
                setModalData((prev) => ({
                    ...prev,
                    message: response.data.message,
                    color: "success",
                    title: "Success",
                }));
                setisModalVisible(true);
            } else {
                setModalData((prev) => ({
                    ...prev,
                    message: response.data.message,
                    color: "error",
                    title: "Failed",
                }));
                setisModalVisible(true);
            }
        } catch (err) {
            setModalData((prev) => ({
                ...prev,
                message: err.response?.data?.message || err.message,
                color: "error",
                title: "Failed",
            }));
            setisModalVisible(true);
        }
    };
    return (
        <Page title="관리자 추가">
            <div className="transition-content px-[--margin-x] py-5">
                {/* <h2 className="py-6 pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:text-2xl">
        관리자 추가
        </h2> */}

                <div
                    className="rounded-lg border border-none border-gray-200 bg-white p-[24px] shadow-sm dark:bg-dark-700 md:p-[38px] lg:p-[54px]">
                    <form
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                        id="new-admin-user-form"
                    >
                        <div className="flex gap-4">
                            <div className="flex w-1/2 flex-col gap-5 rounded-lg border p-4 pb-5 dark:border-gray-600">
                                <Input
                                    label={
                                        <>
                                            사용자 이름 <span className="text-red-500">*</span>
                                        </>
                                    } //UserName
                                    placeholder="사용자 이름"
                                    {...register("username")}
                                    error={errors?.username?.message}
                                />
                                {/*Password*/}
                                <Input
                                    label={
                                        <>
                                            비밀번호 <span className="text-red-500">*</span>
                                        </>
                                    } //Password
                                    placeholder="비밀번호"
                                    type={show ? "text" : "password"}
                                    prefix={<LockClosedIcon className="size-4.5"/>}
                                    suffix={
                                        <Button
                                            variant="flat"
                                            className="pointer-events-auto size-6 shrink-0 rounded-full p-0"
                                            onClick={toggle}
                                        >
                                            {show ? (
                                                <EyeSlashIcon className="size-4.5 text-gray-500 dark:text-dark-200"/>
                                            ) : (
                                                <EyeIcon className="size-4.5 text-gray-500 dark:text-dark-200"/>
                                            )}
                                        </Button>
                                    }
                                    {...register("pwd")}
                                    error={errors?.pwd?.message}
                                />
                                <p className="-mt-4 text-sm text-gray-500">
                                    메모: 비밀번호는 8자 이상 20자 이하이며, 숫자와 특수문자를
                                    각각 최소 1개 이상 포함해야 합니다.
                                </p>


                                <label className="-mb-3">전화 국가 코드 그리고 국가 코드</label>
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({field}) => (
                                        <div>
                                            <PhoneInput
                                                {...field}
                                                country={'kr'}
                                                value={field.value}
                                                onChange={handlePhoneChange}
                                                className="w-full"
                                            />
                                            {/* Show error message */}
                                            {errors?.phoneNationalNumber && (
                                                <p className="text-red-500 mt-1">{errors.phoneNationalNumber.message}</p>
                                            )}
                                        </div>
                                    )}
                                />

                                <Input
                                    label={
                                        <>
                                            이메일 <span className="text-red-500">*</span>
                                        </>
                                    } //Email
                                    placeholder="이메일"
                                    {...register("email")}
                                    error={errors?.email?.message}
                                />
                            </div>
                            <div className="flex w-1/2 flex-col gap-5 rounded-lg border p-4 pb-5 dark:border-gray-600">
                                <Input
                                    label={
                                        <>
                                            소셜 ID <span className="text-red-500">*</span>
                                        </>
                                    } //Socail Id
                                    placeholder="소셜 ID"
                                    {...register("socialId")}
                                    error={errors?.socialId?.message}
                                />

                                <Input
                                    label="소셜 그룹 ID" //Social group Id
                                    placeholder="소셜 그룹 ID"
                                    {...register("socialGroupId")}
                                    error={errors?.socialGroupId?.message}
                                />
                            </div>
                        </div>

                        {/*Action buttons*/}
                        <div
                            className="mt-[24px] flex flex-col items-center justify-center gap-5 md:mt-[38px] md:flex-row lg:mt-[54px] lg:gap-7 rtl:space-x-reverse">
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
                        <div className="absolute inset-0 bg-gray-900/50 transition-opacity dark:bg-black/40"/>
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
                        <DialogPanel
                            className="scrollbar-sm relative flex min-w-[400px] max-w-md flex-col overflow-y-auto rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-dark-700 sm:px-5">
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
};

export default AdminUserForm;
