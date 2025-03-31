// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import {DateCell} from "./rows";
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
    columnHelper.accessor((row) => row.site, {
    id: "site",
    header: "site",
    label: "Site",
  }),
  columnHelper.accessor((row) => row.multipleAccountAddress, {
    id: "multipleAccountAddress",
    header: "multiple Account  Address",
    label: "Multiple Account Address",
    cell: HighlightableCell,
  }),
  columnHelper.accessor((row) => row.numberOfUsersWhoDeposited, {
    id: "numberOfUsersWhoDeposited",
    header: "number Of Users Who Deposited",
    label: "Number Of Users Who Deposited",
  }),
  columnHelper.accessor((row) => row.numberOfActiveDepositAccounts, {
    id: "numberOfActiveDepositAccounts",
    header: "number Of Active Deposit Accounts",
    label: "NumberOfActiveDepositAccounts",
  }),
  columnHelper.accessor((row) => row.numberOfInactiveDepositAccounts, {
    id: "numberOfInactiveDepositAccounts",
    header: "number Of Inactive Deposit Accounts",
    label: "Number Of Inactive Deposit Accounts",
  }),
  columnHelper.accessor((row) => row.basicWithdrawalCurrencyTypes, {
    id: "basicWithdrawalCurrencyTypes",
    header: "basic Withdrawal Currency Types",
    label: "Basic Withdrawal Currency Types",
  }),
  columnHelper.accessor((row) => row.depositAmountCumulativeDepositAmount, {
    id: "depositAmountCumulativeDepositAmount",
    header: "deposit Amount Cumulative Deposit Amount",
    label: "Deposit Amount Cumulative Deposit Amount",
  }),
  columnHelper.accessor((row) => row.situation, {
    id: "situation",
    header: "situation",
    label: "Situation",
  }),
];
