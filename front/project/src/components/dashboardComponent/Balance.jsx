import React, {useState} from "react";

export function Balance ({balance}){
    const [showBalance, setShowBalance] = useState(false);
    

    function handleClick (event){
    console.log("Button Clicked");
        setShowBalance(!showBalance);
    }


    return   <section className="bg-white p-6 rounded-2xl shadow-md border border-[#E2D6F3] max-w-xl w-full mb-6 mx-auto">
      {/* Dashboard Title */}
      <p className="text-sm text-[#6B7280] mb-2 tracking-wide">Dashboard</p>

      {/* Wallet Card */}
      <div className="bg-[#F9FAFB] p-5 rounded-xl shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1F2937] tracking-tight">
            Wallet Balance
          </h3>

          <button
            onClick={handleClick}
            className="px-4 py-1.5 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-[#7F00FF] to-[#E100FF] hover:from-[#5A00B3] hover:to-[#7F00FF] transition-transform duration-200 shadow-md active:scale-95"
          >
            {showBalance ? "Hide" : "Show"}
          </button>
        </div>

        <div>
          <p className="text-4xl font-extrabold text-[#7F00FF] tracking-wide select-none transition-opacity duration-300 ease-in-out">
            {showBalance ? `${balance}` : "••••••"}
          </p>
        </div>
      </div>
    </section>
}