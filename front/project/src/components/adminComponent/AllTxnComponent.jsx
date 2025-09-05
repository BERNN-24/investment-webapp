import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// icons
import {TbDeviceDesktopAnalytics , FaLock , FaLockOpen} from "../Icons";

export function AllTxnComponent({element, index}){
    const [message , setMessage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleAccess(event) {
        event.preventDefault();
        try {
          setLoading(true);
          const result = await axios.patch(`http://localhost:3001/admin/restrictAccess`, 
            {userId : element.id , access : element.access} , {withCredentials : true} );
            if(result.status !=200) throw Error (result.data.messsage);
            setMessage(result.data.messsage);
    
        } catch (error) {
          console.log(error.message);
          setMessage(error.message);
          
        } finally {
          setLoading(false);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        }
    }
    return (
          <div
            key={index}
            className="grid grid-cols-[auto_auto_auto_auto_auto_auto] items-center gap-4 p-4 border-b border-[#0A2540] hover:bg-[#1E3A8A]/20 transition-colors"
          >
            {/* Index */}
            <div className="text-[#F5E6C8] font-medium">{index + 1}</div>

            {/* User ID */}
            <div className="sticky left-0 z-10 bg-[#0A2540] text-[#D4AF37] font-semibold px-2 py-1 rounded">
              {element.id}
            </div>

            {/* User Display Name */}
            <div className="sticky left-[150px] z-10 bg-[#0A2540] text-[#F9FAFB] px-2 py-1 rounded">
              {element.display_name}
            </div>

            {/* Balance */}
            <div className="text-[#D4AF37] font-bold">${element.user_balance}</div>

            {/* Access */}
            <div
              className={`font-semibold ${
                element.access ? "text-green-400" : "text-red-400"
              }`}
            >
              <span>{element.access ? "GRANTED" : "REVOKED"}</span>
              <span>{element.access ? <FaLockOpen/> : <FaLock/> }</span>
            
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleAccess}
                className={` px-3 py-1 text-sm font-semibold rounded-lg shadow-md transition-colors ${
                  element.access
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
               <span className = "px-3"> {element.access ? "REVOKE ACCESS"  : "GRANT ACCESS"} </span> 
               <span className = "px-3"> {element.access ? <FaLock className = "w-8  h-8"/> : <FaLockOpen className = "w-8 h-8"/>} </span>
              </button>

              <button
                onClick={() => navigate(`/dashboard/admin/userTxn/${element.id}`)}
                className="px-3 py-1 text-sm font-semibold rounded-lg bg-[#1E3A8A] hover:bg-[#0A2540] text-[#F5E6C8] shadow-md transition-colors"
              >
                VIEW TRANSACTIONS <span> <TbDeviceDesktopAnalytics className = "w-8 h-8"/> </span>
              </button>
               {isLoading && <div className=" ml-4 w-4 h-4 border-4 border-y-transparent rounded-full animate-spin"> </div>}
            </div>
             
          </div>
        );

        }