// Import Dependencies
import clsx from "clsx";
import PropTypes from "prop-types";

// Local Imports
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { DateFilter } from "components/shared/table/DateFilter";
import { SearchInput, SearchSiteInput } from "components/ui";
import { useEffect, useState } from "react";
import { useMemberContext } from "../../contexts/member/context.js";
import { RoleFilter } from "./RoleFilter";
import { TableConfig } from "./TableConfig";

// ----------------------------------------------------------------------

export function Toolbar({ table }) {
  const { isXs } = useBreakpointsContext();
  const isFullScreenEnabled = table.getState().tableSettings.enableFullScreen;
  const { siteList, isLoading } = useMemberContext();
  const [siteOption, setSiteOption] = useState({});

  console.log(siteList, "list for options")

  // Update the site options when siteList changes
  useEffect(() => {
    if (siteList && siteList?.length > 0) {
      setSiteOption(siteList);
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
              value={table.options.meta.searchTerm || ""}
            />
            {table.getColumn("사용시작일") && (
              <DateFilter
                title="기간"
                config={{
                  //  maxDate: new Date().fp_incr(1),
                  mode: "range",
                }}
                onDateFilter={(dates) =>
                  table.options.meta.handleDateFilter(dates)
                }
                value={table.options.meta.dateRange}
              />
            )}
            <TableConfig table={table} />
          </div>
          <div
            className={clsx(
              "hide-scrollbar flex shrink-0 space-x-2 overflow-x-auto pb-1 pt-4 rtl:space-x-reverse",
              isFullScreenEnabled ? "px-4 sm:px-5" : "px-[--margin-x]",
            )}
          >
            {table.getColumn("사이트") && (
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
          {table.getColumn("사이트") && (
            <div className="flex items-center justify-between overflow-hidden rounded-xl border border-gray-300 text-sm ring-primary-500/50 hover:border-gray-400 focus:border-primary-600 focus:ring dark:border-dark-450 dark:hover:border-dark-400 dark:focus:border-primary-500">
              <RoleFilter table={table} options={siteOption} />
              <SearchSiteInput table={table} />
            </div>
          )}

          <div className="flex shrink-0 justify-end space-x-2 rtl:space-x-reverse">
            <SearchInput
              onSearch={(value) => table.options.meta.handleSearch(value)}
              value={table.options.meta.searchTerm || ""}
              disabled={isLoading}
            />
            {table.getColumn("사용시작일") && (
              <DateFilter
                title="기간"
                config={{
                  //  maxDate: new Date().fp_incr(1),
                  mode: "range",
                }}
                onDateFilter={(dates) =>
                  table.options.meta.handleDateFilter(dates)
                }
                value={table.options.meta.dateRange}
                disabled={isLoading}
              />
            )}
            <TableConfig table={table} />
          </div>
        </div>
      )}
    </div>
  );
}

Toolbar.propTypes = {
  table: PropTypes.object.isRequired,
};
