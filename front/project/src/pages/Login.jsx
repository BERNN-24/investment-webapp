import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Axios from "axios";
import { useAuth } from "../hooks/Auth_Provider";

function Login(){
    // UNIVERSAL USER setting
    const {setUser} = useAuth();
    const navigate = useNavigate();

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
                // VALIDATING THE INPUTS
                if(!login.username || !login.email || !login.password){
                    setErrorMessage("Please fill in all fields.");
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3000);
                    return;
                }
            // MAKING AN API CALL TO THE BACKEND FOR LOGIN
                const result = await Axios.post("http://localhost:3001/login",login, {withCredentials: true});

                 if(result.status!= 201){
                // CREATING A CUSTOM ERROR WITH THE RESPONSE GOTTEN FROM API CALL
                const error = new Error(result.data.message); 
                error.status =(result.status);
                throw error;
            }
            const {user} = result.data;
            // CHECKING IF USER HAS ACCESS
            if(user.access == false) {
              const error = new Error ("Access Denied, contact support for help.");
              error.status = 403;
              throw error;
            }
            // IF USER HAS ACCESS, SEND DATA TO AUTH PROVIDER USER CONTEXT

            setUser(user);
            navigate("/dashboard");
            } 

            catch(error) {
              // CHECKING IF ERROR IS RESULT OF ACCESS NOT GRANTED
              if(error.statusCode == 403){
                setErrorMessage(error.messagee)
                setTimeout(()=>{
                  setErrorMessage(null);
                  navigate("/unauthorized");
                },3000)
              }
                // SHOULD RETURN THE JSON FROM THE RESULT GOTTEN IF STATUSCODE IS NOT 201
                console.log(error.message);
                setErrorMessage(error.message);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
                
            } finally {
                // SETS LOADING UI & SPINER
                setLoading(false);
            }
    } 
        checkLogin();     
   }
    

    return <div
  className="min-h-screen flex items-center justify-center px-4"
  style={{
    background: "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)",
  }}
>
  <div className="w-full max-w-md bg-white bg-opacity-90 border border-[#D6B4FC] rounded-3xl shadow-2xl p-8
                  backdrop-filter backdrop-blur-md
                  ring-4 ring-[#D6B4FC] ring-opacity-40
                  hover:ring-opacity-70
                  transition duration-500 ease-in-out"
  >
    <h3 className="text-[#7F00FF] text-2xl font-extrabold mb-6 text-center drop-shadow-lg">
      {errorMessage || "Welcome Back!"}
    </h3>

    <Input
      name="username"
      placeholder="Username"
      value={login.username}
      type="text"
      onChange={handleChange}
      className="mb-5"
    />

    <Input
      name="password"
      placeholder="PASSWORD"
      value={login.password}
      type="password"
      onChange={handleChange}
      minLength="3"
      required
      className="mb-5"
    />

    <Input
      name="email"
      placeholder="Email Address"
      value={login.email}
      type="email"
      onChange={handleChange}
      required
      className="mb-8"
    />

    <button
      onClick={handleSubmit}
      className="w-full bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white font-bold py-3 rounded-2xl shadow-lg hover:bg-[#5A00B3] transition duration-300"
    >
      LOGIN
    </button>

    {isLoading && (
      <div className="flex justify-center mt-6">
        <div className="w-7 h-7 border-4 border-[#D6B4FC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )}
  </div>
</div>
}

export default Login;