import React from "react";
import { Link } from "react-router-dom";

export function CallToAction() {
  return (
 <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-r from-[#7F00FF] to-[#E100FF] rounded-lg text-center text-white shadow-lg">
  <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Ready To Invest?</h2>
  <p className="mb-2 text-base sm:text-lg max-w-xl mx-auto">
    Build your wealth today! Click the button below to sign up now for personalized portfolios and exclusive market and trade updates.
  </p>
  <p className="mb-8 text-base sm:text-lg font-semibold">
    Take care of your financial future!
  </p>
  <div>
   
    <button className="w-full sm:w-auto bg-white text-[#7F00FF] font-bold py-3 px-8 rounded-md shadow-md hover:bg-purple-100 transition duration-300">
      <Link to="/signup" className="inline-block"> Sign Up</Link>
    </button>
   
  </div>
</div>

  );
}
