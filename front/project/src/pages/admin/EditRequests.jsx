import React, {useState , useEffect} from "react"; 
import axios from "axios";
import { RequestTable } from "../../components/adminComponent/RequestTable";
import { TableHeaders } from "../../components/TableHeaders";

export function EditRequests (){
      const [addReqData, setReqData] = useState(null);
      const [isLoading, setLoading] = useState(false);
      const [errorMessage, setErrorMessage] = useState(null);

      useEffect(()=>{
        const fetchAddRequest = async ()=> {
            try{
                setLoading(true);
                // Fetching the add requests from the server
                const result = await axios.get("http://localhost:3001/admin/allRequests", {withCredentials:true});
                if(result.status !== 200) throw new Error(result.data.message);
                const {data} = result.data;
                setReqData(data);
            } catch (error) {
                setErrorMessage(error.message);
            }finally {
                setLoading(false);
            }
        }
        fetchAddRequest();
      },[])
      return(
        <div>
            <h1> All Requests</h1>

            {isLoading && <div>Loading...</div>}
            {errorMessage && <div>Error: {errorMessage}</div>}
            <div>
                <TableHeaders header="TxnType" />
                <TableHeaders header="Username" />
                <TableHeaders header="Amount" />
                <TableHeaders header="Actions" /> 
            </div>
            {addReqData && addReqData.length > 0 ? (
                <ul>
                    {addReqData.map((request , index) => (      
                        <li key={index}>
                             <RequestTable
                               requests={request}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No requests available.</div>
            )}
        </div>
      )

}