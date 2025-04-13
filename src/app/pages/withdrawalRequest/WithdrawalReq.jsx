import { Page } from "components/shared/Page";
import { Input, Button, Switch } from "components/ui";

export default function WithdrawalReq() {
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
              <form autoComplete="off">
                <div className="flex flex-col gap-9 lg:flex-row">
                  <div className="flex w-full flex-col gap-5 rounded-lg border p-4 dark:border-gray-600 lg:w-1/2">
                    <Input placeholder="필드 1 값" label=" 필드 1" disabled />
                    <Input placeholder="필드 2 값" label=" 필드 2" disabled />
                  </div>
                  <div className="flex w-full flex-col gap-5 rounded-lg border p-4 dark:border-gray-600 lg:w-1/2">
                    <div>
                      <label className="col-span-2">입금종류</label>
                      <div className="col-span-10">
                        <div className="mt-1 flex">
                          <span className="label me-2">USDT</span>
                          <Switch defaultChecked label="원화" />
                        </div>
                      </div>
                    </div>
                    <Input placeholder="" label="입금받는주소" />
                    <Input placeholder="" label=" 입금받는계정" />
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
