// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { CopyableCell } from "components/shared/table/CopyableCell";
import {SiteCell,DateCell} from "./rows";
import { HighlightableCell } from "components/shared/table/HighlightableCell";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor((row) => row.date, {
    id: "date",
    header: "Start date of use Last activity date",
    label: "Date",
    cell: DateCell,
    filterFn: "inNumberRange",
  }),
  columnHelper.accessor((row) => row.memberId, {
    id: "memberId",
    header: "member Id",
    label: "MemberId",
    cell: HighlightableCell,
  }),
  columnHelper.accessor((row) => row.site, {
    id: "site",
    header: "site url/ Site id",
    label: "Site",
    cell: SiteCell,
    filterFn: "equalsString",
  }),
  columnHelper.accessor((row) => row.previousDayDeposit, {
    id: "previousDayDeposit",
    header: "previous day deposit amount(collect) Conversion amount",
    label: "Previous day deposit amount",
    cell: (props) => <CopyableCell {...props} highlight />,
  }),
  columnHelper.accessor((row) => row.todayDepositAmount, {
    id: "todayDepositAmount",
    header: "today's deposit amount(collect) Conversion amount",
    label: "Today's deposit amount(collect)",
  }),
  columnHelper.accessor((row) => row.recentDepositsQuantity, {
    id: "recentDepositsQuantity",
    header: "recent deposits Quantity, Unit(Conversion amount)",
    label: "Recent deposits Quantity",
  }),
  columnHelper.accessor((row) => row.depositsProcessingstatus, {
    id: "depositsProcessingstatus",
    header: "recent deposits Processing status",
    label: "Recent deposits Processing status",
  }),
  columnHelper.accessor((row) => row.situation, {
    id: "situation",
    header: "situation",
    label: "Situation",
  }),
];
