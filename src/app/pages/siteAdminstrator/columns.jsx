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
            id: "등록일",
            accessorKey: "createdat", // Keep the accessor for sorting/filtering
            header: "등록일", //Registration date
            cell: CreateUpdateCell
        },
        {
            is:"사용자명",
            accessorKey: "username", // Keep the accessor for sorting/filtering
            header: "사용자명", //username
            cell: userDetail
        },
        {
            id:"주요 관리사이트",
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
                        className="dark:text-gray-500 text-blue-500 no-underline"
                    >
                        {socialId || "N/A"}
                    </a>
                );
            },
        },
        {
            id:"연락처",
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
                        className="dark:text-gray-500 text-blue-500 no-underline"
                    >
                        {socialGroupId || "N/A"}
                    </a>
                );
            },
        },
        {
            id:"소셜아이디",
            accessorKey: "level", // Keep the accessor for sorting/filtering
            header: "소셜아이디", //socialId
        },
        {
            id:"대행사 ID",
            accessorKey: "agencyid", // Keep the accessor for sorting/filtering
            header: "대행사 ID", //agencyId
        },
        {
            id:"사이트",
            accessorKey: "siteid", // Keep the accessor for sorting/filtering
            header: "사이트 ", //site Id
        }
    ]
;

