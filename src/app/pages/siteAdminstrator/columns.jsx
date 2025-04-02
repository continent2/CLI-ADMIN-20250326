// Import Dependencies
// import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
// import { CopyableCell } from "components/shared/table/CopyableCell";
// import {NameCell, SiteCell,DateCell} from "./rows";
// import { HighlightableCell } from "components/shared/table/HighlightableCell";
import {CreateUpdateCell, userDetail} from "../siteAdminstrator/rows.jsx";

// ----------------------------------------------------------------------

// const columnHelper = createColumnHelper();

export const columns = [
        {
            id: "date",
            accessorKey: "createdat", // Keep the accessor for sorting/filtering
            header: "등록일", //Registration date
            cell: CreateUpdateCell
        },
        {
            accessorKey: "username", // Keep the accessor for sorting/filtering
            header: "사용자명", //username
            cell: userDetail
        },
        {
            accessorKey: "socialid", // Keep the accessor for sorting/filtering
            header: "주요 관리사이트", //Main management site
            cell: ({row}) => {
                const socialId = row.original["socialid"]; // Get txHash
                return (
                    <a
                        key={socialId}
                        href={socialId || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{textDecoration: "none", color: "blue"}}
                    >
                        {socialId || "N/A"}
                    </a>
                );
            },
        },
        {
            accessorKey: "socialgroupid", // Keep the accessor for sorting/filtering
            header: "연락처", //contact
            cell: ({row}) => {
                const socialGroupId = row.original["socialgroupid"]; // Get txHash
                return (
                    <a
                        key={socialGroupId}
                        href={socialGroupId || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{textDecoration: "none", color: "blue"}}
                    >
                        {socialGroupId || "N/A"}
                    </a>
                );
            },
        },
        {
            accessorKey: "level", // Keep the accessor for sorting/filtering
            header: "소셜아이디", //socialId
        },
        {
            accessorKey: "agencyid", // Keep the accessor for sorting/filtering
            header: "대행사 ID", //agencyId
        },
        {
            accessorKey: "siteid", // Keep the accessor for sorting/filtering
            header: "사이트 ", //site Id
        }
    ]
;

