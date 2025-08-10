import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TableHeaders } from "../TableHeaders";

export function BalanceTable ({userId, username , balance}){
    const navigate = useNavigate();
const [userBalance, setBalance] = useState({
    userId : userId,
    balance: currentBalance,
    action : '',
    editedAmount: '',

});
let currentBalance = balance;
const [balanceMessage, setBalanceMessage] = useState(null);
const [isLoading, setLoading] = useState(false);
const [errorMessage , setErrorMessage] = useState(null);

function handleChange(event){
    const{value} = event.target;
    setBalance((prevValue)=>{
        return {
            ...prevValue,
            amount : value
        }
    });
}

async function handleClick (event){
    const {id} = event.currentTarget;
    setBalance((prevValue)=>{
       return{
                ...prevValue,
                action : id,
             } 
    });
    const {editedAmount} = userBalance;
    if(!id || !editedAmount) setErrorMessage("Kindly Input an Amount") ;

        try{
            setLoading(true);
            const result = await axios.post("http://localhost:3001/admin/usersBalance", userBalance, {withCredentials : true});
            
            if (result.status !=200) throw new Error(result.data.message);
            currentBalance = result.data.balance;
            setBalanceMessage(result.data.message)

            setTimeout(() => { navigate("/dashboard/admin/editBalance");}, 3000);

            } catch (error){
                setBalanceMessage(error.message || "An error occurred while processing the request.");
            }finally {
                setLoading(false);
            }
    
}
    return(        
        <div>
           <div>
             <TableHeaders header="Username" />
            <TableHeaders header="Balance" />
            <TableHeaders header="Edit Balance" />
            <TableHeaders header="Action" />
           
           </div>
            <div>{username}</div>
            <div>{currentBalance}</div>
            <div>
                 <input 
                 name = "balanceAction"
                 onChange={handleChange}
                 value = {userBalance.editedAmount}
                 required
                 />
            </div>
            <div>
                <div> <button id = "add" onClick={handleClick} >ADD</button> </div>
                <div> <button id ="remove" onClick={handleClick} > REMOVE </button> </div>
            </div>
            {balanceMessage && 
                <div>
                     {balanceMessage}
                 </div> 
            }
        </div>
    )
}