// Import Dependencies

// Local Imports
import {
    CreateUpdateCell,
    AmountCurrency,
    SendAccount,
    ReceivedAccount,
    BankDetail
} from ".//rows.jsx";
import {tronScan_Transaction,tronScan_Address} from "../../../constants/app.constant.js";
import {CopyableCellWithClick} from "components/shared/table/CopyableCell";


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
        accessorKey: "amount", // Keep the accessor for sorting/filtering
        header: () => (
            <div>
                수량,단위
                <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
                환산금액
            </div>
        ),
        cell: AmountCurrency
    },
    {
        id:"TXHASH 발생수수료",
        accessorKey: "transfer.txhash", // Keep the accessor for sorting/filtering
        header: "전송ID", // 발생수수료 
        cell: ({ row, table }) => {
            const txHash = row.original["transfer.txhash"].toUpperCase();
            return (
                <CopyableCellWithClick
                    getValue={() => txHash || "N/A"}
                    table={table}
                    onClick={() => {
                        if (txHash) {
                            window.open(`${tronScan_Transaction}${txHash}`, "_blank");
                        }
                    }}
                />
            );
        },
    },
    {
        id:"보낸주소",
        accessorKey: "transfer.from", // Keep the accessor for sorting/filtering
        header: "보낸주소", //Sent address
        cell: ({ row, table }) => {
            const fromAddress = row.original["transfer.from"];
            return (
                <CopyableCellWithClick
                    getValue={() => fromAddress || "N/A"}
                    table={table}
                    onClick={() => {
                        if (fromAddress) {
                            window.open(`${tronScan_Address}${fromAddress}`, "_blank");
                        }
                    }}
                />
            );
        },
    },
    {
        id:"받은주소",
        accessorKey: "transfer.to", // Keep the accessor for sorting/filtering
        header: "받은주소", //Received address
        cell: ({ row, table }) => {
            const toAddress = row.original["transfer.to"];
            return (
                <CopyableCellWithClick
                    getValue={() => toAddress || "N/A"}
                    table={table}
                    onClick={() => {
                        if (toAddress) {
                            window.open(`${tronScan_Address}${toAddress}`, "_blank");
                        }
                    }}
                />
            );
        },
    },
    // {
    //     id:"보낸계정",
    //     accessorKey: "bankname", //agency.name Keep the accessor for sorting/filtering
    //     header: "에이전시", //Sent account보낸계정
    //     cell: SendAccount
    // },
    // {
    //     id:"받은계정",
    //     accessorKey: "bankaccount", //site.id Keep the accessor for sorting/filtering
    //     header: "사이트", //Received account 받은계정
    //     cell: ReceivedAccount
    // },
    // {
    //     id:"자동 신청",
    //     accessorKey: "bankname", // Keep the accessor for sorting/filtering
    //     header: () => (
    //         <div>
    //             자동 {/* Automatic*/}
    //             <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
    //             신청 {/*Application*/}
    //         </div>
    //     ),
    //     cell: BankDetail
    // },
    {
        id:"상태",
        accessorKey: "status", // Keep the accessor for sorting/filtering
        header: "상태", //Situation

        cell: ({ row }) => { // console.log("row", row);
            const status = row.original["status"]; // User status
            const statusMapping = {
                0 : '대기' ,
              1 : '완료',
              2 : '실패',
              3 : '이상',
//              4 : '이슈',
              // 1: "입금처리대기",
              // 0: "출금가능",
              // "-1": "출금완료",
            };
            // const isRed = row.original["user.isred"]; // Warning flag
            // const complaintCount = row.original["user.countcomplaint"]; // Number of complaints
//            console.log("status", status);
            return (
              <div>
                <p>{statusMapping[status] || "N/A"}</p> {/* Display User status */}
                {/* <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
                {/* <p>{isRed || "N/A"}</p> {/* Display warning status */}
                {/* <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
                {/* <p>{complaintCount || "N/A"}</p> {/* Display Number of complaints */}{" "}
              </div>
            );
          },
              
    },
];

