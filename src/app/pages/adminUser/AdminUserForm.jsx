// Import Dependencies
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

// Local Imports
import {schema} from "./schema";
import {Page} from "components/shared/Page";
import {Button, Input} from "components/ui";
import axios from "../../../utils/axios.js";
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import {Fragment, useState} from "react";
import {CheckCircleIcon} from "@heroicons/react/24/outline/index.js";

// ----------------------------------------------------------------------

const initialState = {
    username: "",
    pwd: "",
    socialId: "",
    socialGroupId: "",
    phoneCountryCode: "",
    phoneNationalNumber: "",
    email: ""
};

const AdminUserForm = () => {
    const token = localStorage.getItem("authToken");
    const [isModalVisible, setisModalVisible] = useState(false);
    const [modalData, setModalData] = useState({
        color: "",
        title: "",
        message: "",
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialState,
    });

    const onSubmit = async (data) => {
        console.log(data);

        const payload = {
            username: data.username,
            pw: data.pwd,
            socialid: data.socialId,
            socialgroupid: data.socialGroupId,
            phonecountrycode: data.phoneCountryCode,
            phonenationalnumber: data.phoneNationalNumber,
            email: data.email
        };
        try {
            const response = await axios.post(
                `/query/item/agencyuser`,
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

    return (
        <Page title="관리자 양식">
            <div className="transition-content px-[--margin-x] pb-6 pt-4 ">
                <h2 className="pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 py-6 lg:text-2xl">
                    관리자 양식
                </h2>

                <div
                    className="p-[24px] md:p-[38px] lg:p-[54px] bg-white dark:bg-dark-700 border border-gray-200 rounded-lg shadow-sm border-none">
                    <form
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                        id="new-post-form"
                    >

                        <div className="flex gap-4">
                            <div className="flex flex-col border p-4 rounded-lg dark:border-gray-600 w-1/2 gap-5">
                                <Input
                                    label="사용자 이름" //UserName
                                    placeholder="사용자 이름"
                                    {...register("username")}
                                    error={errors?.username?.message}
                                />

                                <Input
                                    label="비밀번호" //Password
                                    placeholder="비밀번호"
                                    {...register("pwd")}
                                    error={errors?.pwd?.message}
                                />

                                <Input
                                    label="전화 국가 코드" //Phone country code
                                    placeholder="전화 국가 코드"
                                    {...register("phoneCountryCode")}
                                    error={errors?.phoneCountryCode?.message}
                                />

                                <Input
                                    label="전화번호" //Phone national number
                                    placeholder="전화번호"
                                    {...register("phoneNationalNumber")}
                                    error={errors?.phoneNationalNumber?.message}
                                />

                                <Input
                                    label="이메일" //Email
                                    placeholder="이메일"
                                    {...register("email")}
                                    error={errors?.email?.message}
                                />
                            </div>
                            <div className="flex flex-col border p-4 rounded-lg dark:border-gray-600 w-1/2 gap-5">
                                <Input
                                    label="소셜 ID" //Socail Id
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
                            className="mt-[24px] md:mt-[38px] lg:mt-[54px] flex flex-col gap-5 lg:gap-7 md:flex-row justify-center items-center rtl:space-x-reverse">
                            <Button className="min-w-[7rem] w-[250px] px-5 text-base font-medium">취소</Button>
                            <Button type="submit" className="min-w-[7rem] w-[250px] text-base font-medium"
                                    color="primary">
                                구하다
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
                                <Button onClick={() => setisModalVisible(false)} color={modalData.color}
                                        className="mt-6">
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
