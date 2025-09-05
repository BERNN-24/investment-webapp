import React from "react";
import {motion} from "motion/react"
import { useNavigate } from "react-router-dom";

const layoutVariant = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 20px rgba(127,0,255,0.6)", // your purple-magenta glow
    originX: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export function DashboardLayout({ icon, layout, navigation, color }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="mx-auto rounded-3xl my-10 md:py-10 md:w-4/6 grid justify-center items-center aspect-square bg-white shadow-md cursor-pointer hover:shadow-xl transition"
      onClick={(event) => {
        event.preventDefault();
         navigate(`/dashboard/admin/${navigation}`)}}
      variants={layoutVariant}
      whileHover="hover"
      transition="transition"
    >
      <div className="mx-auto">
        {/* Icon with gradient background */}
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-md ${color}`}
        >
          {icon}
        </div>
      </div>
      <div className="text-2xl font-semibold text-gray-800 mt-6">{layout}</div>
    </motion.div>
  );
}
