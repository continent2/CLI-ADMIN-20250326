// Import Dependencies
import { useEffect, useState } from "react";
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

// ----------------------------------------------------------------------

export function DateFilter({ title, config, onDateFilter, value, disabled }) {
  const [selectedValues, setSelectedValues] = useState(value || null);
  const { locale } = useLocaleContext();
  const { smAndDown } = useBreakpointsContext();

  // Sync with external value changes
  useEffect(() => {
    console.log(value);
    setSelectedValues(value || null);
  }, [value]);

  const handleClear = () => {
    onDateFilter(null);
    setSelectedValues(null);
  };

  const handleDateChange = (date) => {
    if (!date || date.length === 0) {
      handleClear();
      return;
    }

    if (date.length === 2) {
      onDateFilter([date[0], date[1]]);
      setSelectedValues([date[0], date[1]]);
    }
  };

  return (
    <ResponsiveFilter
      buttonContent={
        <>
          <CalendarIcon className="size-4" />
          <span className="text-sm">{title}</span>
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
      disabled={disabled}
    >
      {({ close = () => {} }) => (
        <>
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
                onClick={() => {
                  handleClear();
                  close();
                }}
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
                handleDateChange(date);
                if (date?.length === 2) close();
              }}
              options={config}
              disabled={disabled}
            />
          </div>
        </>
      )}
    </ResponsiveFilter>
  );
}

DateFilter.propTypes = {
  title: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  onDateFilter: PropTypes.func.isRequired,
  value: PropTypes.array,
  disabled: PropTypes.bool,
};

DateFilter.defaultProps = {
  value: null,
  disabled: false,
};
