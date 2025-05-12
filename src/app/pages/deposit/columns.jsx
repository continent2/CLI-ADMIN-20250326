// Import Dependencies
// import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { CopyableCellWithClick } from "components/shared/table/CopyableCell";
import { DateCell } from "./rows";
import {
  tronScan_Transaction,
  tronScan_Address,
} from "../../../constants/app.constant.js";
import { formatNumberWithCommas } from "utils/formatNumberWithCommas";
//
// import { HighlightableCell } from "components/shared/table/HighlightableCell";
// // ----------------------------------------------------------------------
//
// const columnHelper = createColumnHelper();

export const columns = [
  {
    id: "생성시간",
    accessorKey: "transfer.timestamp",
    header: "생성시간 입금 시간", //creation time
    // cell: (info) => {
    //   const timestamp = info.row.original?.["createdat"];
    //   return timestamp ? new Date(timestamp).toLocaleString() : "-";
    // },
    cell: DateCell,
    filterFn: "inNumberRange",
  },
  {
    id: "아이디",
    accessorKey: "id",
    header: "아이디", //id
  },
  {
    id: "회원아이디",
    accessorKey: "user.externaluserid", // Keep the accessor for sorting/filtering
    header: () => (
      <div>
        사용자 이름
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
        외부 사용자 ID
      </div>
    ),
    cell: ({ row }) => {
      const userName = row.original["user.username"];
      const externalUserId = row.original["user.externaluserid"];

      return (
        <div>
          <a
            href={userName || "#"} // Corrected link to use userName
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 no-underline dark:text-gray-500" // Add style if needed
          >
            {userName.replace(/^https?:\/\//, "") || "N/A"}{" "}
            {/* Display site URL or "-" if not available */}
          </a>
          <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
          <p>{externalUserId || "N/A"}</p>{" "}
          {/* Display SiteList ID or "N/A" if not available */}
        </div>
      );
    },
  },
  {
    id: "사이트 URL",
    accessorKey: "site.siteurl", // Keep the accessor for sorting/filtering
    header: () => (
      <div>
        사이트URL
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
        사이트 ID
      </div>
    ),
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
    accessorKey: "amount", // Keep the accessor for sorting/filtering
    header: () => (
      <div>
        거래금액{/* Transaction amount */}
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
        {/* 거래화폐 Transaction currency */}
        환산금액
      </div>
    ),
    cell: ({ row }) => {
      // const amount = row.original["amount"]; // Get transfer amount
      const amount = row.original["transfer.amount"];
      //      const currency = row.original["currency"]; // Get transfer currency
      const currency = row.original["transfer.currency"];
      //      const convrate = row.original["convrate"]; // Get transfer currency
      const convrate = row.original["transfer.convamount"]; // Get transfer currency
      return (
        <div>
          <p>
            {formatNumberWithCommas(Number(amount)?.toFixed(0)) || "N/A"}{" "}
            {currency || "N/A"}
          </p>
          <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
          <p>
            ₩{" "}
            {convrate === null || convrate === undefined
              ? "N/A"
              : formatNumberWithCommas(Number(convrate || 0)?.toFixed(0)) ||
              "N/A"}
          </p>
        </div>
      );
    },
  },
  {
    id: "txHash",
    accessorKey: "transfer.txhash", // Keep the accessor for sorting/filtering
    header: () => (
      <div>
        전송ID
        {/* <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
        {/* Gasfee */}
      </div>
    ),
    cell: ({ row, table }) => {
      // const gasFee = row.original["transfer.gasfee"]; // Get Gasfee

      return (
        <div>
          <CopyableCellWithClick
            getValue={() =>
              row.original["transfer.txhash"]?.toUpperCase() || "N/A"
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
  {
    id: "보낸 주소",
    accessorKey: "transfer.from",
    header: "보낸 주소", //Sent address
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
    },
  },
  {
    id: "받는 주소",
    accessorKey: "transfer.to",
    header: "받은 주소", //Receving address
    cell: ({ row, table }) => {
      const receivingAddress = row.original["transfer.to"];
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
  // {
  //     accessorKey: "transfer.memo",
  //     header: "트랜잭션 메모", //transaction memo
  //     cell: (info) => info.row.original["transfer.memo"] || "N/A",
  // },

  // {
  //     accessorKey: "feeratebp",
  //     header: "fee rate bp",
  // },
  // {
  //   id: "전환률 ",
  //   accessorKey: "convrate", // Use accessor for sorting/filtering
  //   header: () => (
  //     <div>
  //       전환률 {/* Conversion Rate */}
  //       <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
  //       사이트 전환률 {/* SiteList Conversion Rate */}
  //       <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
  //       에이전시 전환률 {/* Agency Conversion Rate */}
  //     </div>
  //   ),
  //   cell: ({ row }) => {
  //     const convrate = row.original["convrate"]; // Conversion rate
  //     const siteConvrate = row.original["site.convrate"]; // SiteList conversion rate
  //     const agencyConvrate = row.original["agency.convrate"]; // Agency conversion rate
  //
  //     return (
  //       <div>
  //         <p>{convrate || "N/A"}</p> {/* Conversion rate */}
  //         <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
  //         <p>{siteConvrate || "N/A"}</p> {/* SiteList conversion rate */}
  //         <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
  //         <p>{agencyConvrate || "N/A"}</p> {/* Agency conversion rate */}
  //       </div>
  //     );
  //   },
  // },
  // {
  //     accessorKey: "user.name", // Use accessor for sorting/filtering
  //     header: () => (
  //         <div>
  //             사용자명 {/* Username */}
  //             <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //             ID
  //         </div>
  //     ),
  //     cell: ({row}) => {
  //         const userName = row.original["user.name"]; // User name
  //         const userId = row.original["user.id"]; // User ID
  //
  //         return (
  //             <div>
  //                 <p>{userName || "N/A"}</p> {/* Display user name */}
  //                 <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //                 <p>{userId || "N/A"}</p> {/* Display user ID */}
  //             </div>
  //         );
  //     },
  // },
  // {
  //     accessorKey: "agency.name", // Use accessor for sorting/filtering
  //     header: () => (
  //         <div>
  //             에이전시 이름 {/* Agency Name */}
  //             <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //             코드 {/* Code */}
  //             <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //             ID
  //         </div>
  //     ),
  //     cell: ({row}) => {
  //         const agencyName = row.original["agency.name"]; // Agency name
  //         const agencyCode = row.original["agency.code"]; // Agency code
  //         const agencyId = row.original["agency.id"]; // Agency ID
  //
  //         return (
  //             <div>
  //                 <p>{agencyName || "N/A"}</p> {/* Display Agency Name */}
  //                 <p>{agencyCode || "N/A"}</p> {/* Display Agency Code */}
  //                 <p>{agencyId || "N/A"}</p> {/* Display Agency ID */}
  //             </div>
  //         );
  //     },
  // },
  // {
  //     accessorKey: "transfer.account.countuse", // Use accessor for sorting/filtering
  //     header: () => (
  //         <div>
  //             거래계좌사용횟수 {/* Number of times trading account is used */}
  //             <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //             잔여 토큰 {/* Residual token */}
  //             <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //             잔여 코인 {/* Remaining coins */}
  //         </div>
  //     ),
  //     cell: ({row}) => {
  //         const countUse = row.original["transfer.account.countuse"]; // Number of times trading account is used
  //         const balanceToken = row.original["transfer.account.balancetoken"]; // Residual token
  //         const balanceCoin = row.original["transfer.account.balancecoin"]; // Remaining coins
  //
  //         return (
  //             <div>
  //                 <p>{countUse || "N/A"}</p> {/* Display Number of times trading account is used */}
  //                 <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //                 <p>{balanceToken || "N/A"}</p> {/* Display Residual token */}
  //                 <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //                 <p>{balanceCoin || "N/A"}</p> {/* Display Remaining coins */}
  //             </div>
  //         );
  //     },
  // },
  // {
  //     accessorKey: "account.address", // Use accessor for sorting/filtering
  //     header: () => (
  //         <div>
  //             계좌주소 {/* Account address */}
  //             <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //             사용횟수 {/* Number of uses */}
  //             <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //             ID {/* Account ID */}
  //         </div>
  //     ),
  //     cell: ({row}) => {
  //         const address = row.original["account.address"]; // Account address
  //         const countUse = row.original["account.countuse"]; // Number of uses
  //         const accountId = row.original["account.id"]; // Account ID
  //
  //         return (
  //             <div>
  //                 <p>{address || "N/A"}</p> {/* Display Account address */}
  //                 <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //                 <p>{countUse || "N/A"}</p> {/* Display Number of uses */}
  //                 <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
  //                 <p>{accountId || "N/A"}</p> {/* Display Account ID */}
  //             </div>
  //         );
  //     },
  // },
  {
    //    id: "상태", //
    id: "사용자 상태",
    accessorKey: "user.status", // Use accessor for sorting/filtering
    header: () => (
      <div>
        상태
        {/* User status */}
        {/* <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/> */}
        {/* 경고 */} {/* Warning */}
        {/* <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/> */}
        {/* 불만접수회수 */} {/* Number of complaints received */}
      </div>
    ),
    cell: ({ row }) => {
      //      const status = row.original["user.status"]; // User status
      const status = row.original["status"]; // User status
      const statusMapping = {
        0: "대기", // Normal
        1: "완료", // Stop
        2: "실패", // Caution
        3: "이상", // Issue
        //         1: "처리대기",
        // //        1: "입금처리대기",
        //         0: "출금가능",
        //         "-1": "출금완료",
      };
      // const isRed = row.original["user.isred"]; // Warning flag
      // const complaintCount = row.original["user.countcomplaint"]; // Number of complaints

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
