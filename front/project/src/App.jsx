import React from "react"; 
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import {About,Homepage,Login,Dashboard,Signup, Avatar, AdminDashboard , EditBalance, EditRequests, AllTransactions , UserTxn} from "./pages/AllPages";
// This is the main App component that sets up the routes for the application
// APPLYING LAZY LOADING TO THE ROUTES

// ALL HOOKS
import {lazyLoad} from "./LazyLoading";

import { AuthProvider} from "./hooks/Auth_Provider";
import { UserProvider } from "./hooks/Usercontext";
import {DashboardRedirector} from "./hooks/DashboardRedirector";
import ProtectedRoute from "./hooks/ProtectedRoute";
// IMPORTING REGULAR PAGES
import Homepage from "./pages/Homepage";
// const Homepage = lazyLoad("./pages/Homepage","Homepage");
const About = lazyLoad(()=> import("./pages/About.jsx"));  
const Login = lazyLoad(()=> import("./pages/Login.jsx"));
const Signup = lazyLoad(()=> import("./pages/Signup.jsx"));
const Avatar = lazyLoad(()=> import("./pages/Avatar.jsx"));
const Dashboard = lazyLoad(()=> import("./pages/Dashboard.jsx"));
const Unauthorized = lazyLoad(()=>import ("./pages/Unauthorized.jsx"));

// ADMIN PANEL ROUTES
const  AdminDashboard = lazyLoad(()=> import("./pages/admin/AdminDashboard.jsx"), "AdminDashboard");
const AdminSettings = lazyLoad(()=> import("./pages/admin/AdminSettings.jsx"), "AdminSettings")
const  EditRequests = lazyLoad(()=> import("./pages/admin/EditRequests.jsx"), "EditRequests");
const  EditBalance = lazyLoad(()=> import("./pages/admin/EditBalance.jsx"), "EditBalance");
const AllTransactions = lazyLoad(()=> import("./pages/admin/AllTransactions.jsx"), "AllTransactions");
const UserTxn = lazyLoad(()=> import("./pages/admin/UserTxn.jsx"), "UserTxn");


import './App.css'

function App() {
  return (
    <AuthProvider>
      <UserProvider>
      <Router>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path = "/avatar" element = {<Avatar/>}/>
            
            <Route element={<ProtectedRoute roles={["admin", "user"]}/>}>
              <Route path="/dashboard" element={<DashboardRedirector/>}/>
                {/* USER DASHBOARD */}
              <Route path="/dashboard/user" element={<Dashboard/>}/>

              {/* ADMIN DASHBOARD ROUTES */}
              {/* UserProvider is a useContext hook to store dashboard data */}
              
              <Route path="dashboard/admin/" element={<AdminDashboard/>}/>
              <Route path ="dashboard/admin/adminSettings" element ={<AdminSettings/>}/>
              <Route path="dashboard/admin/editBalance" element={<EditBalance/>}/>
              <Route path="dashboard/admin/editRequests" element={<EditRequests/>}/>
              <Route path="dashboard/admin/allTransactions" element={<AllTransactions/>}/>
              <Route path="dashboard/admin/userTxn/:userId" element={<UserTxn/>}/>

            
              
            </Route> 
            <Route path="unauthorized" element={<Unauthorized/>}/>
          
        </Routes> 
    </Router>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
