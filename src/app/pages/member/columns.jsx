// Import Dependencies
// import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
// import { CopyableCell } from "components/shared/table/CopyableCell";
// import {SiteCell,DateCell} from "./rows";
// import { HighlightableCell } from "components/shared/table/HighlightableCell";
// ----------------------------------------------------------------------

// const columnHelper = createColumnHelper();

import { CreateUpdateCell, SiteIdURL, Stat1, Stat2 } from "./rows.jsx";

export const columns = [
  {
    id: "사용시작일",
    accessorKey: "info.createdat", // Keep the accessor for sorting/filtering
    header: () => (
      <div>
        사용시작일
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
        최근활동일
      </div>
    ),
    cell: CreateUpdateCell,
  },
  {
    id: "회원아이디",
    accessorKey: "info.externaluserid", // Keep the accessor for sorting/filtering
//    accessorKey: "info.id", // Keep the accessor for sorting/filtering
    header: "회원ID",
  },
  {
    id: "사이트",
    accessorKey: "info.site.siteurl", // Keep the accessor for sorting/filtering
    header: () => (
      <div>
        사이트URL
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
        사이트 ID
      </div>
    ),
    cell: SiteIdURL,
  },
  {
    id: "전일입금액",
    accessorKey: "stat.sum_2d" , //  transfer.account.countuse", // Use accessor for sorting/filtering
    header: () => (
      <div>
        전일입금액{/* Previous deposit amount */} (회수) {/* (recovery) */}
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
        환산금액 {/* Conversion amount */}
      </div>
    ),
    cell: Stat2,
  },
  {
    id: "금일입금액",
    accessorKey: "stat.sum_1d", // Use accessor for sorting/filtering
    header: () => (
      <div>
        금일입금액{/* Today's deposit amount */} (회수) {/* (Recovery) */}
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
        환산금액 {/* Conversion amount */}
      </div>
    ),
    cell: Stat1,
  },
  {
    id: "상태",
    accessorKey: "info.status", // Keep the accessor for sorting/filtering
    header: "상태", //Situation
    cell: ({ row }) => { // console.log("row", row);
//      const status = row.original["info.status"]; // User status
      const status = row.original?.info?.status;
//      const status = row["info.status"]; // User status
//      const status = row.original["status"]; 
      const statusMapping = {
        1 : '정상',
        2 : '정지',
        3 : '주의',
        4 : '이슈',
        // 1: "입금처리대기",
        // 0: "출금가능",
        // "-1": "출금완료",
      };
      // const isRed = row.original["user.isred"]; // Warning flag
      // const complaintCount = row.original["user.countcomplaint"]; // Number of complaints
//      console.log("status", status);
      return (
        <div>
          <p>{statusMapping[status] || "N/A"}</p> {/* Display User status */}
          {/* <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
          {/* <p>{isRed || "N/A"}</p> {/* Display warning status */}
          {/* <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
          {/* <p>{complaintCount || "N/A"}</p> {/* Display Number of complaints */}{" "}
        </div>
      );
    },
  },
];
