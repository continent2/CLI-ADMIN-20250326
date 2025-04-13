import { Page } from "components/shared/Page";
import { Input, Button, Switch } from "components/ui";

export default function WithdrawalRequest() {
  return (
    <Page title="출금 요청">
      <div className="transition-content grid w-full grid-rows-[auto_1fr] px-[--margin-x] pb-8">
        <h2 className="py-6 pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:text-2xl">
          출금 요청
        </h2>

        <div className="mt-9 flex justify-center">
          <div className="h-fit rounded-lg border border-none border-gray-200 bg-white p-[24px] shadow-sm dark:bg-dark-700 md:p-[38px] lg:w-[800px] lg:p-[54px]">
            <div>
              {/*Form*/}
              <form autoComplete="off">
                <div className="mb-[54px] rounded-lg border p-4 dark:border-gray-600">
                  <div className="mb-3 grid grid-cols-12 items-center gap-4">
                    <label className="col-span-2">필드 1</label>
                    <div className="col-span-10">
                      <Input placeholder="필드 1 값" disabled />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center gap-4">
                    <label className="col-span-2">필드 2</label>
                    <div className="col-span-10">
                      <Input placeholder="필드 2 값" disabled />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 dark:border-gray-600">
                  <div className="mb-3 grid grid-cols-12 items-center gap-4">
                    <label className="col-span-2">입금종류</label>
                    <div className="col-span-10">
                      <div className="mt-1 flex">
                        <span className="label me-2">USDT</span>
                        <Switch defaultChecked label="원화" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 grid grid-cols-12 items-center gap-4">
                    <label className="col-span-2">입금받는주소</label>
                    <div className="col-span-10">
                      <Input placeholder="" />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center gap-4">
                    <label className="col-span-2">입금받는계정</label>
                    <div className="col-span-10">
                      <Input placeholder="" />
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
    </Page>
  );
}
