// Import Dependencies
//import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
// import {
//     SelectCell,
//     SelectHeader,
// } from "components/shared/table/SelectCheckbox";
// import { RowActions } from "./RowActions";
// import {
//     AccountNameCell,
//     ActivityCell,
//     AmountCell,
//     TransactionDateCell,
// } from "./rows";
//import {CreateUpdateCell, SiteIdURL, Stat1, Stat2} from "../../../member/rows.jsx";

// ----------------------------------------------------------------------

// const columnHelper = createColumnHelper();

export const columns = [
    // {
    //     id:"사용시작일",
    //     accessorKey: "info.createdat", // Keep the accessor for sorting/filtering
    //     header: () => (
    //         <div>
    //             사용시작일
    //             <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
    //             최근활동일
    //         </div>
    //     ),
    //     cell:CreateUpdateCell
    // },
    {
        id: "입금자명",
        accessorKey: "agency.name", // Keep the accessor for sorting/filtering
        header: "입금자명", //depositor name
        cell: ({row}) => {
            const name = row.original["agency.name"]; // User status
            return (
                    <p>{name || "N/A"}</p>
            );
        },
    },
    {
        id: "사이트명",
        accessorKey: "agency.name", // Keep the accessor for sorting/filtering
        header: "사이트명", //depositor name
        cell: ({row}) => {
            const name = row.original["site.name"]; // User status
            return (
                <p>{name || "N/A"}</p>
            );
        },
    }
]
