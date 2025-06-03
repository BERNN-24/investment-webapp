import React,{useState} from "react";
import Input from "../components/Input"; 
import Axios from "axios";
import { useAuth } from "../hooks/Auth_Provider";
import { Navigate } from "react-router-dom";

function Signup(){
    const {setUser} = useAuth();
    const [isLoading, setLoading] = useState(false);

    const[newUser, setNewUser]=useState({
        email:'',
        username:'',
        password:'',
        date:'',
        number:''
    });

    const [signupMessage , setSignupMessage] = useState(null);

    
     function handleChange(event){
        const {name, value}= event.target;

        setNewUser((prevValue)=>{
            return {
                ...prevValue, 
                [name] : value
            }
        });
        }

   async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
            try{
                const result = await Axios.post('http://localhost:3001/user/register', newUser);
                console.log(result);
                if(result.status != 200){
                    const error = new Error (result.data.message);
                    error.status(result.status);
                    throw error
                }
                setUser(result.data.user);

                setSignupMessage(result.data.message);

                <Navigate to="/dashboard"/>
                
                } 
                catch (error){
                    setSignupMessage(error.message);
                } finally{
                    setLoading(false);
                }

    }
    return <div>

        <div className="flex justify-center bg-emerald-100 pt-3 pb-3">
            <h3> {signupMessage} </h3>
        </div>
          <div className="grid lg:grid-cols-1  sm:grid-cols-1 w-2/3 ml-48 mt-10 bg-amber-100 pt-10 pb-10 pr-10 pl-10">
        <Input
        className="grid "
        name="username"
        type="text"
        placeholder="USERNAME"
        value = {newUser.username}
        onChange = {handleChange}
        />
         <Input
        name="email"
        type="email"
        placeholder="EMAIL"
        value = {newUser.email}
        onChange = {handleChange}
       required/>
        <Input
        name="date"
        type="date"
        placeholder="D.O.B"
        value={newUser.date}
        onChange= {handleChange}
       required />
         <Input
        name="password"
        type="password"
        placeholder="PASSWORD"
        value = {newUser.password}
        onChange = {handleChange}
        />
       
        <Input
        name='number'
        type="num"
        placeholder="Phone Number"
        value= {newUser.number}
        onChange={handleChange}
        />
       
       
    </div>
         <div className="flex justify-center ">
             <button className="bookingButton p-16" onClick={handleSubmit}> Sign UP</button>
        </div>
    </div>
        
       
}

export default Signup;