import React from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-white w-full py-1.5 sm:py-1.5 md:py-4 lg:py-4 xl:py-4 border-b border-gray-300 flex items-center px-2 md:px-8">

      {/* LEFT: Hamburger (Mobile only) */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
      >
        <Menu size={22} />
      </button>

      {/* LOGO */}
      <button onClick={()=>navigate("/dealer/quotation")} className="flex items-center gap-2 cursor-pointer">
        <img className="hidden lg:block w-6 h-6" src="/logo.png" alt="logo" />
        <p className="font-semibold text-lg">Drive Yo</p>
      </button>
    </div>
  );
};

export default Navbar;
