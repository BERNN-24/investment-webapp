 import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth_Provider";

function ProtectedRoute({children }){
    const {user , isLoading} = useAuth();
    
    if (isLoading){
        return <div>
            Loading.... 
        </div>
      }
      if(!user) return <Navigate to='/login' replace />;

           return {children}

}

export default ProtectedRoute;