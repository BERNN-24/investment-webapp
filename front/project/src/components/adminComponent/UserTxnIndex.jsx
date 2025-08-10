import React , {useState} from "react";
import { useNavigate } from "react-router-dom";


export function UserTxnIndex({data , index}) {
    
    const navigate = useNavigate();

        function handleClick() {
        navigate(`/dashboard/admin/userTransaction/${data.userId}`);
         }

    return (
        <div>
             <div key={data.userId}>
                <div> {index} </div>
                <div>{data.username}</div>
                <div>{data.email}</div>
                <div>{data.balance}</div>
                <div> 
                Check Transaction 
                <button onClick={handleClick}>hello</button> 
                </div>
             
            </div>
        </div>
    );
}