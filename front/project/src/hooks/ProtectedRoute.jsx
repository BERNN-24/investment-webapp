 import React from "react";
import { Navigate , Outlet} from "react-router-dom";
import { useAuth } from "./Auth_Provider";

function   ProtectedRoute({roles}){
    const {user , isLoading} = useAuth();
    console.log(user);
    
    if (isLoading){
        return <div>
            Loading.... 
        </div>
      }
      if(!user) return <Navigate to='/login' replace />;
      // IF USER ACESS IS DENIED, WE DO THE REDIRECTION HERE IF THERE IS A HARD RELOAD
      if(!user.access) return <Navigate to = "/unauthorized" replace/>
      // CHECK IF USER ROLE IS admin or user.
      if(!roles.includes(user.role)) return <Navigate to='/unauthorized' replace />;
        // If the user is authenticated and has the right role, render the child components
           return <Outlet />

}

export default ProtectedRoute;