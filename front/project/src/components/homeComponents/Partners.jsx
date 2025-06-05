import React from "react";
import {motion} from "motion/react";
import commodity from "../../assets/commodity.png";
import finra from "../../assets/finra.png";
import jpMorgan from "../../assets/jpMorgan.png";
import sec from "../../assets/sec.png";
import cfpc from "../../assets/cfpc.png";

const mPath = {
  y : [100,-50,50,-100],
  x: [0,-30,30,0],
}
const transition = {
  duration : 5,
  repeat : Infinity,
  ease: 'easeInOut'
}

  export function Partners (){

    const images = [ {src:sec, name : "SEC"} , {src: jpMorgan, name : "JpMorgan"},{src : finra, name : "FINRA"} , {src:cfpc, name: "CFCP"}, {src:commodity, name: "COMMODITY TRADING"} ]

     return (
    <div className="bg-gradient-to-br from-[#F3E8FF] to-[#FDF4FF] py-12">
  <h2 className="text-2xl md:text-4xl font-semibold text-center text-[#5A00B3] mb-10">
    Our Trusted Partners
  </h2>
  <div className="relative flex justify-center gap-6 flex-wrap">
    {images.map((item, index) => (
      <div
        key={index}
        className="relative w-[120px] h-[80px] flex flex-col items-center"
      >
        <motion.img
          src={item.src}
          alt={`partner-${item.name}`}
          className="w-full h-full object-contain"
          animate={mPath}
          transition={{ ...transition, delay: index * 0.5 }}
        />
        <span className="text-sm text-[#6B21A8] mt-2 text-center">
          {item.name}
        </span>
      </div>
    ))}
  </div>
</div>

  );
  }