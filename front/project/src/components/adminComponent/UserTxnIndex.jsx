import React from "react";

export function UserTxnIndex({txn , index , onClick , isLoad}) {
    

    return (
         <div key={index} className="grid grid-cols-6 ">
                            <div>{txn.txn_id}</div>
                            <div>{txn.pending_id}</div>
                            <div>{txn.amount}</div>
                            <div>{txn.txn_type}</div>
                            <div>{new Date(txn.date).toLocaleDateString()}</div>
                            <div>{txn.status}</div>
                            <div>
                                 <button onClick={(e)=>{
                                 e.preventDefault();
                                     onClick(txn.txn_id)}} >
                                 DELETE TXN   
                                 </button> </div>
                                 {isLoad && <div className="ml-4 w-4 h-4 border-3 border-y-transparent rounded-full animate-spin"> </div>}
                        </div>
    );
}