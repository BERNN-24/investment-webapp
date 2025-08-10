import React from "react";
import { useNavigate } from "react-router-dom";
import { AllTransactions } from "./AllTransactions";
import { EditBalance } from "./EditBalance";
import { EditRequests } from "./EditRequests";

export default function AdminDashboard (){
    const navigate = useNavigate();
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage user balances, requests, and view all transactions.</p>

            <div onClick={() => navigate ("/dashboard/admin/allTransactions")} >
                 <AllTransactions />
            </div>
            <div onClick={() => navigate ("/dashboard/admin/editBalance")}>
                <EditBalance />
            </div>
            <div onClick={() => navigate ("/dashboard/admin/editRequests")}>
                <EditRequests />
            </div>
        </div>
        )
}