import React, {useContext,useState,useEffect,createContext} from "react";
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
      const reloadAuth =  async ()=>{
            try{
                const response = await axios.get("/user/verifyAuth", {credentials:"include"})
                 if(response.status != 200)
                    {
                        throw new Error (response)
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

export {useAuth};
