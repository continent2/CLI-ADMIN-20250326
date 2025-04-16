// Import Dependencies
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Chart from "react-apexcharts";
import PropTypes from "prop-types";

// Local Imports
import { Box } from "components/ui";

// ----------------------------------------------------------------------

const chartConfig = {
  chart: {
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
      top: -28,
      bottom: 0,
    },
  },
  xaxis: {
    show: false,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
};

export function WalletCard({ depositData }) {
  // Process the deposit data
  const chartPoints = depositData?.map((item) => item.sumamount / 1000) || [];
  const totalAmount =
    depositData?.reduce((sum, item) => sum + item.sumamount, 0) || 0;

  // Calculate trend (percentage change from first to last point)
  const trend =
    chartPoints?.length > 1
      ? ((chartPoints[chartPoints?.length - 1] - chartPoints[0]) /
          chartPoints[0]) *
        100
      : 0;

  return (
    <Box className="flex w-72 shrink-0 flex-col">
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-full bg-blue-100 dark:bg-blue-900" />
        <div>
          <span>Deposits</span>{" "}
          <span className="text-xs uppercase text-gray-400 dark:text-dark-300">
            STAT
          </span>
        </div>
      </div>
      <div className="mt-2.5 flex justify-between rounded-lg bg-gray-50 py-3 dark:bg-surface-3 ltr:pr-3 rtl:pl-3">
        <div className="ax-transparent-gridline">
          <Chart
            options={{
              ...chartConfig,
              colors: ["#3B82F6"], // Blue color for deposit chart
            }}
            series={[
              {
                name: "Deposits",
                data: chartPoints,
              },
            ]}
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
            <span>{Math.abs(trend)?.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </Box>
  );
}

WalletCard.propTypes = {
  depositData: PropTypes.arrayOf(
    PropTypes.shape({
      sumamount: PropTypes.number,
      hourvalue: PropTypes.string,
    }),
  ),
};
