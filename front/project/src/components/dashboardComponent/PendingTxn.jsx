import React from "react";
import { TableHeaders } from "../TableHeaders";

export function PendingTransaction ({pendingData}){
    console.log(pendingData);

    return (
        <div className="text-xl z-10">
            <h1>Pending Transactions</h1>
            <div className="grid grid-cols-5 gap-4">
                <TableHeaders header="Date" />
                <TableHeaders header="Txn ID" />
                <TableHeaders header="Amount" />
                <TableHeaders header="Txn Type" />
                <TableHeaders header="Withdrawal Address" /> 
            </div> 
            <div>
               {!pendingData || pendingData.length === 0 ? 
                <div>No pending transactions.</div>

                    : 

                    pendingData.map((data, index) => {
                        return (
                        <div key={index}>
                                <div>{data.date} </div>
                                <div>{data.pending_id} </div>
                                <div>{data.amount} </div>
                                <div>{data.txn_type} </div>
                                <div> {data.withdrawalAddress ?  data.withdrawalAddress : "NULL" } </div>

                         </div>)
                     })
                    }
            </div>     
     </div>
)}
