// Import Dependencies
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import PropTypes from "prop-types";

// Local Imports
import { Input } from "components/ui";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { TableConfig } from "./TableConfig";
import { RoleFilter } from "./RoleFilter";
import { useDepositContext } from "../../contexts/deposit/context.js";
import { useEffect, useState } from "react";

// Import Dependencies
import { CalendarIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";

// Local Imports
import { Button } from "components/ui";
import { useLocaleContext } from "app/contexts/locale/context";
import { DatePicker } from "components/shared/form/Datepicker";
import { ResponsiveFilter } from "components/shared/table/ResponsiveFilter";

// ----------------------------------------------------------------------

export function Toolbar({ table }) {
  const { isXs } = useBreakpointsContext();
  const { siteList } = useDepositContext();
  const [siteOption, setsiteOption] = useState({});
  const isFullScreenEnabled = table.getState().tableSettings.enableFullScreen;

  // Update the `deposit` state when `list` changes
  useEffect(() => {
    if (siteList && siteList?.length > 0) {
      setsiteOption(siteList);
    }
  }, [siteList]);

  return (
    <div className="table-toolbar">
      <div
        className={clsx(
          "transition-content flex items-center justify-between space-x-4 rtl:space-x-reverse",
          isFullScreenEnabled ? "px-4 sm:px-5" : "px-[--margin-x]",
        )}
      ></div>

      {isXs ? (
        <>
          <div
            className={clsx(
              "flex space-x-2 pt-4 rtl:space-x-reverse [&_.input-root]:flex-1",
              isFullScreenEnabled ? "px-4 sm:px-5" : "px-[--margin-x]",
            )}
          >
            <SearchInput
              onSearch={(value) => table.options?.meta.handleSearch(value)}
            />
            {table.getColumn("생성시간") && (
              <DateFilter
                title="기간"
                config={{
                  maxDate: new Date().fp_incr(1),
                  mode: "range",
                }}
                onDateFilter={(dates) =>
                  table.options.meta.handleDateFilter(dates)
                }
              />
            )}{" "}
            <TableConfig table={table} />
          </div>
          <div
            className={clsx(
              "hide-scrollbar flex shrink-0 space-x-2 overflow-x-auto pb-1 pt-4 rtl:space-x-reverse",
              isFullScreenEnabled ? "px-4 sm:px-5" : "px-[--margin-x]",
            )}
          >
            {table.getColumn("사이트 URL") && (
              <div className="flex items-center justify-between overflow-hidden rounded-xl border border-gray-300 text-sm ring-primary-500/50 hover:border-gray-400 focus:border-primary-600 focus:ring dark:border-dark-450 dark:hover:border-dark-400 dark:focus:border-primary-500">
                <RoleFilter table={table} options={siteOption} />
                <SearchSiteInput table={table} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          className={clsx(
            "custom-scrollbar transition-content flex items-center justify-between space-x-4 overflow-x-auto pb-1 rtl:space-x-reverse",
            isFullScreenEnabled ? "px-4 sm:px-5" : "px-[--margin-x]",
          )}
          style={{
            "--margin-scroll": isFullScreenEnabled
              ? "1.25rem"
              : "var(--margin-x)",
          }}
        >
          {table.getColumn("사이트 URL") && (
            <div className="flex items-center justify-between overflow-hidden rounded-xl border border-gray-300 text-sm ring-primary-500/50 hover:border-gray-400 focus:border-primary-600 focus:ring dark:border-dark-450 dark:hover:border-dark-400 dark:focus:border-primary-500">
              <RoleFilter table={table} options={siteOption} />
              <SearchSiteInput table={table} />
            </div>
          )}

          <div className="flex shrink-0 justify-end space-x-2 rtl:space-x-reverse">
            <SearchInput
              onSearch={(value) => table.options.meta.handleSearch(value)}
            />
            {table.getColumn("생성시간") && (
              <DateFilter
                title="기간"
                config={{
                  maxDate: new Date().fp_incr(1),
                  mode: "range",
                }}
                onDateFilter={(dates) => {
                  return table.options.meta.handleDateFilter(dates);
                }}
              />
            )}{" "}
            <TableConfig table={table} />
          </div>
        </div>
      )}
    </div>
  );
}

function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} // Only update state, don't trigger search
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch(searchTerm); // Trigger search only on Enter key
        }
      }}
      prefix={<MagnifyingGlassIcon className="size-4" />}
      classNames={{
        root: "shrink-0",
        input: "py-2 text-sm ring-primary-500/50 focus:ring",
      }}
      placeholder="검색"
    />
  );
}

function SearchSiteInput() {
  return (
    <Input
      prefix={<MagnifyingGlassIcon className="size-6" />}
      classNames={{
        root: "h-full",
        input: "border-0 py-2 text-sm",
      }}
      placeholder="사이트 검색"
    />
  );
}

function DateFilter({ title, config, onDateFilter }) {
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
                if (date?.length === 0) {
                  onDateFilter(null);
                }
                if (date?.length === 2) {
                  // Pass the actual Date objects to be formatted in the handler
                  onDateFilter([date[0], date[1]]);
                  close();
                }
              }}
              options={config}
            />{" "}
          </div>{" "}
        </>
      )}
    </ResponsiveFilter>
  );
}

Toolbar.propTypes = {
  table: PropTypes.object,
};

SearchInput.propTypes = {
  table: PropTypes.object,
};

SearchSiteInput.propTypes = {
  table: PropTypes.object,
};
