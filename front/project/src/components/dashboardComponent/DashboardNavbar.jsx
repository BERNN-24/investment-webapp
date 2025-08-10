import React from "react";

export function DashboardNavbar ({avatar, username}) {
    return (
        <header className="flex items-center justify-between bg-white py-4 px-6 rounded-2xl shadow-md border border-[#E2D6F3] mb-4">
      {/* Avatar */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#D6B4FC] flex items-center justify-center text-sm font-bold text-[#7F00FF] border-2 border-[#E2D6F3] shadow">
          {avatar?.[0]?.toUpperCase() ?? "U"}
        </div>
        <div className="text-[#1F2937] font-semibold text-lg">
          Welcome, <span className="text-[#7F00FF]">{username}</span>
        </div>
      </div>

      {/* Logout */}
      <button className="bg-gradient-to-r from-[#7F00FF] to-[#E100FF] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5A00B3] transition-all shadow-md">
        Logout
      </button>
    </header>
  
    )
}