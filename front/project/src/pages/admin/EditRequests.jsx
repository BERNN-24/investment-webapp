import React, {useState , useEffect} from "react"; 
import axios from "axios";
import { RequestTable } from "../../components/adminComponent/RequestTable";
import { TableHeaders } from "../../components/TableHeaders";

export function EditRequests (){
      const [addReqData, setReqData] = useState('');
      const [isLoading, setLoading] = useState(false);
      const [errorMessage, setErrorMessage] = useState(null);

      useEffect(()=>{
        const fetchAddRequest = async ()=> {
            try{
                console.log("Edit request started.");
                setLoading(true);
                // Fetching the add requests from the server
                const result = await axios.get("http://localhost:3001/admin/allRequests", {withCredentials:true});
                if(result.status !== 200) throw new Error(result.data.message);
                const {data} = result.data;
                console.log(data);
                setReqData(data);
            } catch (error) {
                setErrorMessage(error.message);
            }finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
                
            }
        }
        fetchAddRequest();
      },[])
      return(
        <div>
            <h1> All Requests</h1>

            <div className="grid grid-cols-5">
                  <TableHeaders header="DATE" />
                <TableHeaders header = "User ID"/>
                <TableHeaders header="TxnType" />
                <TableHeaders header="Amount" />
                <TableHeaders header="Actions" /> 
            </div>

            {isLoading && <div>Loading...</div>}
            {errorMessage && <div>Error: {errorMessage}</div>}
            
            {!isLoading && addReqData && 
                <>
                {addReqData.length != 0 ? 
                  addReqData.map((element , index) => (         
                             <RequestTable
                                key={index}
                               request={element}
                            />
                    ))
             : 
                <div>No requests available.</div>
                }
                </> 
            }
        </div>
      )

}