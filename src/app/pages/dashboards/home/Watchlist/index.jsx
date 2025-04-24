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
import { formatNumberWithCommas } from "utils/formatNumberWithCommas";

// Chart Configuration
const baseChartConfig = {
  chart: {
    parentHeightOffset: 0,
    toolbar: {
      show: false,
      tools: {
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
    zoom: {
      enabled: true,
      type: "x",
    },
  },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 3 },
  yaxis: {
    show: false,
  },
  tooltip: {
    enabled: true,
    grid: { padding: { left: 0, right: 0, top: -28, bottom: 0 } },
    yaxis: {
      show: false,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
  },
};

// Deposit Card Component
function DepositCard({ data, title, timeUnit, isHourly }) {
  const chartPoints = data?.map((item) => item.sumamount) || [];
  const labels =
    data?.map((item, index) =>
      isHourly
        ? parseInt(item.hourvalue) % 2 === 0
          ? `${item.hourvalue}h`
          : ""
        : index % 2 === 0
          ? formatDateLabel(item.datevalue)
          : "",
    ) || [];

  const trend =
    chartPoints.length > 1
      ? ((chartPoints[chartPoints.length - 1] - chartPoints[0]) /
          (chartPoints[0] || 1)) *
        100
      : 0;

  const chartConfig = {
    ...baseChartConfig,
    xaxis: {
      ...baseChartConfig.xaxis,
      categories: labels,
      labels: {
        ...baseChartConfig?.xaxis?.labels,
        show: true,
        rotate: -45,
        style: {
          colors: "#6B7280",
          fontSize: "10px",
        },
      },
    },
    tooltip: {
      ...baseChartConfig.tooltip,
      x: {
        formatter: function (val, opts) {
          if (isHourly) {
            return `${val}h`;
          } else {
            const dataPoint = data[opts.dataPointIndex];
            return formatDateTooltip(dataPoint.datevalue);
          }
        },
      },
      y: {
        formatter: function (val) {
          return "$" + val.toLocaleString();
        },
      },
    },
  };

  // Helper function to format date for labels (MM/DD)
  function formatDateLabel(dateStr) {
    if (!dateStr) return "";
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${day}/${month}`;
  }

  // Helper function to format date for tooltips (Weekday, Month Day)
  function formatDateTooltip(dateStr) {
    if (!dateStr) return "";
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <Box className="flex w-full shrink-0 flex-col sm:w-96">
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
      <div className="mt-2.5 flex flex-col rounded-lg bg-gray-50 p-3 dark:bg-surface-3">
        <div className="ax-transparent-gridline">
          <Chart
            options={chartConfig}
            series={[
              {
                name: "Deposits",
                data: chartPoints,
              },
            ]}
            height={180}
            type="line"
          />
        </div>
      </div>
    </Box>
  );
}

// Main Watchlist Component
export function Watchlist({ data }) {
  // Process both data types
  const hourlyData = data?.stat_sum_deposit_by_hour[0] || [];
  const dailyData = data?.stat_sum_deposit_by_date[0] || [];
  const top5 = [
    ...new Map(
      data?.user_rank?.flat()?.map((user) => [user.userid, user]) ?? [],
    ).values(),
  ]
    .sort((a, b) => b?.sumamount - a?.sumamount)
    .slice(0, 5);

  return (
    <Card>
      <div className="flex items-center justify-between px-4 py-3 sm:px-5">
        <h2 className="truncate font-medium tracking-wide text-gray-800 dark:text-dark-100">
        입금현황
        </h2>
      </div>

      <div className="custom-scrollbar flex space-x-4 overflow-x-auto overflow-y-hidden px-4 pb-4 sm:px-5">
        <DepositCard
          data={hourlyData}
          title="시간대별 입금" 
          timeUnit="(30일)"
          isHourly={true}
        />
        <DepositCard
          data={dailyData}
          title="일별 입금"
          timeUnit="(30일)"
          isHourly={false}
        />

        <div className="flex flex-col gap-2">
          <h2 className="w-28">상위 입금회원</h2>
          <ol className="space-y-3">
            {top5?.map((user, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700 dark:text-dark-100">
                    #{index + 1}
                  </span>
                  <span className="text-gray-600 dark:text-dark-200">
                    {user.username}
                  </span>
                  <span className="text-gray-600 dark:text-dark-200">
                    {user.externaluserid}
                  </span>
                </div>
                <span className="font-medium text-green-600 dark:text-green-400">
                  ${formatNumberWithCommas(user?.sumamount?.toFixed(0))}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Card>
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
    user_rank: PropTypes.array,
  }),
};
