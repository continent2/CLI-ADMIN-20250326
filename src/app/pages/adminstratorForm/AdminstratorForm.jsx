// Import Dependencies
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

// Local Imports
import { schema } from "./schema";
import { Page } from "components/shared/Page";
import { Button, Card, Input, Textarea,Checkbox, Radio, Switch } from "components/ui";
import { Delta } from "components/shared/form/TextEditor";
import { Tags } from "./components/Tags";
import { DatePicker } from "components/shared/form/Datepicker";
import { Listbox } from "components/shared/form/Listbox";

// ----------------------------------------------------------------------

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

const categories = [
    {
        id: "1",
        label: "Accessories",
    },
    {
        id: "2",
        label: "Digital",
    },
    {
        id: "3",
        label: "Home",
    },
    {
        id: "4",
        label: "Technology",
    },
];


const AdminstrarorForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialState,
    });

    const onSubmit = (data) => {
        console.log(data);
        toast("New Post Published. Now you can add new one", {
            invert: true,
        });
        reset();
    };

    return (
        <Page title="관리자 양식">
            <div className="transition-content px-[--margin-x] pb-6 pt-4 ">
                <h2 className="pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 py-6 lg:text-2xl">
                    관리자 양식
                </h2>

                <div className="p-[24px] md:p-[38px] lg:p-[54px] bg-white dark:bg-dark-700 border border-gray-200 rounded-lg shadow-sm border-none">
                    <form
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                        id="new-post-form"
                    >
                        <div className="grid grid-cols-12 place-content-start gap-4 sm:gap-5 lg:gap-9">
                            <div className="col-span-12 h-full md:col-span-6">
                                <Card className="p-4 sm:px-5 h-full">
                                    <div className="space-y-5">
                                        <Input
                                            label="필드 1"
                                            placeholder="필드 1 값"
                                            {...register("caption")}
                                            error={errors?.caption?.message}
                                        />
                                        <Input
                                            label="필드 2"
                                            placeholder="필드 2 값"
                                            {...register("caption")}
                                            error={errors?.caption?.message}
                                        />

                                        <Input
                                            label="필드 3"
                                            placeholder="필드 3 값"
                                            {...register("caption")}
                                            error={errors?.caption?.message}
                                        />
                                        <Textarea placeholder="필드 4 값" label="필드 4" rows="5" />

                                        <div>
                                            <label className="mb-2 block">필드 5</label>
                                            <Switch defaultChecked />
                                        </div>

                                    </div>
                                </Card>
                            </div>
                            <div className="col-span-12 h-full space-y-4 sm:space-y-5 md:col-span-6 lg:space-y-6 gap-4 flex flex-col">
                                <Card className="space-y-5 p-4 sm:px-5">
                                    <Controller
                                        render={({ field }) => (
                                            <Listbox
                                                data={categories}
                                                value={
                                                    categories.find((cat) => cat.id === field.value) || null
                                                }
                                                onChange={(val) => field.onChange(val.id)}
                                                name={field.name}
                                                label="필드 6"
                                                placeholder="카테고리 선택"
                                                displayField="label"
                                                error={errors?.category_id?.message}
                                            />
                                        )}
                                        control={control}
                                        name="category_id"
                                    />


                                    <Controller
                                        render={({ field: { value, onChange, ...rest } }) => (
                                            <Tags
                                                value={
                                                    value?.map((val, i) => {
                                                        return { id: i, value: val };
                                                    }) || []
                                                }
                                                placeholder="태그 입력"
                                                onChange={(val) => onChange(val.map((i) => i.value))}
                                                error={errors?.tags?.message}
                                                label="필드 7"
                                                {...rest}
                                            />
                                        )}
                                        control={control}
                                        name="tags"
                                    />

                                    <Controller
                                        render={({ field: { onChange, value, ...rest } }) => (
                                            <DatePicker
                                                onChange={onChange}
                                                value={value || ""}
                                                label="날짜"
                                                error={errors?.publish_date?.message}
                                                options={{ disableMobile: true }}
                                                placeholder="날짜를 선택하세요"
                                                {...rest}
                                            />
                                        )}
                                        control={control}
                                        name="publish_date"
                                    />
                                </Card>

                                <Card className="p-4 sm:px-5 h-full">
                                    <div className="mt-3 space-y-5">
                                        <div>
                                            <label className="mb-2 block">필드 8</label>
                                            <div className="flex flex-wrap gap-5">
                                                <Checkbox defaultChecked label="발 1" />
                                                <Checkbox defaultChecked label="발 2" />
                                                <Checkbox defaultChecked label="발 3" />
                                                <Checkbox defaultChecked label="발 4" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block">필드 9</label>
                                            <div className="flex flex-wrap gap-5">
                                                <Radio defaultChecked label="발 1" name="basic" />
                                                <Radio label="발 2" name="basic" />
                                                <Radio label="발 3" name="basic" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                        {/*Action buttons*/}
                        <div className="mt-[24px] md:mt-[38px] lg:mt-[54px] flex flex-col gap-5 lg:gap-7 md:flex-row justify-center items-center rtl:space-x-reverse">
                            <Button className="min-w-[7rem] w-[250px] px-5 text-base font-medium">취소</Button>
                            <Button type="submit" className="min-w-[7rem] w-[250px] text-base font-medium" color="primary">
                                구하다
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Page>
    );
};

export default AdminstrarorForm;
