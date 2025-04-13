import {Page} from "components/shared/Page";
import {Input, Button, Switch,Textarea, Select} from "components/ui";

export default function SiteRegistrationForm() {
    return (
        <Page title="사이트 등록 양식">
            <div className="transition-content grid w-full grid-rows-[auto_1fr] px-[--margin-x] pb-8">
                <h2 className="pt-5 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:py-6 lg:text-2xl">
                    사이트 등록 양식
                </h2>

                <div>
                    <div
                        className="p-[54px] h-fit bg-white dark:bg-dark-700 border border-gray-200 rounded-lg shadow-sm border-none">
                        <div>
                            {/*Form*/}
                            <form autoComplete="off">
                                <div className="flex flex-row gap-9">
                                    <div
                                        className="border p-4 rounded-lg dark:border-gray-600 flex flex-col gap-5 w-1/2">
                                        <Input placeholder="사이트 URL 값" label="사이트 URL"/>
                                        <div>
                                            <label className="col-span-2">
                                                예금 유형
                                            </label>
                                            <div className="col-span-10">
                                                <div className="flex mt-1">
                                                    <span className="label me-2">USDT</span>
                                                    <Switch defaultChecked label="Won"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="col-span-2">
                                                입금주소
                                            </label>
                                            <div className="col-span-10">
                                                <div className="flex mt-1">
                                                    <span className="label me-2">대행사</span>
                                                    <Switch defaultChecked label="사이트별 주소"/>
                                                </div>
                                            </div>
                                        </div>
                                        <Input placeholder="입금주소값" label="입금주소"/>
                                        <Textarea placeholder="가이드/지시사항" rows="6" />
                                    </div>
                                    <div
                                        className="border p-4 rounded-lg dark:border-gray-600 flex flex-col gap-5 w-1/2">
                                        <Input placeholder="" label="담당자"/>
                                        <Input placeholder="" label="관리자 소셜" Placeholder="HTTPS://T.ME/UNGSAN"/>


                                        <div className="grid grid-cols-5 gap-4 sm:gap-5 lg:gap-9">
                                            <div className="col-span-3">
                                                <Select
                                                    label="입금받을 계좌"
                                                    defaultValue="옵션선택"
                                                    className="h-12 text-base w-full"
                                                    data={["옵션선택", "OO은행", "OO은행", "OO은행"]}
                                                />
                                            </div>
                                            <div className="col-span-2 flex items-center">
                                                <label className="w-full">
                                                    2872-7090-4830
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="col-span-2">
                                                필드
                                            </label>
                                            <div className="col-span-10">
                                                <div className="flex mt-1">
                                                    <Switch defaultChecked label=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <Textarea placeholder="가이드/지시사항" rows="6" />
                                    </div>
                                </div>
                                {/*Action buttons*/}
                                <div className="mt-[54px] flex justify-center space-x-3 rtl:space-x-reverse">
                                    <Button className="min-w-[7rem] w-[250px] px-5 text-base font-medium">취소</Button>
                                    <Button type="submit" className="min-w-[7rem] w-[250px] text-base font-medium"
                                            color="primary">
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
