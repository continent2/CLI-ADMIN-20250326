// Import Dependencies
import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";

// Local Imports
import { Button, Card, Box } from "components/ui";

// Chart Configuration
const chartConfig = {
  chart: {
    parentHeightOffset: 0,
    toolbar: { show: false },
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 3 },
  grid: { padding: { left: 0, right: 0, top: -28, bottom: 0 } },
  xaxis: {
    show: false,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { show: false },
  },
  yaxis: {
    show: false,
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { show: false },
  },
};

// Deposit Card Component
function DepositCard({ data, title, timeUnit }) {
  const chartPoints = data?.map((item) => item.sumamount / 1000) || [];
  const totalAmount = data?.reduce((sum, item) => sum + item.sumamount, 0) || 0;

  const trend =
    chartPoints.length > 1
      ? ((chartPoints[chartPoints.length - 1] - chartPoints[0]) /
          (chartPoints[0] || 1)) *
        100
      : 0;

  return (
    <Box className="flex w-72 shrink-0 flex-col">
      <div className="flex items-center gap-2">
        <div
          className={`size-6 rounded-full ${
            trend >= 0
              ? "bg-green-100 dark:bg-green-900"
              : "bg-red-100 dark:bg-red-900"
          }`}
        />
        <div>
          <span>{title}</span>
          <span className="ml-2 text-xs uppercase text-gray-400 dark:text-dark-300">
            {timeUnit}
          </span>
        </div>
      </div>
      <div className="mt-2.5 flex justify-between rounded-lg bg-gray-50 py-3 dark:bg-surface-3 ltr:pr-3 rtl:pl-3">
        <div className="ax-transparent-gridline">
          <Chart
            options={{ ...chartConfig, colors: ["#3B82F6"] }}
            series={[{ name: "Deposits", data: chartPoints }]}
            height="60"
            width="120"
            type="line"
          />
        </div>
        <div className="flex w-36 flex-col items-center rounded-lg bg-gray-100 py-2 dark:bg-surface-2">
          <p className="truncate text-xl font-medium text-gray-800 dark:text-dark-100">
            ${totalAmount}
          </p>
          <div
            className={clsx(
              `this:${trend > 0 ? "success" : "error"}`,
              "mt-1 flex items-center gap-0.5 text-xs text-this dark:text-this-lighter",
            )}
          >
            {trend > 0 ? (
              <ArrowUpIcon className="size-3.5" />
            ) : (
              <ArrowDownIcon className="size-3.5" />
            )}
            <span>{Math.abs(trend).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </Box>
  );
}

function UserRanking({ data, title }) {
  const chartPoints = data?.map((item) => item.sumamount) || [];

  return (
    <Box className="flex w-72 shrink-0 flex-col">
      <div className="flex items-center gap-2">
        <div>
          <span>{title}</span>
          {/* <span className="ml-2 text-xs uppercase text-gray-400 dark:text-dark-300"> */}
          {/*   {timeUnit} */}
          {/* </span> */}
        </div>
      </div>
      <div className="mt-2.5 flex justify-between rounded-lg bg-gray-50 py-3 dark:bg-surface-3 ltr:pr-3 rtl:pl-3">
        <div className="ax-transparent-gridline">
          <Chart
            options={{ ...chartConfig, colors: ["#3B82F6"] }}
            series={[{ name: "Deposits", data: chartPoints }]}
            height="60"
            width="120"
            type="line"
          />
        </div>
      </div>
    </Box>
  );
}

// Action Menu Component
function ActionMenu() {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left ltr:-mr-1.5 rtl:-ml-1.5"
    >
      <MenuButton
        as={Button}
        isIcon
        variant="flat"
        className="size-8 rounded-full"
      >
        <EllipsisHorizontalIcon className="size-5" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <MenuItems className="absolute z-[100] mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 text-gray-600 shadow-lg shadow-gray-200/50 outline-none focus-visible:outline-none dark:border-dark-500 dark:bg-dark-700 dark:text-dark-200 dark:shadow-none ltr:right-0 rtl:left-0">
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-none transition-colors",
                  focus &&
                    "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
                )}
              >
                <span>데이터 새로 고침</span>
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-none transition-colors",
                  focus &&
                    "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
                )}
              >
                <span>내보내다</span>
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

// Main Watchlist Component
export function Watchlist({ data }) {
  // Process both data types
  const hourlyData = data?.stat_sum_deposit_by_hour?.flat() || [];
  const dailyData = data?.stat_sum_deposit_by_date?.flat() || [];
  const top3 = data?.user_rank
    ?.flat()
    ?.sort((a, b) => b.sumamount - a.sumamount)
    .slice(0, 3);

  // Format date strings (YYYYMMDD -> MM/DD)
  const formattedDailyData = dailyData.map((item) => ({
    ...item,
    datevalue: `${item.datevalue.slice(4, 6)}/${item.datevalue.slice(6, 8)}`,
  }));

  return (
    <Card>
      <div className="flex items-center justify-between px-4 py-3 sm:px-5">
        <h2 className="truncate font-medium tracking-wide text-gray-800 dark:text-dark-100">
          예금통계
        </h2>
        <ActionMenu />
      </div>

      <div className="custom-scrollbar flex space-x-4 overflow-x-auto overflow-y-hidden px-4 pb-4 sm:px-5">
        <DepositCard data={hourlyData} title="시간당 입금" timeUnit="24시간" />
        <DepositCard
          data={formattedDailyData}
          title="일일 예금"
          timeUnit="날짜"
        />

        <div className="flex flex-col gap-2">
          <h2>상위 3개 예금주</h2>
          <ol className="space-y-3">
            {top3?.map((user, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700 dark:text-dark-100">
                    #{index + 1}
                  </span>
                  {/* <span className="text-gray-600 dark:text-dark-200"> */}
                  {/*   {user.username} */}
                  {/* </span> */}
                </div>
                <span className="font-medium text-green-600 dark:text-green-400">
                  ${user?.sumamount?.toFixed(0)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Card>
  );
}

// PropTypes
DepositCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      sumamount: PropTypes.number,
      hourvalue: PropTypes.string,
      datevalue: PropTypes.string,
    }),
  ),
  title: PropTypes.string.isRequired,
  timeUnit: PropTypes.string.isRequired,
};

Watchlist.propTypes = {
  data: PropTypes.shape({
    stat_sum_deposit_by_hour: PropTypes.array,
    stat_sum_deposit_by_date: PropTypes.array,
  }),
};
