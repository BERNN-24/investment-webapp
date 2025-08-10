import React from "react"; 
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import {About,Homepage,Login,Dashboard,Signup, Avatar, AdminDashboard , EditBalance, EditRequests, AllTransactions , UserTxn} from "./pages/AllPages";
// This is the main App component that sets up the routes for the application
// APPLYING LAZY LOADING TO THE ROUTES
import {lazyLoad} from "../hooks/LazyLoading";

import { AuthProvider} from "./hooks/Auth_Provider";
import { UserProvider } from "./hooks/Usercontext";
import {DashboardRedirector} from "./hooks/DashboardRedirector";
import ProtectedRoute from "./hooks/ProtectedRoute";
// IMPORTING REGULAR PAGES
const Homepage = lazyLoad("./pages/Homepage","Homepage");
const About = lazyLoad("./pages/About","About");  
const Login = lazyLoad("./pages/Login", "Login");
const Signup = lazyLoad("./pages/Signup", "Signup");
const Avatar = lazyLoad("./pages/Avatar", "Avatar");
const Dashboard = lazyLoad("./pages/Dashboard","Dashboard");

// ADMIN PANEL ROUTES
const  AdminDashboard = ("./pages/admin/AdminDashboard", "AdminDashboard");
const  EditRequests = lazyLoad(".pages/admin/EditRequests", "EditRequests");
const  EditBalance = lazyLoad(".pages/admin/EditBalance", "EditBalance");
const AllTransactions = lazyLoad(".pages/admin/AllTransactions", "AllTransactions");
const UserTxn = lazyLoad(".pages/admin/UserTxn", "UserTxn");


import './App.css'

function App() {
  return (
    <AuthProvider>
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
              <UserProvider>
              <Route path="dashboard/admin/" element={<AdminDashboard/>}/>
              <Route path="dashboard/admin/editBalance" element={<EditBalance/>}/>
              <Route path="dashboard/admin/editRequests" element={<EditRequests/>}/>
              <Route path="dashboard/admin/allTransactions" element={<AllTransactions/>}/>
              <Route path="dashboard/admin/userTxn/:userId" element={<UserTxn/>}/>

            
              </UserProvider>
              </Route> 
            
        </Routes> 
    </Router>
    </AuthProvider>
  )
}

export default App
