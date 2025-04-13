// Import Dependencies
import { useEffect } from "react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";

// Local Imports
import { Button } from "components/ui";
import { useLocaleContext } from "app/contexts/locale/context";
import { DatePicker } from "../form/Datepicker";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { ResponsiveFilter } from "./ResponsiveFilter";
import { useState } from "react";

// ----------------------------------------------------------------------

export function DateFilter({ title, config, onDateFilter }) {
  const [selectedValues, setSelectedValues] = useState(null);
  const { locale } = useLocaleContext();
  const { smAndDown } = useBreakpointsContext();

  return (
    <ResponsiveFilter
      buttonContent={
        <>
          <CalendarIcon className="size-4" />
          <span className="text-sm"> {title}</span>

          {selectedValues && (
            <>
              <div className="h-full w-px bg-gray-300 dark:bg-dark-450" />
              <span className="text-sm">
                {dayjs(selectedValues[0]).locale(locale).format("DD MMM YYYY")}{" "}
                -{" "}
                {dayjs(selectedValues[1]).locale(locale).format("DD MMM YYYY")}
              </span>
            </>
          )}
        </>
      }
    >
      <div
        className={clsx(
          "mx-auto flex w-full items-center justify-between",
          smAndDown
            ? "mb-2 mt-1 h-10 w-full max-w-xs border-b border-gray-200 py-3 dark:border-dark-500"
            : "bg-gray-150 px-2.5 py-2 dark:bg-dark-900",
        )}
      >
        <p className="truncate text-start text-base font-medium text-gray-800 dark:text-dark-50 sm:py-1 sm:text-sm">
          {title}
        </p>
        {selectedValues && (
          <Button
            onClick={() => onDateFilter(null)}
            className="h-7 px-3 text-xs"
          >
            Clear
          </Button>
        )}
      </div>
      <div className="max-sm:mx-auto max-sm:[&_.is-calendar]:w-80 max-sm:[&_.is-calendar]:max-w-none">
        <DatePicker
          isCalendar
          value={selectedValues ?? ""}
          readOnly
          onChange={(date) => {
            if (date.length === 0) {
              onDateFilter(null);
            }
            if (date.length === 2) {
              // Pass the actual Date objects to be formatted in the handler
              onDateFilter([date[0], date[1]]);
            }
          }}
          options={config}
        />{" "}
      </div>{" "}
    </ResponsiveFilter>
  );
}
