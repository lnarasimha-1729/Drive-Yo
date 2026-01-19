// Navbar.jsx (you already provided this - keep it)
import React from "react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white flex items-center px-4 sm:px-8 py-3 shadow-xs">
      <div className="flex items-center gap-3 flex-1">
        <button onClick={toggleSidebar} className="text-2xl text-gray-700 md:hidden">
          <FiMenu />
        </button>

        <span className="flex gap-1 items-center text-lg sm:text-xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
          <img className="hidden md:block lg:block w-6 h-6" src="/logo.png" ></img>
          <p>DriveYo</p>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-4 flex-1 justify-start">
        <button onClick={() => navigate("/")} className="px-5 py-1.5 bg-gray-100 rounded-full text-sm font-medium">New Lease Verification</button>
        <button onClick={() => navigate("/yo-premium")} className="px-5 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 cursor-pointer">Yo Negotiator</button>
      </div>

      <div className="flex items-center gap-3">
  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
    💳 60 Credits
  </span>

  <button onClick={()=>navigate("/login")} className="px-4 py-2 rounded-full bg-black text-white text-sm">
    Login
  </button>
</div>

    </nav>
  );
}
