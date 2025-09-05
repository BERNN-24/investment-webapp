import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TableHeaders } from "../TableHeaders";

export function RequestTable({request}) {
    console.log(request);
    // Assuming requests is an object with userId, username,  amount, and request type properties
    const navigate = useNavigate();
    const [requestStatus, setRequestStatus] = useState({
        status: '',
        pend_id: '',
    });
    
    const [message, setMessage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    async function handleClick(event) {
        event.preventDefault();
        const { id , value } = event.currentTarget;
        setRequestStatus((prevValue) => ({
            ...prevValue,
            pending_id: value,
            status: id,

        }));

        if (!id || !value) setErrorMessage("Kindly select a request to process.");

            try {
                console.log(requestStatus);
                setLoading(true);
                // Assuming there's an API endpoint to update the request status
                const result = await axios.post("http://localhost:3001/admin/allRequests", requestStatus, { withCredentials: true });
                if (result.status !== 200) throw new Error(result.data.message);
                setMessage(result.data.message);
                setTimeout(() => {
                    navigate("/dashboard/admin/allTransactions");
                }, 3000)
            } catch (error) {
                setMessage(error.message || "An error occurred while processing the request.");
            } finally {
                setLoading(false);
            }
        
    }

    return (
                <div className = "grid grid-cols-5">
                    <div>Date: {request.date}</div>
                    <div>{request.user_id}</div>
                    <div>Status : {request.txn_type}</div>
                    <div>Amount: {request.amount}</div>
                    <div className="flex justify-between items-center">
                        <div> <button id="approve" onClick={handleClick} name="status" value={request.pending_id} > Approve  <span>approveIcon </span> </button> </div>
                        <div> <button id="reject" onClick={handleClick} name="status" value={request.pending_id} > Reject <span>approveIcon </span> </button> </div>
                    </div>
                    
                </div>
    );
}