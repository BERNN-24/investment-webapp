import React, {useState} from "react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";

const navVariant = {
   hidden : {
      y: "-250",
   },
   visible : {
      y : "0",
      transition: {
         delay:"1.5",
         duration:"1.5",
         type: "spring",
         stiffness : "120",
      }
   }

}

function Navbar(){
   const [toggle, setToggleutton] = useState(false)

   function handleClick(e){
      setToggleutton(!toggle);
   }
    return  <motion.nav className="bg-blue-900 flex relative"
    variants={navVariant}
    initial = 'hidden'
    animate = 'visible'>
    <div className="w-2/5">
       <span>Website</span>
    </div>
    <div className={`${toggle? "absolute top-3 left-0 flex flex-row":"hidden" }md:w-3/5 md:justify-end`}>
    <button className="block md:hidden" onClick={handleClick}> {toggle? "show": "hide"}</button>
    <ul className="lg:flex justify-end sm:text-center sm:justify-items-end sm:mr-8">
    <li className="lg:p-8  sm:mt-4 sm:mb-4 sm:text-left">
      
       <Link to="/about">About </Link>
    </li> 
    <li className="lg:p-8  sm:mt-4 sm:mb-4 sm:text-left">
       <Link to="/contact">Contact</Link>
    </li>
    <li className="lg:p-8 sm:mt-4 sm:mb-4 sm:text-left">
       <Link to="/login">LOGIN </Link>
    </li>
    </ul>
    </div>
   
   
 </motion.nav>;
}

export default Navbar;