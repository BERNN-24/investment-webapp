import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {MdAdd , IoMdRemove} from '../Icons';

export function BalanceTable ({userId, username , balance}){
    const navigate = useNavigate();
const [userBalance, setBalance] = useState({
    userId : userId,
    balance: balance,
    action : '',
    editedAmount: '',

});

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
            let currentBalance = result.data.balance;
            
            setBalanceMessage(result.data.message)

            setTimeout(() => { 

            setBalance((prevValue)=>{
                return {
                    ...prevValue,
                    balance : currentBalance,
                }
            });

            }, 1800);

            } catch (error){
                setBalanceMessage(error.message || "An error occurred while processing the request.");
            }finally {
                setLoading(false);
                setTimeout(() => {
                    setBalanceMessage(null);
                    navigate("/dashboard/admin/editBalance")
                }, 3000);
            }
    
}
   return (        
  <div className="grid grid-cols-4 gap-4 items-center bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border border-[#E2D6F3]">
    {/* Username */}
    <div className="text-gray-800 font-semibold">{username}</div>

    {/* Balance */}
    <div className="text-gray-600">{balance}</div>

    {/* Editable Input */}
    <div>
      <input 
        name="balanceAction"
        onChange={handleChange}
        value={userBalance.editedAmount}
        required
        type="number"
        className="w-full px-3 py-2 rounded-lg border border-[#E2D6F3] focus:ring-2 focus:ring-[#7F00FF] outline-none"
        placeholder="Enter amount"
      />
    </div>

    {/* Action Buttons */}
    <div className="flex gap-2">
      <button 
        id="add" 
        onClick={handleClick} 
        className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white text-sm rounded-lg shadow-md hover:shadow-lg transition"
      >
        <span className="material-icons text-sm"><MdAdd/></span>
        Add
      </button>

      <button 
        id="remove" 
        onClick={handleClick} 
        className="flex items-center gap-1 px-4 py-2 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200 transition"
      >
        <span className="material-icons text-sm"> <IoMdRemove/> </span>
        Remove
      </button>
    </div>

    {/* Balance Message */}
    {balanceMessage && (
      <div className="col-span-4 text-center text-sm text-[#7F00FF] mt-2 font-medium">
        {balanceMessage}
      </div>
    )}
  </div>
);

}