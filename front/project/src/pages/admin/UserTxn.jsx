import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// COMPONENTS
import { TableHeaders } from "../../components/TableHeaders";
import { UserTxnIndex } from "../../components/adminComponent/UserTxnIndex";



export function UserTxn() {
    const { userId } = useParams();
    
    const [txnData, setTxnData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    const userTxn = async ()=>{
        try{
            setLoading(true);
            const result = await axios.get(`http://localhost:3001/admin/userTransaction/${userId}`, {withCredentials: true});
            if(result.status !== 200) throw new Error(result.data.message);
            const {data} = result.data;
            if(data.length === 0) {
                setTxnData("No transactions found for this user.");
                return;
            }
            setTxnData(data);

        } catch (error) {
            setErrorMessage(error.message || "An error occurred while fetching transactions.");
        } finally {
            setLoading(false);
        }}
        userTxn();
    }, [userId]);

      async function handleClick(id) {
            try {
                setLoading(true);
                const result = await axios.delete(`http://localhost:3001/admin/userTransaction?txnId=${id}`, { withCredentials: true });
                if (result.status !== 200) throw new Error(result.data.message);
                setTxnData((prevData) => prevData.filter(txn => txn.id !== id));
            } catch (error) {
                setErrorMessage(error.message || "An error occurred while deleting the transaction.");
            } finally {
                setLoading(false);
            }
        }

    return (
        <div className = "min-h-screen">
            <h1>User Transactions for {txnData.display_name}</h1>
            <div className ="grid grid-cols-6 gap-4 overflow-xx-auto">
                <TableHeaders header="Transaction ID" />
                <TableHeaders header ="Pending ID"/>
                <TableHeaders header="Date"/>
                <TableHeaders header="Amount" />
                <TableHeaders header="Status"/>
                <TableHeaders header="Actions" />
            </div>
            {!txnData && loading && <div>Loading...</div>}
            {errorMessage && <div>Error: {errorMessage}</div>}
            {txnData && 
             <div className="overflow-x-auto">
             {txnData.length == 0 ? 
                 <div>No transactions available.</div>

                    :

                txnData.map((txn, index) => ( 
                        <UserTxnIndex txn = {txn} index = {index} onClick = {handleClick} isLoad={loading} />
                    ))
            }
            </div>}
        </div>
    );
}