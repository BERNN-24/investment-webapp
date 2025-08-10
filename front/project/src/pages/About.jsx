import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import {useSearchParams} from "react-router-dom";
import Footer from "../components/Footer";
import { CallToAction } from "../components/homeComponents/CallToAction";

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



    return (<div>
        <Navbar/>
         <section className="bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white py-12 shadow-md text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide capitalize">
          {info ? `About ${info}` : "Welcome to Perennial Welfare Site"}
        </h1>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg space-y-6 prose prose-lg prose-purple max-w-none">
          {content}
        </div>
      </main>
        <CallToAction/>
        <Footer/>

    </div>)
}

export default About;



