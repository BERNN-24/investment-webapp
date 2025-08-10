import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TableHeaders } from "../TableHeaders";

export function RequestTable({requests}) {
    // Assuming requests is an object with userId, username,  amount, and request type properties
    const navigate = useNavigate();
    const [requestStatus, setRequestStatus] = useState({
        status: '',
        pending_id: '',
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
                setLoading(true);
                // Assuming there's an API endpoint to update the request status
                const result = await axios.post("http://localhost:3001/admin/usersRequest", requestStatus, { withCredentials: true });
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
        <div>
             
            {requests.map((request) => (
                <div key={request.pending_id}>
                    <div>Status: {request.type}</div>
                    <div>Username: {request.username}</div> 
                    <div>Amount: {request.amount}</div>
                    <button id="approve" onClick={handleClick} name="status" value={request.pending_id} >Approve</button>
                    <button id="reject" onClick={handleClick} name="status" value={request.pending_id}>Reject</button>
                </div>
            ))}
            {isLoading && <div>Loading...</div>}
            {message && <div>{message}</div>}
        </div>
    );
}