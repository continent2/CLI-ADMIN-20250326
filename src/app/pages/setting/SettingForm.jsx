import {Page} from "components/shared/Page";
import {Button, Input, Select} from "../../../components/ui/index.js";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {bankSchema, userUpdateSchema,addressSchema} from "./schema.js";
import axios from "../../../utils/axios.js";
import {useEffect, useState} from "react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import {Fragment} from "react";
import {useAppDataContext} from "../../contexts/appData/context.js";


export default function SettingForm() {
    const token = localStorage.getItem("authToken");
    const [isModalVisible, setisModalVisible] = useState(false);
    const {banks, bankInfo} = useAppDataContext();
    // const [bank, setbank] = useState({});

    const initialState = {
        existingPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(userUpdateSchema),
        defaultValues: initialState,
    });

    const {
        register: registerBank,
        handleSubmit: handleSubmitBank,
        formState: {errors: bankErrors},
    } = useForm({
        resolver: yupResolver(bankSchema),
        defaultValues: {
            bankName: "",
            bankAccount: ""
        },
    });

    const {
        register: registerAddress,
        handleSubmit: handleSubmitAddress,
        formState: {errors: addressErrors},
    } = useForm({
        resolver: yupResolver(addressSchema),
        defaultValues: {
            address: "",
        },
    });


    const [modalData, setModalData] = useState({
        color: "",
        title: "",
        message: "",
    });

    const onSubmitPassword = async (data) => {
        const userPwd = localStorage.getItem("pw");
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
                    }
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
            setModalData((prev) => ({
                ...prev,
                message: "비밀번호업데이트에실패했습니다",
                color: "error",
                title: "Failed",
            }));
            setisModalVisible(true);
        }
    };

    const onSubmitBank = async (data) => {
        const SelectedBank = banks.find((item) => item.id === +data.bankName)
        const payload = {
            bankname: SelectedBank.banknameen,
            bankaccount: data.bankAccount,
            bankid: SelectedBank.id,
        };
        console.log(payload);
        try {
            const response = await axios.post(
                `/setting`,
                payload,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                    timeout: 5000, // Timeout after 5 seconds
                }
            );

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

    const onSubmitAddress = async (data)=>{
        const payload = {
            address : data.address,
        };
        try {
            const response = await axios.post(
                `/setting`,
                payload,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                    timeout: 5000, // Timeout after 5 seconds
                }
            );

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
    }

    useEffect(() => {
        bankInfo();
    }, []);

    return (
        <Page title="세팅">
            <div className="transition-content px-[--margin-x] pb-6 pt-4 ">
                <h2 className="pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:py-6 lg:text-2xl">
                    세팅
                </h2>
                <div
                    className="p-[24px] md:p-[38px] lg:p-[54px] bg-white dark:bg-dark-700 border border-gray-200 rounded-lg shadow-sm border-none">
                    <div className="grid grid-cols-12 place-content-start gap-4 sm:gap-5 lg:gap-9">
                        <div className="col-span-12 md:col-span-6">
                            <form
                                autoComplete="off"
                                onSubmit={handleSubmit(onSubmitPassword)}
                                id="new-password-form"
                            >
                                <div className="border p-4 rounded-lg dark:border-gray-600 flex flex-col gap-5">

                                    {/*Existing password*/}
                                    <Input
                                        label="기존비밀번호"
                                        {...register("existingPassword")} // Register the input
                                        error={errors?.existingPassword?.message}/>

                                    {/*new password*/}
                                    <Input
                                        label="새 비밀번호"
                                        {...register("newPassword")} // Register the input
                                        error={errors?.newPassword?.message}/>


                                    {/*Confirm new password*/}
                                    <Input
                                        label="새 비밀번호 확인"
                                        {...register("confirmPassword")} // Register the input
                                        error={errors?.confirmPassword?.message}/>

                                    {/*Action buttons*/}
                                    <div
                                        className="mt-[24px] md:mt-[38px] lg:mt-[54px] flex flex-col gap-5 lg:gap-7 md:flex-row justify-center items-center rtl:space-x-reverse">
                                        <Button
                                            className="min-w-[7rem] w-[250px] px-5 text-base font-medium">해제</Button>
                                        <Button type="submit" className="min-w-[7rem] w-[250px] text-base font-medium"
                                                color="primary">
                                            확인하다
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-span-12 md:col-span-6 h-full">
                            <form
                                autoComplete="off"
                                onSubmit={handleSubmitAddress(onSubmitAddress)}
                                id="new-address-form"
                            >
                                <div className="border p-4 rounded-lg dark:border-gray-600 flex flex-col gap-5 h-full">
                                    <label>*기본 주소 </label>

                                    {/*Default address*/}
                                    <Input
                                        placeholder="기본 주소"
                                        label="기본 주소"
                                        {...registerAddress("address")}
                                        error={addressErrors?.address?.message}
                                    />

                                    {/*Action buttons*/}
                                    <div
                                        className="mt-[24px] md:mt-[38px] lg:mt-[54px] flex flex-col gap-5 lg:gap-7 md:flex-row justify-center items-center rtl:space-x-reverse">
                                        <Button
                                            className="min-w-[7rem] w-[250px] px-5 text-base font-medium">해제</Button>
                                        <Button type="submit"
                                                className="min-w-[7rem] w-[250px] text-base font-medium"
                                                color="primary">
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
                                <div className="border p-4 rounded-lg dark:border-gray-600 flex flex-col gap-5">
                                    <label>기본 계정</label>
                                    <Select
                                        label="은행"
                                        data={[
                                            { label: "은행을 선택해주세요", value: "" },
                                            ...(banks || []).map((b) => ({
                                                label: b.banknameen,
                                                value: b.id
                                            }))
                                        ]}
                                        {...registerBank("bankName")}
                                        error={bankErrors?.bankName?.message}
                                    />

                                    <Input placeholder=""
                                           label=" 은행계정"
                                           {...registerBank("bankAccount")}
                                           error={bankErrors?.bankAccount?.message}
                                           />
                                    {/*Action buttons*/}
                                    <div
                                        className="mt-[24px] md:mt-[38px] lg:mt-[54px] flex flex-col gap-5 lg:gap-7 md:flex-row justify-center items-center rtl:space-x-reverse">
                                        <Button
                                            className="min-w-[7rem] w-[250px] px-5 text-base font-medium">해제</Button>
                                        <Button type="submit" className="min-w-[7rem] w-[250px] text-base font-medium"
                                                color="primary">
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
                            className="scrollbar-sm min-w-[400px] relative flex max-w-md flex-col overflow-y-auto rounded-lg bg-white px-4 py-10 text-center transition-opacity duration-300 dark:bg-dark-700 sm:px-5">
                            <CheckCircleIcon className={`mx-auto inline size-28 shrink-0 text-${modalData.color}`}/>

                            <div className="mt-4">
                                <DialogTitle
                                    as="h3"
                                    className="text-2xl text-gray-800 dark:text-dark-100"
                                >
                                    {modalData.title}
                                </DialogTitle>

                                <p className="mt-2">
                                    {modalData.message}
                                </p>
                                <Button onClick={() => setisModalVisible(false)} color={modalData.color} className="mt-6">
                                    Close
                                </Button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </Dialog>
            </Transition>
        </Page>
    )

}