import {Page} from "components/shared/Page";
import {Button, Input, Switch} from "../../../components/ui/index.js";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../adminstratorForm/schema.js";
import {toast} from "sonner";
import {Delta} from "../../../components/shared/form/TextEditor.jsx";

export default function Setting() {

    const initialState = {
        title: "",
        caption: "",
        content: new Delta(),
        cover: null,
        category_id: "",
        author_id: "",
        tags: [],
        publish_date: "",
        meta: {
            title: "",
            description: "",
            keywords: [],
        },
    };


    const {
        handleSubmit,
        // reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialState,
    });

    const onSubmit = (data) => {
        console.log(data);
        toast("New Post Published. Now you can add new one", {
            invert: true,
        });
        // reset();
    };


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
                                onSubmit={handleSubmit(onSubmit)}
                                id="new-post-form"
                            >
                                <div className="border p-4 rounded-lg dark:border-gray-600 flex flex-col gap-5">

                                    {/*Existing password*/}
                                    <Input placeholder="필드 1 값" label="기존비밀번호" className="mb-1"/>

                                    {/*new password*/}
                                    <Input placeholder="필드 2 값" label="새 비밀번호"/>


                                    {/*Confirm new password*/}
                                    <Input placeholder="필드 3 값" label="새 비밀번호 확인"/>
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
                            <div className="border p-4 rounded-lg dark:border-gray-600 flex flex-col gap-5 h-full">
                                <Input placeholder="필드 4 값" label=" 필드 4" disabled/>
                                <Input placeholder="필드 5 값" label=" 필드 5" disabled/>
                                <div>
                                    <label className="col-span-2">
                                        입금종류
                                    </label>
                                    <div className="col-span-10">
                                        <div className="flex mt-1">
                                            <span className="label me-2">USDT</span>
                                            <Switch defaultChecked label="원화"/>
                                        </div>
                                    </div>
                                </div>
                                {/*Action buttons*/}
                                <div
                                    className="mt-[24px] md:mt-[38px] lg:mt-[54px] flex flex-col gap-5 lg:gap-7 md:flex-row justify-center items-center rtl:space-x-reverse">
                                    <Button className="min-w-[7rem] w-[250px] px-5 text-base font-medium">해제</Button>
                                    <Button type="submit" onClick={() => console.log("Submit button clicked")} className="min-w-[7rem] w-[250px] text-base font-medium"
                                            color="primary">
                                        확인하다
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="border p-4 rounded-lg dark:border-gray-600 flex flex-col gap-5">
                                <Input placeholder="필드 6 값" label=" 필드 6" disabled/>
                                <Input placeholder="필드 7 값" label=" 필드 7" disabled/>
                                <Input placeholder="필드 8 값" label=" 필드 8" disabled/>
                                {/*Action buttons*/}
                                <div
                                    className="mt-[24px] md:mt-[38px] lg:mt-[54px] flex flex-col gap-5 lg:gap-7 md:flex-row justify-center items-center rtl:space-x-reverse">
                                    <Button className="min-w-[7rem] w-[250px] px-5 text-base font-medium">해제</Button>
                                    <Button type="submit" className="min-w-[7rem] w-[250px] text-base font-medium"
                                            color="primary">
                                        확인하다
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )

}