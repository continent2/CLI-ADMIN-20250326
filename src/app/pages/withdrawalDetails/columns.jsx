// Import Dependencies

// Local Imports
import {
    CreateUpdateCell,
    AmountCurrency,
    SendAccount,
    ReceivedAccount,
    BankDetail
} from "../withdrawalDetails/rows.jsx";


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
        id:"수량 ,단위",
        accessorKey: "info.siteurl", // Keep the accessor for sorting/filtering
        header: () => (
            <div>
                수량 ,단위
                <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
                환산금액
            </div>
        ),
        cell: AmountCurrency
    },
    {
        id:"TXHASH 발생수수료",
        accessorKey: "transfer.txhash", // Keep the accessor for sorting/filtering
        header: "TXHASH 발생수수료",
        cell: ({row}) => {
            const txHash = row.original["transfer.txhash"]; // Get txHash
            return (
                <div>
                    <p>{txHash || "N/A"}</p>
                </div>
            );
        },
    },
    {
        id:"보낸주소",
        accessorKey: "transfer.from", // Keep the accessor for sorting/filtering
        header: "보낸주소", //Sent address
        cell: ({row}) => {
            const transfer = row.original["transfer.from"]; // Get txHash
            return (
                <div>
                    <p>{transfer || "N/A"}</p>
                </div>
            );
        },
    },
    {
        id:"받은주소",
        accessorKey: "transfer.to", // Keep the accessor for sorting/filtering
        header: "받은주소", //Received address
        cell: ({row}) => {
            const transfer = row.original["transfer.to"]; // Get txHash
            return (
                <div>
                    <p>{transfer || "N/A"}</p>
                </div>
            );
        },
    },
    {
        id:"보낸계정",
        accessorKey: "agency.name", // Keep the accessor for sorting/filtering
        header: "보낸계정", //Sent account
        cell: SendAccount
    },
    {
        id:"받은계정",
        accessorKey: "site.id", // Keep the accessor for sorting/filtering
        header: "받은계정", //Received account
        cell: ReceivedAccount
    },
    {
        id:"자동 신청",
        accessorKey: "bankname", // Keep the accessor for sorting/filtering
        header: () => (
            <div>
                자동 {/* Automatic*/}
                <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
                신청 {/*Application*/}
            </div>
        ),
        cell: BankDetail
    },
    {
        id:"상태",
        accessorKey: "status", // Keep the accessor for sorting/filtering
        header: "상태", //Situation
    },
];

