// Import Dependencies
// import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
// import { CopyableCell } from "components/shared/table/CopyableCell";
// import {SiteCell,DateCell} from "./rows";
// import { HighlightableCell } from "components/shared/table/HighlightableCell";
// ----------------------------------------------------------------------

// const columnHelper = createColumnHelper();


import {CreateUpdateCell, SiteIdURL,Stat1,Stat2} from "./rows.jsx";

export const columns = [
  {
      id:"infoDate",
    accessorKey: "info.createdat", // Keep the accessor for sorting/filtering
    header: () => (
        <div>
          사용시작일
          <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
          최근활동일
        </div>
    ),
      cell:CreateUpdateCell
  },
    {
        accessorKey: "info.id", // Keep the accessor for sorting/filtering
        header: "회원아이디",
    },
    {
        id: "siteURLMember",
        accessorKey: "info.site.siteurl", // Keep the accessor for sorting/filtering
        header: () => (
            <div>
                사이트URL
                <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
                사이트 ID
            </div>
        ),
        cell:SiteIdURL
    },
    {
        accessorKey: "transfer.account.countuse", // Use accessor for sorting/filtering
        header: () => (
            <div>
                전일입금액{/* Previous deposit amount */}
                <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
                (회수) {/* (recovery) */}
                <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
                환산금액 {/* Conversion amount */}
            </div>
        ),
        cell: Stat2
    },
    {
        accessorKey: "stat.sum_1d", // Use accessor for sorting/filtering
        header: () => (
            <div>
                금일입금액{/* Today's deposit amount */}
                <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
                (회수) {/* (Recovery) */}
                <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
                환산금액 {/* Conversion amount */}
            </div>
        ),
        cell: Stat1
    },
    {
        accessorKey: "info.status", // Keep the accessor for sorting/filtering
        header: "상태", //Situation
    },
]
