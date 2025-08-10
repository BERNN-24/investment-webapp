import React, {useState} from "react";
import { Add , Withdraw } from "./TxnInfo.jsx";

export function Transaction(balance) {
    const [txnDetail, setTxnDetail] = useState(false);
    const [txnType, setTxnType] = useState(null);
    
    function handleAction (event){
        const {id} = event.currentTarget;
        setTxnDetail(true);
        setTxnType(id);
    }
    return ( <>
    
         <div>
                <button id="deposit" onClick={handleAction}>Deposit</button>
                <button id="withdraw" onClick={handleAction}>Withdraw</button>
        </div> 
        <div>
         { txnDetail && 
          (
             txnType === "deposit" ? 
             <Add/> 
             :
             <Withdraw balance = {balance}/>

            )

        }
        </div>
</>)
}