// Local Imports
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

// Import Dependencies
import { CollapsibleSearch } from "components/shared/CollapsibleSearch";
import { TableSortIcon } from "components/shared/table/TableSortIcon";
import { SelectedRowsActions } from "components/shared/table/SelectedRowsActions";
import { Card, Table, THead, TBody, Th, Tr, Td } from "components/ui";
import { useBoxSize, useDidUpdate } from "hooks";
import { fuzzyFilter } from "utils/react-table/fuzzyFilter";
import { useSkipper } from "utils/react-table/useSkipper";
import { PaginationSection } from "./PaginationSection";
import { MenuAction } from "./MenuActions";
import { useAppDataContext } from "../../../../contexts/appData/context.js";
import { useSearchParams } from "react-router";
import { DateCell } from "./rows";
import { CopyableCellWithClick } from "components/shared/table/CopyableCell";
import { tronScan_Address, tronScan_Transaction } from "constants/app.constant";

// ----------------------------------------------------------------------

const columns = [
  {
    accessorKey: "createdat",
    header: "등록일",
    cell: DateCell
  },
  {
    accessorKey: "site.siteurl",
    header: "사이트URL",
    // cell: (info) => info.row.original?.["site.siteurl"] || "-",
    cell: ({ row }) => {
      const siteUrl = row.original["site.siteurl"]; // Get SiteList URL
      const siteId = row.original["site.id"]; // Get SiteList ID

      return (
        <div>
          <a
            href={siteUrl || "#"} // Corrected link to use siteUrl
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 no-underline dark:text-gray-500" // Add style if needed
          >
            {siteUrl.replace(/^https?:\/\//, "") || "N/A"}{" "}
            {/* Display site URL or "-" if not available */}
          </a>
          <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
          <p>{siteId || "N/A"}</p>{" "}
          {/* Display SiteList ID or "N/A" if not available */}
        </div>
      );
    },
  },
  {
    accessorKey: "user.externaluserid",
    header: "사용자ID",
    cell: (info) => info.row.original?.["user.externaluserid"] || "-",
  },
  {
    accessorKey: "transfer.amount",
    header: "수량",
    cell: (info) => info.row.original?.["transfer.amount"] || "-",
  },
  {
    accessorKey: "transfer.currency",
    header: "단위",
    cell: (info) => info.row.original?.["transfer.currency"] || "-",
  },
  {
    accessorKey: "transfer.from",
    header: "보낸주소",
    // cell: (info) => info.row.original?.["transfer.from"] || "-",
    cell: ({ row, table }) => {
      const fromAddress = row.original["transfer.from"];

      return (
        <CopyableCellWithClick
          getValue={() => fromAddress || "N/A"}
          table={table}
          onClick={() => {
            if (fromAddress) {
              window.open(`${tronScan_Address}${fromAddress}`, "_blank");
            }
          }}
        />
      );
    }
  },
  {
    accessorKey: "transfer.txhash",
    header: "전송ID",
    // cell: (info) => info.row.original?.["transfer.txhash"] || "-",
    cell: ({ row, table }) => {
      // const gasFee = row.original["transfer.gasfee"]; // Get Gasfee

      return (
        <div>
          <CopyableCellWithClick
            getValue={() =>
              row.original["transfer.txhash"].toUpperCase() || "N/A"
            }
            table={table}
            onClick={() => {
              const txHash = row.original["transfer.txhash"];
              if (txHash) {
                window.open(`${tronScan_Transaction}${txHash}`, "_blank");
              }
            }}
          />
          {/* <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
          {/* <p>{gasFee || "N/A"}</p> */}
        </div>
      );
    },
  },
];

export function ActivitiesTable() {
  const { dashboardDepositInfo, dashboardDeposit, dashboardDepositCount } =
    useAppDataContext();
  const [depositList, setDepositList] = useState([]);

  const [searchParams] = useSearchParams();
  const pageIndex = searchParams.get("page") || 1;

  const paginationData = {
    fetchData: dashboardDepositInfo,
    count: dashboardDepositCount,
    pageIndex,
    name: "",
  };

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const theadRef = useRef();
  const { height: theadHeight } = useBoxSize({ ref: theadRef });

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: depositList,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    meta: {
      deleteRow: (row) => {
        skipAutoResetPageIndex();
        setDepositList((old) =>
          old.filter((oldRow) => oldRow.id !== row.original.id),
        );
      },
      deleteRows: (rows) => {
        skipAutoResetPageIndex();
        const rowIds = rows.map((row) => row.original.id);
        setDepositList((old) => old.filter((row) => !rowIds.includes(row.id)));
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
    autoResetPageIndex,
  });

  useDidUpdate(() => table.resetRowSelection(), [depositList]);

  useEffect(() => {
    dashboardDepositInfo({ offSet: 0, limit: 100 });
  }, []);

  useEffect(() => {
    if (dashboardDeposit && dashboardDeposit?.length > 0) {
      // Transform data keys to lowercase if needed
      const transformedData = dashboardDeposit.map((item) => ({
        ...item,
        createdat: item.createdat || item.CREATEDAT,
        site: {
          siteurl: item.site?.siteurl || item.SITE?.SITEURL,
        },
        user: {
          externaluserid:
            item.user?.externaluserid || item.USER?.EXTERNALUSERID,
        },
        transfer: {
          amount: item.transfer?.amount || item.TRANSFER?.AMOUNT,
          currency: item.transfer?.currency || item.TRANSFER?.CURRENCY,
          from: item.transfer?.from || item.TRANSFER?.FROM,
          txhash: item.transfer?.txhash || item.TRANSFER?.TXHASH,
        },
      }));
      setDepositList(transformedData);
    }
  }, [dashboardDeposit]);

  return (
    <div>
      <div className="table-toolbar flex items-center justify-between">
        <h2 className="truncate text-base font-medium tracking-wide text-gray-800 dark:text-dark-100">
          입금
        </h2>
        <div className="flex">
          <CollapsibleSearch
            placeholder="여기에서 검색하세요..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          {/* <MenuAction /> */}
        </div>
      </div>
      <Card className="relative mt-3">
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
        {table.getCoreRowModel().rows?.length > 0 && (
          <div className="p-4 sm:px-5">
            <PaginationSection table={table} paginationData={paginationData} />
          </div>
        )}
        <SelectedRowsActions table={table} height={theadHeight} />
      </Card>
    </div>
  );
}
