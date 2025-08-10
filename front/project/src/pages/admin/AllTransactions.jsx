import React,{useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { TableHeaders } from '../../components/TableHeaders';

export function AllTransactions(data) {
  const navigate = useNavigate();
  const [message,setMessage] = useState("");
    
  async function handleClick(userId , access, e){
    e.preventDefault();
    try {
      const result = await axios.patch(`http://localhost:3001/admin/restrictAccess/`, 
        {userId : userId , access :access} , {withCredentials : true} );
        if(result.status !=200) throw Error (result.data.messsage);
        setMessage(result.data.messsage);

    } catch (error) {
      setMessage(error.message);
      console.log(error.message)
    } finally {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }

  return (
    <div>
      <h1>All Users Transactions</h1>
        <div className="grid grid-cols-5 gap-4">
            <TableHeaders header="S/N" />
            <TableHeaders header="Username" />
            <TableHeaders header="Email" />
            <TableHeaders header ="Access"/>
            <TableHeaders header="Balance" />
            <TableHeaders header="Actions" />
        </div>
        {data && Array.isAArray(data) && data.length > 0 ? 
          data.map((element, index) => (
            
           <div key = {index} id={element.id}>

            <div> {index} </div>
            <div>{element.display_name}</div>
            <div>{element.user_balance}</div>
            <div>{element.access? "GRANTED" : "REVOKED"}</div>
            <div>
                <div> <button onClick={()=> navigate(`/dashboard/admin/userTxn/${element.id}`)} > VIEW TRANSACTIONS</button> </div>
                <div> <button onClick={()=>{
                  handleClick(element.id, element.access);
                }} > {element.access ? "REVOKE" : "GRANT"} ACCESS </button> </div>
            </div>
          </div>

          
          )) : (
          <div>No transactions available.</div>
        )}
      </div>
  );
} 

