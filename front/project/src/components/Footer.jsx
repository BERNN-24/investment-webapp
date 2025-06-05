import React from "react";

export function Footer(){
    var date = new Date();

   var todaysDate = function () {
     var today = {
        day: date.getDate(),
        month : date.getMonth() + 1,
        year: date.getFullYear(),
     }
        
     return today.day +'/'+today.month+'/'+ today.year;
}
  ();
    return <div className="lg:pt-16 text-center sm:pt-10 bg-gradient-to-t from-[#F3E8FF] to-[#FCF7FF] text-[#4C1D95]">
  <div className="lg:flex lg:w-2/3 lg:justify-center lg:bg-[#E9D5FF] lg:ml-36 lg:pt-8 lg:pb-8 rounded-xl">
    <p className="lg:inline-block ml-8 mr-8 sm:block-inline sm:mt-8 sm:mb-7 hover:text-[#7F00FF] transition">Instagram</p>
    <p className="lg:inline-block ml-8 mr-8 sm:block-inline sm:mt-8 sm:mb-7 hover:text-[#7F00FF] transition">Twitter</p>   
    <p className="lg:inline-block ml-8 mr-8 sm:block-inline sm:mt-8 sm:mb-7 hover:text-[#7F00FF] transition">Facebook</p>
  </div>
  <div className="mt-10 text-3xl text-[#5B21B6]">
    <p>Copyright © {todaysDate}</p>
  </div>
</div>

}

export default Footer;