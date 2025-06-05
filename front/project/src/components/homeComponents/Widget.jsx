import React, {useState, useEffect } from "react";
import {useCountUp} from "react-countup";
import {motion} from "motion/react";

export function Widget (){
    const [finalText, showFinalText] = useState(false);
   
    useEffect(()=>{
        const timer = setTimeout(()=>{
            showFinalText(true);
        }, 4000);
        return ()=> clearTimeout(timer);
    },[]); 

    useCountUp({
        ref : 'counterRef',
        start: 1 ,
        end : finalText ? 3 : 2490,
        suffix : finalText && "K" ,
        duration :finalText? 1.2 : 2.5,
        
        scrollSpyDelay: 800, 
    });

    const widgetTextVariant = {
        hidden: {
            y : "-100vw",
        },
        animate : {
            y: 0,
            transition: {
                delay : 0.5,
                type : "spring",
                stiffness : 60,

            }
        }
    }
    const parentDiv = {
        hidden : {
            opacity : 0,
        },
        animate : {
            opacity : 1,
            transition : {
                duration : 0.5,
                ease : "easeIn",
                when : 'beforeChildren',
            } 
        }
        }

      return (
    <motion.div
  variants={parentDiv}
  initial="hidden"
  animate="animate"
  className="w-full py-16 px-4 bg-gradient-to-br from-[#F9FAFB] to-[#EDE9F3] text-center">
  
  <motion.h3
    variants={widgetTextVariant}
    className="text-3xl md:text-5xl font-bold text-[#5A00B3]"
  >
    Over <span id="counterRef" className="text-[#7F00FF]" /> trusted users
    around the world.
  </motion.h3>
</motion.div>

  );
}