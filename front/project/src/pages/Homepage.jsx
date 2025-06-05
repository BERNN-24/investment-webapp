import React, {useState, useEffect} from "react";
import Axios from "axios";


// COMPONENTS
import {Hero} from "../components/homeComponents/HeroSection";
import { Widget } from "../components/homeComponents/Widget";
import { HomeAbout } from "../components/homeComponents/Home_About";
import {Partners} from "../components/homeComponents/Partners.jsx";
import { CallToAction } from "../components/homeComponents/CallToAction";

import {Footer} from "../components/Footer";
import {Navbar} from "../components/Navbar";



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

        return   <div className="min-h-[screen]">
         <main className = "container" >
             <Navbar/>
             <Hero/>
             <HomeAbout/>
             <Widget/>
             <Partners/> 
             <CallToAction/>
             <Footer/>
         </main>
        
        </div> 
    
}


export default Homepage;