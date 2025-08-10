import React from "react";
import { Link } from "react-router-dom";
import {motion} from "motion/react";

const navVariant = {
   hidden : {
      opacity : 0,
   },
   visible : {
      opacity : 1,
      transition: {
         ease : "easeIn",
         delay:"2",
         duration:"1.5",
      }
   }

}

export function Navbar(){

    return  <motion.nav className="flex my-3 border rounded-3xl"
    variants={navVariant}
    initial = 'hidden'
    animate = 'visible'>
    <div className="w-2/5">
       <span>Website</span>
    </div>
    <div className="flex justify-between items-center w-3/5">
    <li className="border-b-2 hover:border-y-2 hover:bg-amber-50">
       <Link to="/about">About </Link>
    </li> 
    <li className="">
      <button className = "p-4 border text-center hover:bg-amber-50">
         <Link to="/login">LOGIN </Link>
      </button>  
    </li>
    </div>
   
   
 </motion.nav>;


}

export default Navbar;