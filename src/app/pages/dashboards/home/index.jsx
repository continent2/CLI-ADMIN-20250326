// Local Imports
import {Page} from "components/shared/Page";
import { Balance } from "./Balance";
import { ActivitiesTable } from "./ActivitiesTable";
import { Watchlist } from "./Watchlist";
import { Wallets } from "./Wallets";
import { Exchange } from "./Exchange";

export default function Home() {
    return (
        <Page title="계기반">
            <div className="transition-content w-full px-[--margin-x] pt-5 lg:pt-6">
                <div className="min-w-0">
                    <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:py-6">
                        계기반
                    </h2>

                    <div className="p-[54px] h-fit bg-white dark:bg-dark-700 border border-gray-200 rounded-lg shadow-sm border-none">
                        <div className="transition-content grid grid-cols-12 gap-4 pb-8 sm:gap-5 lg:gap-6">
                            <div className="col-span-12 space-y-4 sm:space-y-5 lg:col-span-8 lg:space-y-6">
                                <Balance />
                                <Watchlist />
                                <ActivitiesTable />
                            </div>
                            <div className="col-span-12 space-y-4 sm:space-y-5 lg:col-span-4 lg:space-y-6">
                                <Wallets />
                                <Exchange />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Page>
    );
}
