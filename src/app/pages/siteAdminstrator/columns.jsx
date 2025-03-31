// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { CopyableCell } from "components/shared/table/CopyableCell";
import {NameCell, SiteCell,DateCell} from "./rows";
import { HighlightableCell } from "components/shared/table/HighlightableCell";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor((row) => row.date, {
    id: "date",
    header: "date",
    label: "Date",
    cell: DateCell,
    filterFn: "inNumberRange",
  }),
    columnHelper.accessor((row) => row.name, {
    id: "name",
    header: "name",
    label: "Name",
    cell: NameCell,
  }),
  columnHelper.accessor((row) => row.memberId, {
    id: "memberId",
    header: "member Id",
    label: "MemberId",
    cell: HighlightableCell,
  }),
  columnHelper.accessor((row) => row.site, {
    id: "site",
    header: "site",
    label: "Site",
    cell: SiteCell,
    filterFn: "equalsString",
  }),
  columnHelper.accessor((row) => row.TXHASH, {
    id: "txhash",
    header: "txhash",
    label: "TXHASH",
    cell: (props) => <CopyableCell {...props} highlight />,
  }),
  columnHelper.accessor((row) => row.from, {
    id: "from",
    header: "from",
    label: "From",
  }),
  columnHelper.accessor((row) => row.to, {
    id: "to",
    header: "to",
    label: "To",
  }),
  columnHelper.accessor((row) => row.situation, {
    id: "situation",
    header: "situation",
    label: "Situation",
  }),
];
