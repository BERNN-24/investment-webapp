import React from "react"; 

export function Hero() {
  return (
    <section className="w-full bg-gradient-to-br from-[#7F00FF] to-[#E100FF] px-6 py-12 md:py-20 text-white">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
    {/* Left Content */}
    <div className="text-left space-y-6">
      <h2 className="text-4xl md:text-5xl font-bold text-white">
        Grow Your Wealth With Confidence.
      </h2>
      <p className="text-lg text-purple-100">
        Smart, secure, and personalized investment solutions tailored to your goals—whether you're just starting out or building a legacy.
      </p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <span className="text-purple-200 text-sm">Start Investing... Click here</span>
        <button className="px-6 py-3 border border-white bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition">
          Register
        </button>
      </div>
    </div>

    {/* Right Content (Image Placeholder) */}
    <div className="flex justify-center items-center bg-white/10 h-64 md:h-full rounded-xl border border-white/20">
      <span className="text-purple-200 text-lg">IMAGE SECTION</span>
    </div>
  </div>
</section>

  );
}



