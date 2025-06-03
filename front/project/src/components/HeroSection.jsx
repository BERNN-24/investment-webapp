import React from "react";

export function Hero(){
    return (
        <div className = "min-h-[100px] w-full md:grid md:grid-cols-2 ">
            <div className="h-full">
                <div>
                     <h2>Grow Your Wealth With Confidence.</h2>
                    <p>Smart,secure and personalized investment solutions tailored to your goals-whether you're just starting out or building a Legacy.</p>
                    <div className ="inline">
                        <span>Start Investing...Click here</span>
                        <button>Register</button>
                    </div>
                </div>
            </div>
            <div className="h-full object-cover">
                <h2>IMAGE SECTION</h2>
            </div>
        
            </div>
    )
}
