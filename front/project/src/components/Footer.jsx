import React from "react";

function Footer(){
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
    return <div className="lg:pt-16 text-center sm:pt-10">
      <div className="lg:flex lg:w-2/3 lg:justify-center lg:bg-cyan-100 lg:ml-36 lg:pt-8 lg:pb-8">
        <p className="lg:inline-block ml-8 mr-8 sm:block-inline sm:mt-8 sm:mb-7">Instagram</p>
        <p className='lg:inline-block ml-8 mr-8 sm:block-inline sm:mt-8 sm:mb-7'>Twitter</p>   
        <p className='lg:inline-block ml-8 mr-8 sm:block-inline sm:mt-8 sm:mb-7'>Facebook</p>
      </div>
      <div className="mt-10 text-3xl">
      <p>Copyright @ {todaysDate}</p>
      </div>
       
        
    </div>

}

export default Footer;