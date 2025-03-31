import {Page} from "components/shared/Page";
import {Input, Button, Switch} from "components/ui";

export default function WithdrawalReq() {
    return (
        <Page title="출금 요청 (출금 신청)">
            <div className="transition-content grid w-full grid-rows-[auto_1fr] px-[--margin-x] pb-8">
                <h2 className="pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 py-6 lg:text-2xl">
                    출금 요청
                </h2>

                <div>
                    <div className="p-[24px] md:p-[38px] lg:p-[54px] h-fit bg-white dark:bg-dark-700 border border-gray-200 rounded-lg shadow-sm border-none">
                        <div>
                            {/*Form*/}
                            <form autoComplete="off">
                                <div className="flex flex-col lg:flex-row gap-9">
                                    <div className="border p-4 rounded-lg dark:border-gray-600 flex flex-col gap-5 w-full lg:w-1/2">
                                        <Input placeholder="필드 1 값" label=" 필드 1" disabled/>
                                        <Input placeholder="필드 2 값" label=" 필드 2" disabled/>
                                    </div>
                                    <div className="border p-4 rounded-lg dark:border-gray-600 flex flex-col gap-5 w-full lg:w-1/2">
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
                                        <Input placeholder="" label="입금받는주소"/>
                                        <Input placeholder="" label=" 입금받는계정"/>
                                    </div>
                                </div>
                                {/*Action buttons*/}
                                <div className="mt-[24px] md:mt-[38px] lg:mt-[54px] flex flex-col gap-5 lg:gap-7 md:flex-row justify-center items-center rtl:space-x-reverse">
                                    <Button className="min-w-[7rem] w-[250px] px-5 text-base font-medium">취소</Button>
                                    <Button type="submit" className="min-w-[7rem] w-[250px] text-base font-medium" color="primary">
                                        확인
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}