import React from "react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate()
  return (
    <nav className="w-full bg-white flex items-center px-8 py-2">
      
      {/* LEFT — Burger (mobile) + DriveYo */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-700 md:hidden"
        >
          <FiMenu />
        </button>

        <span className="text-xl font-semibold">DriveYo</span>
      </div>

      {/* CENTER — Tabs */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button className="px-5 py-1.5 bg-gray-100 rounded-full text-sm font-medium cursor-pointer">
          chat
        </button>
        <button onClick={()=>navigate("/yo")} className="px-5 py-1.5 rounded-full text-sm font-medium cursor-pointer">
          Yo Negotiator
        </button>
      </div>

      {/* RIGHT — Profile + Credits */}
      <div className="flex-1 flex justify-end items-center gap-4">
          {/* Replace with user's uploaded image */}
          <button className="text-sm text-white bg-black px-4 py-1.5 rounded-full">Login</button>
          <button className="text-sm border-2 px-4 py-1 rounded-full">Sign Up</button>
      </div>

    </nav>
  );
}
