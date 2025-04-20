// Import Dependencies
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import PropTypes from "prop-types";

// Local Imports
import { Input } from "components/ui";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { DateFilter } from "components/shared/table/DateFilter";
import { useState } from "react";
import { TableConfig } from "./TableConfig";

// ----------------------------------------------------------------------

export function Toolbar({ table }) {
  const { isXs } = useBreakpointsContext();
  const isFullScreenEnabled = table.getState().tableSettings.enableFullScreen;

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
            {table.getColumn("등록일") && (
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
          ></div>
        </>
      ) : (
        <div
          className={clsx(
            "custom-scrollbar transition-content flex items-center justify-end space-x-4 overflow-x-auto pb-1 rtl:space-x-reverse",
            isFullScreenEnabled ? "px-4 sm:px-5" : "px-[--margin-x]",
          )}
          style={{
            "--margin-scroll": isFullScreenEnabled
              ? "1.25rem"
              : "var(--margin-x)",
          }}
        >
          <div className="flex shrink-0 space-x-2 rtl:space-x-reverse">
            <SearchInput
              onSearch={(value) => table.options.meta.handleSearch(value)}
              value={table.options.meta.searchTerm || ""}
            />
            {table.getColumn("등록일") && (
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
        </div>
      )}
    </div>
  );
}

function SearchInput({ onSearch, value }) {
  return (
    <Input
      value={value}
      onChange={(e) => {
        onSearch(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch(e.target.value); // Trigger search only on Enter key
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

Toolbar.propTypes = {
  table: PropTypes.object,
};

SearchInput.propTypes = {
  onSearch: PropTypes.func,
};
