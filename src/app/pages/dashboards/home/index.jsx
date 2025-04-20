// Local Imports
import { Page } from "components/shared/Page";
import { Balance } from "./Balance";
import { ActivitiesTable } from "./DepositTable";
import { Watchlist } from "./Watchlist";
import { Wallets } from "./Wallets";
import { Exchange } from "./Exchange";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DashboardWithdrawalRequestForm from "app/pages/withdrawal/DashboardWithDrawSection";

const useWalletData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["wallet-data"],
    queryFn: async () => {
      const response = await axios.get(
        `https://testnet.cdeposit.online:50825/dash/agency`,
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        },
      );
      return response.data;
    },
  });

  return { data, isLoading };
};

export default function Home() {
  const { data, isLoading } = useWalletData();
  console.log(data);
  return (
    <Page title="대시보드">
      <div className="transition-content w-full px-[--margin-x] pt-5 lg:pt-6">
        <div className="min-w-0">
          {/* <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:py-6">
            대시보드
          </h2> */}

          <div className="h-fit rounded-lg border border-none border-gray-200 bg-white p-[54px] shadow-sm dark:bg-dark-700">
            <div className="transition-content grid grid-cols-12 gap-4 pb-8 sm:gap-5 lg:gap-6">
              <div className="col-span-12 space-y-4 sm:space-y-5 lg:col-span-8 lg:space-y-6">
                <Balance data={data} />
                <Watchlist data={data} isLoading={isLoading} />
                <ActivitiesTable />
              </div>
              <div className="col-span-12 space-y-4 sm:space-y-5 lg:col-span-4 lg:space-y-6">
                <Wallets data={data} isLoading={isLoading} />
                {/* <Exchange /> */}
                <DashboardWithdrawalRequestForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
