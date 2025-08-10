import React , {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { BalanceTable } from "../../components/adminComponent/BalanceTable";
import { TableHeaders } from "../../components/TableHeaders";

export function EditBalance(){

    const navigate = useNavigate(); 
    const [allUsersData, setAllUserData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)
    useEffect(()=> {
        const allUserData = async () => {
            try{
                setLoading(true);
                const result = await axios.get("http://localhost:3001/admin/usersBalance", {withCredentials : true});
                if(result.status != 200) throw new Error (result.data.message);
                const {data} = result.data;
                if(data.length === 0) {
                    setAllUserData("No users found.");
                    return;
                }
                setAllUserData(data);

            }catch(error){
                setErrorMessage(error.message || "An error occurred while fetching user Balance.");
             } finally {
                setLoading(false);
                
             }
    } 
    allUserData()}, [] );

    return (
        <div> 
             <h1>Edit User Balance</h1> 
            {isLoading && <div>Loading...</div>}
            {errorMessage && <div>Error: {errorMessage}</div> }
            <div className="grid grid-cols-4 gap-4">
                 <TableHeaders header="User Balance" />
                 <TableHeaders header="Username" />
                 <TableHeaders header="Edit Balance" />
                 <TableHeaders header="Action" />
            </div>
            {/* ALL USER BALANCE */}
             {!isLoading && !errorMessage && allUsersData && allUsersData.length <= 0 ?
             <div>No users found.</div> 
             : 
             allUserData.map((user)=>{
                return(
                     <div> 
                       <BalanceTable
                       userId={user.id}
                       username = {user.username}
                       balance = {user.balance}
                       />
                     </div> 
                )
            })
            }
        </div>
    
       
    )
}

