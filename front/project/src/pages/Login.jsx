import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import Input from "../components/Input";
import Axios from "axios";
import { useAuth } from "../hooks/Auth_Provider";

function Login(){
    // UNIVERSAL USER setting
    const {setUser} = useAuth();

    const [login, setLogin]= useState({
        username : '',
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage]= useState('');
    const [isLoading,setLoading] = useState(false);


    function handleChange(e){
        const {name, value} = e.target;
        setLogin((prevValue)=>{
            return {
                ...prevValue,
                [name] : value
            }
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
       
        const checkLogin = async function (){
            try{
                const result = await Axios.post("http://localhost:3001/user/login", {
                body: login,
                credentials:"include",
                });
                
            if(result.status!= 201){
                // CREATING A CUSTOM ERROR WITH THE RESPONSE GOTTEN FROM API CALL
                const error = new Error(result.data.message); 
                error.status(result.status);
                throw error
            }
            setUser(result.data.user);

            <Navigate to="/dashboard"/>
            } 
            catch(error)
            {
                // SHOULD RETURN THE JSON FROM THE RESULT GOTTEN IF STATUSCODE IS NOT 201
                console.log(error.status);
                setErrorMessage(error.message);
            } finally {
                // SETS LOADING UI & SPINER
                setLoading(false);
            }
    } 
        checkLogin();     
   }
    

    return <div>
        
        <h3>{errorMessage}</h3>
        <Input
        name="username"
        placeholder= "Username"
        value= {login.username}
        type="text"
        onChange ={handleChange}/>

        <Input 
        name="password"
        placeholder="PASSWORD"
        value={login.password}
        type="password"
        onChange= {handleChange}
        minLength = "3"
        required/>
        
        <Input    
        name="email"
        placeholder= "Email Address"
        value={login.email}
        type="email"
        onChange = {handleChange} 
        required/>

        <button onClick={handleSubmit}>  LOGIN </button>
        {isLoading && <div>
            Loading......
            {/* SPINER PREFERABLY*/}
            </div>}

    </div>
}

export default Login;