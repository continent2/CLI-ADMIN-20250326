// Import Dependencies
// import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
// import {DateCell} from "./rows";
// import { HighlightableCell } from "components/shared/table/HighlightableCell";
import { CreateUpdateCell, SiteIdURL, AccountCell, Stat1, Stat2 } from "../site/rows.jsx";

// ----------------------------------------------------------------------

// const columnHelper = createColumnHelper();

export const columns = [
    {
        id: "등록일",
        accessorKey: "info.createdat", // Keep the accessor for sorting/filtering
        header: "등록일 ", //Registration date
        cell: CreateUpdateCell
    },
    {
        id: "사이트",
        accessorKey: "info.siteurl", // Keep the accessor for sorting/filtering
        header: () => (
            <div>
                사이트URL
                <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
                사이트 ID
            </div>
        ),
        cell: SiteIdURL
    },
    {
        id: "벌집계정주소",
        accessorKey: "info.account.address",
        //        accessorKey: "account.id", // Keep the accessor for sorting/filtering
        header: "벌집계정주소",
        cell: AccountCell
    },
    {
        id: "입금한사용자수",
        accessorKey: "stat.count_cumul", // Use accessor for sorting/filtering
        header: "입금한사용자수", //Number of users who deposited money
        cell: Stat1
    },
    {
        id: "비활성입금계정 개수",
        accessorKey: "stat.sum_1d", // Use accessor for sorting/filtering
        header: "비활성입금계정 개수", //Number of inactive deposit accounts
        cell: Stat2
    },
    {
        id: "상태",
        accessorKey: "info.status", // Keep the accessor for sorting/filtering
        header: "상태", //Situation

        cell: ({ row }) => { // console.log("row", row);
            //            const status = row.original[ "info.status" ]; // User status
            const status = row?.original?.info?.status;
            const statusMapping = {
                0: '대기',
                1: '정상',
                2: '정지',
                3: '주의',
                4: '이슈',
                //              5 : '정지해제',
            };
            return (
                <div>
                    <p>{statusMapping[status] || "N/A"}</p> {/* Display User status */}
                </div>
            );
        },

    },
];
