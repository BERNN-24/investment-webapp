import React, {useState , useEffect } from 'react';
import axios from "axios";
// COMPONENTS
import { TableHeaders } from '../../components/TableHeaders';
import { AllTxnComponent } from '../../components/adminComponent/AllTxnComponent';
import { useNavigate } from 'react-router-dom';

export function AllTransactions() {
  const navigate = useNavigate ();
  const [message,setMessage] = useState("");
  const [isLoading , setLoading] = useState(false);
  const [trxData , setTrxData]  = useState(null);
  
  useEffect(()=>{
    const allTxnData = async () => {
      try {
        setLoading(true);
        const result = await axios.get("http://localhost:3001/admin/allTransaction", {withCredentials : true});
        if(result.status != 200) throw new Error (result.data.message);
        console.log(result.data);
        const {data} = result.data;
        setTrxData(data);
      } catch (error) {
        if(error.status == 401) navigate("/unauthorized");
        setMessage(error.message);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }
    allTxnData();
  },[]);
  

 return (
  <div className="min-h-screen bg-[#111827] text-[#F9FAFB] p-6">
    {message && (
      <div className="flex justify-center items-center text-2xl border border-[#D4AF37] bg-[#0A2540] rounded-xl shadow-md shadow-[#0A2540]/40 text-[#D4AF37] py-3 mb-6">
        {message}
      </div>
    )}

    <h1 className="text-3xl font-bold text-[#D4AF37] mb-6">
      All Users Transactions
    </h1>

    {/* Table Headers */}
    <div className="grid grid-cols-[auto_auto_auto_auto_auto_auto] gap-4 overflow-x-auto bg-[#0A2540] text-[#F5E6C8] p-4 rounded-lg shadow-inner shadow-[#0A2540]/50 mb-4">
      <TableHeaders header="S/N" />
      <TableHeaders header="UID" />
      <TableHeaders header="User [Email / Name]" />
      <TableHeaders header="Access" />
      <TableHeaders header="Balance" />
      <TableHeaders header="Actions" />
    </div>

    {/* Loader */}
    {isLoading && (
      <div className="flex justify-center items-center h-32">
        <div className="flex justify-center items-center w-16 h-16 border-4 border-t-[#D4AF37] border-[#0A2540] rounded-full animate-spin"></div>
      </div>
    )}

    {/* Transactions */}
    {!isLoading && trxData && (
      <div className="overflow-x-auto bg-[#0A2540] rounded-lg shadow-md shadow-[#0A2540]/50">
        {trxData.length === 0 ? (
          <div className="text-center text-[#9CA3AF] p-6">
            No transactions available.
          </div>
        ) : (
          trxData.map((element, index) => (
            <AllTxnComponent key={index} element={element} index={index} />
          ))
        )}
      </div>
    )}
  </div>
);

} 

