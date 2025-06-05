import React from "react";
import { useNavigate } from "react-router-dom";
import {motion} from "motion/react";
// IMAGE IMPORTS
import stock from "../../assets/stock.jpg";
import crypto from "../../assets/crypto.png";
import forex from "../../assets/forex.jpg";

const aboutVariant = {
  hover: {
    scale: 1.05,
    originX: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const parentVariant = {
  hidden: {
    opacity: 0.2,
  },
  visible: {
    opacity: 1,
    transition: {
      ease: "linear",
      duration: 1,
      staggerChildren: 0.2,
    },
  },
}

export function HomeAbout (){

    const Navigate = useNavigate();
    const aboutImages = [{src:stock , name: "Stock"} ,{src:crypto , name : "Crypto"},{src : forex, name: "Forex"}]

    function handleClick (name){
        Navigate(`/about?info=${name}`);
    }

    return (
    <motion.div
      className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mx-auto w-4/5 py-10"
      variants={parentVariant}
      initial="hidden"
      animate="visible"
    >
      {aboutImages.map((item, index) => (
        <motion.div
          key={item.name}
          variants={aboutVariant}
          whileHover="hover"
          transition="transition"
          className={`relative bg-cover bg-center h-[300px] rounded-xl overflow-hidden shadow-lg`}
          style={{ backgroundImage: `url(${item.src})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-0" />
          <div className="relative z-10 p-4 text-white h-full flex flex-col justify-end">
            <h3 className="text-xl font-semibold mb-2">{item.name} Trading</h3>
            <p className="text-sm mb-4">
              Want to know more about {item.name} trading? Click the button below.
            </p>
            <button
              onClick={() => handleClick(item.name)}
              className="self-start bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
