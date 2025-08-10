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
        
            try{
                setLoading(true);
                if(!newUser.email || !newUser.username || !newUser.password || !newUser.date || !newUser.number){
                    throw new Error("All fields are required."); 
                }

                const result = await Axios.post('http://localhost:3001/register', newUser);
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
                    setTimeout(() => {  
                        setSignupMessage(null);
                    }, 3000);
                } finally{
                    setLoading(false);
                }

    }
    return <div
  className="min-h-screen flex flex-col items-center justify-center px-4"
  style={{
    background: "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)",
  }}
>
  {/* Signup message banner */}
   {signupMessage &&
  <div className="w-full max-w-md sm:max-w-lg bg-[#FDE7FF] text-[#E100FF] font-semibold py-3 px-6 rounded-md mb-6 text-center shadow-md">
     <h3>{signupMessage}</h3>
  </div>
}

  {/* Form container */}
  <div
    className="w-full max-w-md sm:max-w-lg bg-white bg-opacity-90
               border border-[#D6B4FC] rounded-2xl shadow-lg px-6 py-8
               backdrop-filter backdrop-blur-md mt-10"
  >
    <Input
      className="w-full mb-5 rounded-lg border border-[#D6B4FC] px-4 py-3 placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7F00FF]"
      name="username"
      type="text"
      placeholder="USERNAME"
      value={newUser.username}
      onChange={handleChange}
    />
    <Input
      className="w-full mb-5 rounded-lg border border-[#D6B4FC] px-4 py-3 placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7F00FF]"
      name="email"
      type="email"
      placeholder="EMAIL"
      value={newUser.email}
      onChange={handleChange}
      required
    />
    <Input
      className="w-full mb-5 rounded-lg border border-[#D6B4FC] px-4 py-3 placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7F00FF]"
      name="date"
      type="date"
      placeholder="D.O.B"
      value={newUser.date}
      onChange={handleChange}
      required
    />
    <Input
      className="w-full mb-5 rounded-lg border border-[#D6B4FC] px-4 py-3 placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7F00FF]"
      name="password"
      type="password"
      placeholder="PASSWORD"
      value={newUser.password}
      onChange={handleChange}
    />
    <Input
      className="w-full mb-8 rounded-lg border border-[#D6B4FC] px-4 py-3 placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#7F00FF]"
      name="number"
      type="tel"
      placeholder="Phone Number"
      value={newUser.number}
      onChange={handleChange}
    />
  </div>

  {/* Submit button */}
  <div className="w-full max-w-md sm:max-w-lg mt-6 mb-10">
    <button
      className="w-full bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#5A00B3] transition duration-300"
      onClick={handleSubmit}
    >
      Sign UP
    </button>
  </div>
</div>       
}

export default Signup;