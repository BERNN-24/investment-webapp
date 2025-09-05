import React , {useState, useEffect} from "react";
import axios from "axios";
import { BalanceTable } from "../../components/adminComponent/BalanceTable";
import { TableHeaders } from "../../components/TableHeaders";
// ICONS
import {FaUserSlash} from "../../components/Icons";

export function EditBalance(){
    const [allUsersData, setAllUserData] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)
    useEffect(()=> {

        setLoading(true);
        const allUserData = async () => {
            
            try{
                
                console.log("async started");
                const result = await axios.get("http://localhost:3001/admin/usersBalance", {withCredentials : true});
                if(result.status != 200) throw new Error (result.data.message);
                const {data} = result.data;
                if(data.length === 0) {
                    setAllUserData([]);
                    return;
                }
                console.log(data);
                setAllUserData(data);

            }catch(error){
                setErrorMessage(error.message || "An error occurred while fetching user Balance.");
             } finally {
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);
                setLoading(false);
                
             }
    } 
    allUserData ();
  }, [] );

return (
    
  <div className="p-6 min-h-screen bg-gradient-to-br from-[#7F00FF]/10 to-[#E100FF]/10">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit User Balance</h1>
    {isLoading && (
      <div className="text-center text-gray-600 animate-pulse">Loading...</div>
    )}
    {errorMessage && (
      <div className="text-red-600 font-medium">Error: {errorMessage}</div>
    )}
    {!isLoading && allUsersData &&
    <div>
    {/* Table Header */}
    <div className="grid grid-cols-4 gap-4 bg-white rounded-lg shadow-md p-4 border-b-4 border-gradient-to-r from-[#7F00FF] to-[#E100FF]">
      <TableHeaders header="User Balance" />
      <TableHeaders header="Username" />
      <TableHeaders header="Edit Balance" />
      <TableHeaders header="Action" />
    </div>

    {/* All User Balances */}
    {allUsersData.length == 0 ? (
      <div className="flex flex-col items-center text-gray-500">
        <div><FaUserSlash/> </div>
        <div> No users found. </div>
      </div>
    ) : (
      <div className="mt-4 space-y-3">
        {allUsersData.map((user) => (
            <BalanceTable
              key={user.id}
              userId={user.id}
              username={user.display_name}
              balance={user.user_balance}
            />
        ))}
      </div>
    )}
    </div>
}
  </div>
);
}

