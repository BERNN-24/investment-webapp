import React, {useState} from "react";
import axios from "axios";
import Input from "../Input";
import { arePropertiesNotEmpty } from "../../utils/objectCheck";
export function AddAdmin (){
    const [admin, setAdmin] = useState({
        email : "",
        password : ""
    });
    const [username, setUsername] = useState('');
    const [message,setMessage] = useState(null);

    // HANDLE CHANGES
    function handleChange(event){
        const {name , value } = event.target;
        setAdmin((prevValue)=>{
            return  {
                ...prevValue,
                [name] : value
            }
        })
     }
    // HANDLE ADMIN ADDITION
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if(!arePropertiesNotEmpty(admin)) {
                setMessage("KINDLY INPUT ALL FIELDS");
                 return;
            }

            const result = await axios.post("http://localhost:3001/admin/addAdmin", admin , {withCredentials : true});
            if (result.status != 200) throw Error(result.data.message);
            setMessage(result.data.message);
        } catch (error) {
            setMessage(error.message)
        } finally {
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }

        
    }
    return (
        
        <div className="container border rounded-lg">
            <div>{message}</div>
            <div>
                <p> ADD NEW ADMIN </p>
            </div>
            <div> 
            <Input
              name="email"
                type="email"
                placeholder="EMAIL"
                value={admin.email}
                onChange={handleChange}
                required
            />
             <Input
              name="password"
                type="password"
                placeholder="INPUT PASSWORD"
                value={admin.password}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <button onClick={handleSubmit}>ADD ADMIN</button>
        </div>

        </div>
    )
}