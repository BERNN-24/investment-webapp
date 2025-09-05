import React, {useState } from "react";
import { Add , Withdraw } from "./TxnInfo.jsx";

export function Transaction(balance) {
    const [txnDetail, setTxnDetail] = useState(false);
    const [txnType, setTxnType] = useState(null);
    
    function handleAction (event){
        event.preventDefault();
        const {id} = event.currentTarget;
        console.log();
        setTxnDetail(true);
        setTxnType(id);
    }
    function closeModal (event){
        setTxnDetail(false)
    }
    return ( <div className = ''>
    
         <div className={`${txnDetail && "backdrop-blur-lg"} px-6 grid grid-cols-2`}>
            <div className="flex items-center justify-center">
                <button id="deposit" onClick={handleAction} 
                    className="mb-4 p-4 font-semibold text-white rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow transition-all">
                    Deposit
                </button>
            </div>
            <div className="flex items-center justify-center">
                <button id="withdraw" onClick={handleAction}
                className="mb-4 p-4 font-semibold text-white rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow transition-all">
                Withdraw</button>
            </div>         
        </div> 

        {txnDetail && <div className = "fixed inset-0 z-30 pointer-events-auto backdrop-blur-lg"></div>}
        
         { txnDetail && 
          
         <div className = "fixed inset-0 z-40 top-1/5 left-1/5 w-2/4 aspect-square pointer-events-auto">

            
             {txnType === "deposit" ? 
             <div>
                <Add
                closeModal={closeModal}
                />
             </div>
              
             :
             <div>
                <Withdraw 
                balance = {balance}
                closeModal = {closeModal}
                />
             </div>
               }
           
            </div>
        }
        
</div>)
}