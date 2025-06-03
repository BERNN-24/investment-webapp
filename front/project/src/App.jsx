import React from "react"; 
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {About,Homepage,Login,Dashboard,Signup} from "./pages/AllPages";
import { AuthProvider } from "./hooks/Auth_Provider";
import ProtectedRoute from "./hooks/ProtectedRoute";
import './App.css'

function App() {
  return (
    <AuthProvider>
    <Router>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/dashboard"  element={
              <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes> 
    </Router>
    </AuthProvider>
  )
}

export default App
