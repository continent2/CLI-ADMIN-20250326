// Import Dependencies
// import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
// import { CopyableCell } from "components/shared/table/CopyableCell";
// import {SiteCell,DateCell} from "./rows";
// import { HighlightableCell } from "components/shared/table/HighlightableCell";
// ----------------------------------------------------------------------

// const columnHelper = createColumnHelper();

import { CopyableCellWithClick } from "components/shared/table/CopyableCell.jsx";
import { bankAccount, bankNameNative, CreateUpdateCell, refundAddress, SiteIdURL, Stat1, Stat2 } from "./rows.jsx";

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
  // {
  //   id: "회원아이디",
  //   accessorKey: "info.externaluserid", // Keep the accessor for sorting/filtering
  //   //    accessorKey: "info.id", // Keep the accessor for sorting/filtering
  //   header: "회원ID",
  // },
  {
    id: "회원아이디",
    accessorKey: "info.externaluserid", // Keep the accessor for sorting/filtering
    header: () => (
      <div>
        사용자 이름
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
        회원ID
      </div>
    ),
    cell: ({ row }) => {
      const userName = row.original.info["username"];
      const externalUserId = row.original.info["externaluserid"];

      return (
        <div>
          <a
            href={userName || "#"} // Corrected link to use userName
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 no-underline dark:text-gray-500" // Add style if needed
          >
            {userName || "N/A"} {/* Display site URL or "-" if not available */}
          </a>
          <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
          <p>{externalUserId || "N/A"}</p>{" "}
          {/* Display SiteList ID or "N/A" if not available */}
        </div>
      );
    },
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
    id: "금일입금액",
    accessorKey: "stat.sum_1d", // Use accessor for sorting/filtering
    header: () => (
      <div style={{ color: "rgb(214, 158, 54)" }}  >
        금일입금액{/* Today's deposit amount */} (회수) {/* (Recovery) */}
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
        환산금액 {/* Conversion amount */}
      </div>
    ),
    cell: Stat1,
  },
  {
    id: "전일입금액",
    accessorKey: "stat.sum_2d", //  transfer.account.countuse", // Use accessor for sorting/filtering
    header: () => (
      <div style={{ color: "rgb(214, 158, 54)" }}  >
        현재 예금{/* Previous deposit amount */}  
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
        오늘의 예금 {/* Conversion amount */}
      </div>
    ),
    cell: Stat2,
  },

  {
    id: "상태",
    accessorKey: "info.status", // Keep the accessor for sorting/filtering
    header: "상태", //Situation
    cell: ({ row }) => {
      // console.log("row", row);
      const statusstr = row.original?.info?.dispstrstatus;
      //      const status = row.original["info.status"]; // User status
      const status = row.original?.info?.status;
      //      const status = row["info.status"]; // User status
      //      const status = row.original["status"];
      const statusMapping = {
        1: "정상",
        2: "정지",
        3: "주의",
        4: "이슈",
        // 1: "입금처리대기",
        // 0: "출금가능",
        // "-1": "출금완료",
      };
      // const isRed = row.original["user.isred"]; // Warning flag
      // const complaintCount = row.original["user.countcomplaint"]; // Number of complaints
      //      console.log("status", status);
      return (
        <div>
          {statusstr != null || statusstr != undefined ?
            <p>{statusstr || "N/A"}</p>
            :
            <p>{statusMapping[status] || "N/A"}</p>
          }
          {/* Display User status */}
          {/* <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
          {/* <p>{isRed || "N/A"}</p> {/* Display warning status */}
          {/* <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
          {/* <p>{complaintCount || "N/A"}</p> {/* Display Number of complaints */}{" "}
        </div>
      );
    },
  },
  // {
  //   id: "은행명",
  //   accessorKey: "info.banknamenative", // Use accessor for sorting/filtering
  //   header: () => (
  //     <div   >
  //       은행명  {/* banknamenative */}
  //     </div>
  //   ),
  //   cell: bankNameNative,
  // },
  ,
  {
    id: "은행명",
    accessorKey: "info.bankaccount", // Use accessor for sorting/filtering
    header: () => (
      <div   >
        은행명  {/* banknamenative */}
      </div>
    ),
    cell: ({ row, table }) => {
      const bankname = row.original?.info["banknamenative"];
      let banklogo = row.original?.info["bank.urllogo"];

      if (banklogo == null) {
        banklogo = "https://static.vecteezy.com/system/resources/previews/013/948/616/non_2x/bank-icon-logo-design-vector.jpg"
      }

      return (
        <div className="flex items-center gap-[8px]" >
          {
            banklogo != null &&
            <img className="rounded-full h-[25px] w-[25px]" src={banklogo} alt="logo" />
          }
          {bankname != null ? bankname : "N/A"}
        </div>
      );
    },
  },
  {
    id: "은행계좌",
    accessorKey: "info.bankaccount", // Use accessor for sorting/filtering
    header: () => (
      <div   >
        은행계좌  {/* bankaccount */}
      </div>
    ),
    cell: bankAccount,
  },
  // {
  //   id: "환불주소",
  //   accessorKey: "info.refundaddress", // Use accessor for sorting/filtering
  //   header: () => (
  //     <div  >
  //       환불주소  {/* refundaddress */}
  //     </div>
  //   ),
  //   cell: refundAddress,
  // },
  {
    id: "환불주소",
    accessorKey: "refundaddress",
    header: () => (
      <div  >
        환불주소  {/* refundaddress */}
      </div>
    ), //Receving address
    cell: ({ row, table }) => {
      const receivingAddress = row.original?.info["refundaddress"];
      return (
        <CopyableCellWithClick
          getValue={() => receivingAddress || "N/A"}
          table={table}
          onClick={() => {
            if (receivingAddress) {
              window.open(`${tronScan_Address}${receivingAddress}`, "_blank");
            }
          }}
        />
      );
    },
  },
];
