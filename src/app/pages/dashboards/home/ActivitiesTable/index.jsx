import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from '@tanstack/react-query';
import clsx from "clsx";
import { useRef, useState } from "react";
import axios from "axios";

// Components
import { CollapsibleSearch } from "components/shared/CollapsibleSearch";
import { TableSortIcon } from "components/shared/table/TableSortIcon";
import { SelectedRowsActions } from "components/shared/table/SelectedRowsActions";
import { Card, Table, THead, TBody, Th, Tr, Td } from "components/ui";
import { PaginationSection } from "./PaginationSection";
import { MenuAction } from "./MenuActions";
import { columns } from "./columns";

// Hooks
import { useBoxSize, useDidUpdate } from "hooks";
import { fuzzyFilter } from "utils/react-table/fuzzyFilter";
import { useSkipper } from "utils/react-table/useSkipper";

const API_URL = "https://testnet.cdeposit.online:50825/query/list/custom/deposit/_/_/id/DESC";

export function ActivitiesTable() {
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const theadRef = useRef();
  const { height: theadHeight } = useBoxSize({ ref: theadRef });

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [offset, setOffset] = useState(0);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['deposits', pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      const offset = pagination.pageIndex * pagination.pageSize;
      const response = await axios.get(`${API_URL}/${offset}/${pagination.pageSize}`, {

        headers: {
          Authorization: localStorage.getItem("authToken")
        }
      });
      
      console.log(pagination.pageIndex, pagination.pageSize);
      const currentCount = response.data.list.length;
      setTotalItems(offset + currentCount);
      setHasMore(currentCount === pagination.pageSize);

      return {
        list: response.data.list.map(item => ({
          activity_id: item.id,
          activity_name: item["user.username"],
          activity_type: {
            key: "deposit",
            title: "Deposit"
          },
          account_name: item["transfer.currency"],
          transaction_date: item["transfer.timestamp"],
          amount: item["transfer.amount"],
          site_name: item["site.siteurl"] || item["site.name"]
        }))
      };
    },
    keepPreviousData: true,
    staleTime: 5000,
  });

  const table = useReactTable({
    data: data?.list || [],
    columns,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    meta: {
      deleteRow: () => {
        skipAutoResetPageIndex();
        // Handle delete functionality
      },
      deleteRows: () => {
        skipAutoResetPageIndex();
        // Handle bulk delete functionality
      },
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
       onPaginationChange: (updater) => {
    setPagination((prev) => {
      const newState = typeof updater === 'function' ? updater(prev) : updater;
      return newState;
    });
  },
    manualPagination: true,
    pageCount: hasMore ? pagination.pageIndex + 2 : pagination.pageIndex + 1,
    autoResetPageIndex,
  });

  useDidUpdate(() => table.resetRowSelection(), [data?.list?.length]);

  return (
    <div>
      <div className="table-toolbar flex items-center justify-between">
        <h2 className="truncate text-base font-medium tracking-wide text-gray-800 dark:text-dark-100">
          Deposit Activity Table
        </h2>
        <div className="flex">
          <CollapsibleSearch
            placeholder="Search here..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <MenuAction />
        </div>
      </div>
      <Card className="relative mt-3">
        {isLoading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : isError ? (
          <div className="p-4 text-center text-error">{error.message}</div>
        ) : (
          <>
            <div className="table-wrapper min-w-full overflow-x-auto">
              <Table hoverable className="w-full text-left rtl:text-right">
                <THead ref={theadRef}>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <Th
                          key={header.id}
                          className="bg-gray-200 font-semibold uppercase text-gray-800 dark:bg-dark-800 dark:text-dark-100 ltr:first:rounded-tl-lg ltr:last:rounded-tr-lg rtl:first:rounded-tr-lg rtl:last:rounded-tl-lg"
                        >
                          {header.column.getCanSort() ? (
                            <div
                              className="flex cursor-pointer select-none items-center space-x-3 rtl:space-x-reverse"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              <span className="flex-1">
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                    )}
                              </span>
                              <TableSortIcon sorted={header.column.getIsSorted()} />
                            </div>
                          ) : header.isPlaceholder ? null : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )
                          )}
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </THead>
                <TBody>
                  {table.getRowModel().rows.map((row) => (
                    <Tr
                      key={row.id}
                      className={clsx(
                        "relative border-y border-transparent border-b-gray-200 dark:border-b-dark-500",
                        row.getIsSelected() &&
                          "row-selected after:pointer-events-none after:absolute after:inset-0 after:z-2 after:h-full after:w-full after:border-3 after:border-transparent after:bg-primary-500/10 ltr:after:border-l-primary-500 rtl:after:border-r-primary-500",
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <Td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </div>
            {table.getCoreRowModel().rows.length > 0 && (
              <div className="p-4 sm:px-5">
                <PaginationSection 
                  table={table} 
                  hasMore={hasMore}
                  totalItems={totalItems}
                />
              </div>
            )}
            <SelectedRowsActions table={table} height={theadHeight} />
          </>
        )}
      </Card>
    </div>
  );
}
