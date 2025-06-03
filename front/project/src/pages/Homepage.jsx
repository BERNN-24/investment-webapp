import React, {useState, useEffect} from "react";
import Axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// COMPONENTS
import {Hero} from "../components/HeroSection";

function Homepage(){

     const [load, setLoad]= useState('');
      
        useEffect(()=>{
        const fetData = async function () {
           try {
            const response = await Axios.get('http://localhost:3001/');
            setLoad(response.data);
           }
           catch(error){
            console.log(error.message);
           }
        };
        
        fetData();
         
        }, []);

        return   <div className="">
         <main>
             <Navbar/>
             <Hero/>
         </main>
        
        </div>
         
        

            

      
    
}


export default Homepage;