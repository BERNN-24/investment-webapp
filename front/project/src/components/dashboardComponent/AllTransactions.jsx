import React from "react";
import {TableHeaders} from "'../components/TableHeaders.jsx";

export function AllTransactions(transactions)  {
    return (
        <div className="grid grid-cols-5 gap-4">
            <TableHeaders header="Transaction ID" />
            <TableHeaders header="Date" />
            <TableHeaders header="Amount" />
            <TableHeaders header="Actions" />
            <TableHeaders header="Status" />
            {transactions && transactions.length === 0 ?
            
            <div>No transactions found.</div>
        
            :
            transactions.map((txn) => (
                <React.Fragment key={txn.id}>
                    <div className="col-span-1">{txn.txn_id}</div>
                    <div className="col-span-1">{new Date(txn.date).toLocaleDateString()}</div>
                    <div className="col-span-1">${txn.amount.toFixed(2)}</div>
                    <div className={`col-span-1 ${txn.txn_type === 'Deposit' ? 'text-green-500' : 'text-red-500'}`}>
                        {txn.txn_type}
                    </div>
                    <div className={`col-span-1 ${txn.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                        {txn.status}
                    </div>
                    
                </React.Fragment>
            ))
        }
        </div>
    );
} 