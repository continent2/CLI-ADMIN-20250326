import { Page } from "components/shared/Page";
import { Button, Input, Switch } from "../../../components/ui/index.js";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

import { schema } from "../adminstratorForm/schema.js";
import { toast } from "sonner";
import { Delta } from "../../../components/shared/form/TextEditor.jsx";

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
    toast("New Post Published. Now you can add new one", {
      invert: true,
    });
    // reset();
  };

  return (
    <Page title="설정">
      <div className="transition-content px-[--margin-x] pb-6 pt-4">
        <h2 className="pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:py-6 lg:text-2xl">
          설정
        </h2>
        <div className="rounded-lg border border-none border-gray-200 bg-white p-[24px] shadow-sm dark:bg-dark-700 md:p-[38px] lg:p-[54px]">
          <div className="grid grid-cols-12 place-content-start gap-4 sm:gap-5 lg:gap-9">
            <div className="col-span-12 md:col-span-6">
              <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                id="new-post-form"
              >
                <div className="flex flex-col gap-5 rounded-lg border p-4 dark:border-gray-600">
                  {/*Existing password*/}
                  <Input
                    placeholder="필드 1 값"
                    label="기존비밀번호"
                    className="mb-1"
                  />

                  {/*new password*/}
                  <Input placeholder="필드 2 값" label="새 비밀번호" />

                  {/*Confirm new password*/}
                  <Input placeholder="필드 3 값" label="새 비밀번호 확인" />
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
                </div>
              </form>
            </div>

            <div className="col-span-12 h-full md:col-span-6">
              <div className="flex h-full flex-col gap-5 rounded-lg border p-4 dark:border-gray-600">
                <Input placeholder="필드 4 값" label=" 필드 4" disabled />
                <Input placeholder="필드 5 값" label=" 필드 5" disabled />
                <div>
                  <label className="col-span-2">입금종류</label>
                  <div className="col-span-10">
                    <div className="mt-1 flex">
                      <span className="label me-2">USDT</span>
                      <Switch defaultChecked label="원화" />
                    </div>
                  </div>
                </div>
                {/*Action buttons*/}
                <div className="mt-[24px] flex flex-col items-center justify-center gap-5 md:mt-[38px] md:flex-row lg:mt-[54px] lg:gap-7 rtl:space-x-reverse">
                  <Button className="w-[250px] min-w-[7rem] px-5 text-base font-medium">
                    취소
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => console.log("Submit button clicked")}
                    className="w-[250px] min-w-[7rem] text-base font-medium"
                    color="primary"
                  >
                    확인
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex flex-col gap-5 rounded-lg border p-4 dark:border-gray-600">
                <Input placeholder="필드 6 값" label=" 필드 6" disabled />
                <Input placeholder="필드 7 값" label=" 필드 7" disabled />
                <Input placeholder="필드 8 값" label=" 필드 8" disabled />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
