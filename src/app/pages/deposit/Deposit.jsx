// Import Dependencies
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useState, useEffect } from "react";

// Local Imports
import { Page } from "components/shared/Page";
import { Box, Card } from "components/ui";
import { useLockScrollbar, useDidUpdate, useLocalStorage } from "hooks";
import { fuzzyFilter } from "utils/react-table/fuzzyFilter";
import { useSkipper } from "utils/react-table/useSkipper";
import { Toolbar } from "./Toolbar";
import { columns } from "./columns";
import { usersList } from "./data";
import { PaginationSection } from "components/shared/table/PaginationSection";
import { SelectedRowsActions } from "./SelectedRowsActions";
import { ListView } from "./ListView";
import { GridView } from "./GridView";
import { useDepositContext } from "../../contexts/deposit/context.js";
import { useSearchParams } from "react-router";
import NoData from "components/shared/NoData";

// ----------------------------------------------------------------------

export default function Deposit() {
  const { deposits, count, list } = useDepositContext();
  const [users, setUsers] = useState([...usersList]);
  const [deposit, setDeposit] = useState([]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [siteId, setSiteId] = useState("");

  const [tableSettings, setTableSettings] = useState({
    enableFullScreen: false,
    enableRowDense: false,
  });

  const [searchParams] = useSearchParams();
  const pageIndex = searchParams.get("page") || 1; // Default to 1 if not provided

  const paginationData = {
    fetchData: (offset, limit) => {
      // Convert date range to ISO strings if available
      const timeStartIso = dateRange[0]
        ? new Date(dateRange[0]).toISOString().replace(/\.\d+Z$/, "")
        : null;
      const timeEndIso = dateRange[1]
        ? new Date(dateRange[1]).toISOString().replace(/\.\d+Z$/, "")
        : null;
      deposits({
        offSet: offset,
        limit,
        searchKey: searchTerm,
        timeStartIso,
        timeEndIso,
        siteId,
      });
    },
    count,
    pageIndex,
    name: "deposit",
  };
  useEffect(() => {
    // if (siteId) {
    paginationData.fetchData(0, 20);
    // }
  }, [siteId]);

  const [globalFilter, setGlobalFilter] = useState("");

  const [sorting, setSorting] = useState([]);

  const [viewType, setViewType] = useLocalStorage(
    "users-table-view-type",
    "list",
  );

  const [columnVisibility, setColumnVisibility] = useLocalStorage(
    "column-visibility-users",
    {},
  );

  const [columnPinning, setColumnPinning] = useLocalStorage(
    "column-pinning-users",
    {},
  );
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const table = useReactTable({
    data: deposit,
    columns: columns,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    state: {
      globalFilter,
      sorting,
      columnVisibility,
      columnPinning,
      tableSettings,
      viewType,
    },
    meta: {
      handleSearch: (value) => {
        setSearchTerm(value);
        // Reset to first page when searching
        paginationData.fetchData(0, 20);
      },
      handleDateFilter: (dates) => {
        // Format dates to ISO string without milliseconds
        const formattedDates = dates?.map((date) =>
          date ? new Date(date).toISOString().replace(/\.\d+Z$/, "") : null,
        );
        setDateRange(formattedDates);
        paginationData.fetchData(0, 20);
      },
      handleSiteChange: (id) => {
        setSiteId(id);
      },
      siteId,
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setUsers((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
      handleReload: () => {
        setSearchTerm("");
        setDateRange([]);
        setSiteId("");
        paginationData.fetchData(0, 20);
      },
      deleteRow: (row) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setUsers((old) =>
          old.filter((oldRow) => oldRow.user_id !== row.original.user_id),
        );
      },
      deleteRows: (rows) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        const rowIds = rows.map((row) => row.original.user_id);
        setUsers((old) => old.filter((row) => !rowIds.includes(row.user_id)));
      },
      setTableSettings,
      setViewType,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableSorting: tableSettings.enableSorting,
    enableColumnFilters: tableSettings.enableColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,

    autoResetPageIndex,
  });

  useDidUpdate(() => table.resetRowSelection(), [users]);

  useLockScrollbar(tableSettings.enableFullScreen);

  const rows = table.getRowModel().rows;

  const WrapComponent = viewType === "list" ? Card : Box;

  // Initial load
  useEffect(() => {
    paginationData.fetchData(0, 20);
  }, []);

  // Update the `deposit` state when `list` changes
  useEffect(() => {
    // if (list && list?.length > 0) {
    setDeposit(list);
    // }
  }, [list]);

  return (
    <Page title="입금 내역">
      <div className="transition-content w-full py-5">
        {/* <h2 className="truncate px-[--margin-x] py-6 text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
        입금 내역
        </h2> */}
        <div
          className={clsx(
            "flex h-full w-full flex-col",
            tableSettings.enableFullScreen &&
              "fixed inset-0 z-[61] bg-white pt-3 dark:bg-dark-900",
          )}
        >
          <Toolbar table={table} />
          <div
            className={clsx(
              "transition-content flex grow flex-col pt-3",
              tableSettings.enableFullScreen
                ? "overflow-hidden"
                : "px-[--margin-x]",
            )}
          >
            <WrapComponent
              className={clsx(
                "relative flex grow flex-col",
                tableSettings.enableFullScreen && "overflow-hidden",
              )}
            >
              {viewType === "list" &&
                (rows.length === 0 ? (
                  <NoData message="No deposit data found." />
                ) : (
                  <ListView table={table} flexRender={flexRender} rows={rows} />
                ))}

              {viewType === "grid" && <GridView table={table} rows={rows} />}

              {table.getCoreRowModel().rows?.length > 0 && (
                <div
                  className={clsx(
                    "pb-4 sm:pt-4",
                    (viewType === "list" || tableSettings.enableFullScreen) &&
                      "px-4 sm:px-5",
                    tableSettings.enableFullScreen &&
                      "bg-gray-50 dark:bg-dark-800",
                    !(
                      table.getIsSomeRowsSelected() ||
                      table.getIsAllRowsSelected()
                    ) && "pt-4",
                    viewType === "grid" &&
                      !tableSettings.enableFullScreen &&
                      "mt-3",
                  )}
                >
                  <PaginationSection
                    table={table}
                    paginationData={paginationData}
                  />
                </div>
              )}
            </WrapComponent>
            <SelectedRowsActions table={table} />
          </div>
        </div>
      </div>
    </Page>
  );
}
