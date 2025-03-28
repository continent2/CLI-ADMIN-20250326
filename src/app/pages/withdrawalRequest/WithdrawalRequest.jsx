import {Page} from "components/shared/Page";
import {Input, Button, Switch} from "components/ui";

export default function WithdrawalRequest() {


    return (
        <Page title="출금 요청 (출금 신청)">
            <div className="transition-content grid w-full grid-rows-[auto_1fr] px-[--margin-x] pb-8">
                <h2 className="pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:py-6 lg:text-2xl">
                    출금 요청
                </h2>

                <div className="flex justify-center mt-9">
                    <div
                        className="p-[54px] w-[800px] h-fit bg-white dark:bg-dark-700 border border-gray-200 rounded-lg shadow-sm border-none">
                        <div>
                            {/*Form*/}
                            <form autoComplete="off">
                                <div className="border p-4 rounded-lg mb-[54px] dark:border-gray-600">
                                    <div className="grid grid-cols-12 gap-4 items-center mb-3">
                                        <label className="col-span-2">
                                            필드 1
                                        </label>
                                        <div className="col-span-10">
                                            <Input placeholder="필드 1 값" disabled/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <label className="col-span-2">
                                            필드 2
                                        </label>
                                        <div className="col-span-10">
                                            <Input placeholder="필드 2 값" disabled/>
                                        </div>
                                    </div>
                                </div>

                                <div className="border p-4 rounded-lg dark:border-gray-600">
                                    <div className="grid grid-cols-12 gap-4 items-center mb-3">
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
                                    <div className="grid grid-cols-12 gap-4 items-center mb-3">
                                        <label className="col-span-2">
                                            입금받는주소
                                        </label>
                                        <div className="col-span-10">
                                            <Input placeholder="" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <label className="col-span-2">
                                            입금받는계정
                                        </label>
                                        <div className="col-span-10">
                                            <Input placeholder="" />
                                        </div>
                                    </div>
                                </div>

                                {/*Action buttons*/}
                                <div className="mt-[54px] flex justify-center space-x-3 rtl:space-x-reverse">
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