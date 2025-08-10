import React from "react";
import { TableHeaders } from "../TableHeaders";

export function PendingTransaction ({pendingData}){
    const date = new Date();
    console.log(pendingData);
    const currentDate = date.toLocaleDateString();
    const currentTime = date.toLocaleTimeString();

    return (
        
        <div>
            <h1>Pending Transactions</h1>
            <div className="grid grid-cols-5 gap-4">
                <TableHeaders header="Date" />
                <TableHeaders header="Time" />
                <TableHeaders header="Status" />
                <TableHeaders header="Amount" />
                <TableHeaders header="Withdrawal Address" />
            </div>
            <div>
               {  pendingData && Array.isArray(pendingData) && pendingData.length === 0 ? 
                <div>No pending transactions.</div>
                    : 
                    pendingData.map((data, index) => {
                        return (
                        <div key={index}>
                                <div>{currentDate} </div>
                                <div>{currentTime} </div>
                                <div>{data.status} </div>
                                <div>{data.amount} </div>
                                {data.withdrawalAddress && <div>Withdrawal Address: {data.withdrawalAddress}</div>}

                         </div>)
                     })
                    }
            </div>     
     </div>
)}
