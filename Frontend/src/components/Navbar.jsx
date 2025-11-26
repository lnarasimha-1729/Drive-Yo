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

        <span className="text-lg sm:text-xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
          DriveYo
        </span>
      </div>

      <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
        <button onClick={() => navigate("/")} className="px-5 py-1.5 bg-gray-100 rounded-full text-sm font-medium">Chat</button>
        <button onClick={() => navigate("/yo")} className="px-5 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 cursor-pointer">Yo Negotiator</button>
      </div>

      <div className="flex-1 flex justify-end items-center gap-1 sm:gap-4">
        <button onClick={() => navigate("/admin")} className="bg-black px-4 py-1.5 rounded-full text-white text-sm cursor-pointer">Admin</button>
        <button className="text-sm text-white bg-black px-4 py-1.5 rounded-full cursor-pointer">Login</button>
        <button className="text-sm border-2 px-2 py-1 rounded-full text-nowrap cursor-pointer">Sign Up</button>
      </div>
    </nav>
  );
}
