// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import {
    SelectCell,
    SelectHeader,
} from "components/shared/table/SelectCheckbox";
import { RowActions } from "./RowActions";
import {
    // AccountNameCell,
    ActivityCell,
    AmountCell,
    TransactionDateCell,
    SiteNameCell
} from "./rows";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
    columnHelper.display({
        id: "select",
        header: SelectHeader,
        cell: SelectCell,
    }),
    columnHelper.accessor((row) => row.activity_name, {
        id: "depositor",
        header: "Depositor Name",
        cell: ActivityCell,
    }),
    columnHelper.accessor((row) => row.amount, {
        id: "amount",
        header: "Amount",
        cell: AmountCell,
    }),
    columnHelper.accessor((row) => row.site_name, {
        id: "site",
        header: "Site Name",
        cell: SiteNameCell,
    }),
    columnHelper.accessor((row) => row.transaction_date, {
        id: "deposit_date",
        header: "Deposit Date",
        cell: TransactionDateCell,
    }),
    columnHelper.display({
        id: "actions",
        header: "View Details",
        cell: RowActions,
    }),
];
