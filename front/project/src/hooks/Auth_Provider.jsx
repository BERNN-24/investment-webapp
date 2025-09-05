import React, {useContext, useState, useEffect, createContext} from "react";
import axios from "axios";

const AuthContext = createContext();

function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider ( {children}) {
    // Sets universal USER that is accessible anywhere
     const [user,setUser] = useState();

     const [isLoading,setLoading] = useState(true);
    //  ON HARD RELOAD IF IT IS STILL IN THE DASHBOARD, IT GOES TO BACKEND TO CHECK IF *session* STILL ACTIVE.
    useEffect( ()=>{
        console.log("Auth Provider useEffect called");
      const reloadAuth =  async ()=>{
            try{
                const response = await axios.get("/verifyAuth", {withCredentials:true})
                 if(response.status != 200)
                    {
                        throw new Error (response.message)
                    }
                     setUser(response.data);
                 } catch(error){ 
                    
                     setUser(null)

                    }  finally {
                        setLoading(false);
                    }
             }
             reloadAuth();
    } ,[]);

   return (
    <AuthContext.Provider value={{user ,setUser , isLoading }}>
        {children}
    </AuthContext.Provider>
   )
    
}

export { useAuth };
