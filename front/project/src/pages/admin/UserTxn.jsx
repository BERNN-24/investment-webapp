import React, {useState,useEffect, use} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TableHeaders } from "../../components/TableHeaders";

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

    async function handleClick(event) {
        const { id } = event.currentTarget;
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
        <div>
            <h1>User Transactions for {txnData.username}</h1>
            <div className ="grid grid-cols-5 gap-4">
                <TableHeaders header="Transaction ID" />
                <TableHeaders header="Date"/>
                <TableHeaders header="Amount" />
                <TableHeaders header="Status"/>
                <TableHeaders header="Actions" />
            </div>
            {loading && <div>Loading...</div>}
            {errorMessage && <div>Error: {errorMessage}</div>}
            {txnData && txnData.length > 0 ? (
                <ul>
                    {txnData.map((txn, index) => (
                        <li key={index}>
                            <div>{txn.txn_id}</div>
                            <div>{txn.pending_id}</div>
                            <div>{txn.amount}</div>
                            <div>{txn.txn_type}</div>
                            <div>{new Date(txn.date).toLocaleDateString()}</div>
                            <div>{txn.status}</div>
                            <div> <button onClick={handleClick} > Remove  </button> </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No transactions available.</div>
            )}
        </div>
    );
}