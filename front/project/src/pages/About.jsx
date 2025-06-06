import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import {useSearchParams} from "react-router-dom";
import { CallToAction } from "../components/homeComponents/CallToAction";

import {Footer} from "../components/Footer";
// about info
import {crypto, forex , stock , about} from "../components/aboutDetails/Details";

function About(){
    const [searchParams] = useSearchParams();

    const info = searchParams.get("info");

    const [content, setContent] = useState(null);

     const detailArray =[{name:"crypto", content :crypto},{name:"forex", content : forex}, {name:"stock", content :stock}]

    useEffect(()=>{
        if(!info) {
            setContent(about)
             return };
        const result = detailArray.find((item)=> item.name == info.toLowerCase());
        if (!result){
             setContent(<p>No Content found.</p>)
            }
        else {
             setContent(result.content);
        }
       
    },[info]);



    return <div className="min-h-[screen]">
        <Navbar/>
        {info ? 
        <h1> About {info}</h1> 
        : 
         <h2>Welcome to Perennial Welfare Site</h2>
        }
        <div>
            {content}
        </div>
        <CallToAction/>
        <Footer/>
    </div>
}

export default About;