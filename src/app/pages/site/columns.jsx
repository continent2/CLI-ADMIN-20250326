// Import Dependencies
// import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
// import {DateCell} from "./rows";
// import { HighlightableCell } from "components/shared/table/HighlightableCell";
import {CreateUpdateCell, SiteIdURL,AccountCell,Stat1,Stat2} from "../site/rows.jsx";

// ----------------------------------------------------------------------

// const columnHelper = createColumnHelper();

export const columns = [
  {
    id:"date",
    accessorKey: "info.createdat", // Keep the accessor for sorting/filtering
    header: "등록일", //Registration date
    cell:CreateUpdateCell
  },
    {
        id: "siteURLMember",
        accessorKey: "info.siteurl", // Keep the accessor for sorting/filtering
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
        accessorKey: "account.id", // Keep the accessor for sorting/filtering
        header: "벌집계정주소",
        cell:AccountCell
    },
    {
        accessorKey: "stat.count_cumul", // Use accessor for sorting/filtering
        header: "입금한사용자수", //Number of users who deposited money
        cell: Stat1
    },
    {
        accessorKey: "stat.sum_1d", // Use accessor for sorting/filtering
        header: "비활성입금계정 개수", //Number of inactive deposit accounts
        cell: Stat2
    },
    {
        accessorKey: "info.status", // Keep the accessor for sorting/filtering
        header: "상태", //Situation
    },
];
