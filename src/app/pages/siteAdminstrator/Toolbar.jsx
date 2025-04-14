// Import Dependencies
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import PropTypes from "prop-types";

// Local Imports
import { Input } from "components/ui";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { DateFilter } from "components/shared/table/DateFilter";
import { TableConfig } from "../deposit/TableConfig.jsx";
import { useEffect, useState } from "react";
import { useAdminUserContext } from "../../contexts/adminUser/context.js";
import { RoleFilter } from "../deposit/RoleFilter.jsx";

// ----------------------------------------------------------------------

export function Toolbar({ table }) {
  const { isXs } = useBreakpointsContext();
  const isFullScreenEnabled = table.getState().tableSettings.enableFullScreen;
  const { siteList } = useAdminUserContext();
  const [siteOption, setsiteOption] = useState({});

  // Update the `deposit` state when `list` changes
  useEffect(() => {
    if (siteList && siteList.length > 0) {
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
            <SearchInput table={table} />
            {table.getColumn("등록일") && (
              <DateFilter
                column={table.getColumn("등록일")}
                title="Date Range"
                config={{
                  maxDate: new Date().fp_incr(1),
                  mode: "range",
                }}
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
                <RoleFilter
                  column={table.getColumn("사이트")}
                  options={siteOption}
                />
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
              <RoleFilter
                column={table.getColumn("사이트")}
                options={siteOption}
              />
              <SearchSiteInput table={table} />
            </div>
          )}

          <div className="flex shrink-0 space-x-2 rtl:space-x-reverse">
            <SearchInput table={table} />
            {table.getColumn("등록일") && (
              <DateFilter
                column={table.getColumn("등록일")}
                title="Date Range"
                config={{
                  maxDate: new Date().fp_incr(1),
                  mode: "range",
                }}
              />
            )}
            <TableConfig table={table} />
          </div>
        </div>
      )}
    </div>
  );
}

function SearchInput({ table }) {
  return (
    <Input
      value={table.getState().globalFilter}
      onChange={(e) => table.setGlobalFilter(e.target.value)}
      prefix={<MagnifyingGlassIcon className="size-4" />}
      classNames={{
        root: "shrink-0",
        input: "text-sm ring-primary-500/50 focus:ring",
      }}
      placeholder="Search Name, Member Id..."
    />
  );
}

function SearchSiteInput({ table }) {
  return (
    <Input
      value={table.getState().globalFilter}
      onChange={(e) => table.setGlobalFilter(e.target.value)}
      prefix={<MagnifyingGlassIcon className="size-6" />}
      classNames={{
        root: "h-full",
        input: "border-0 py-4 text-sm",
      }}
      placeholder="Search Site"
    />
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
