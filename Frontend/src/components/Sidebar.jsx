import React from "react";
import { FiPlus } from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`
        fixed md:static top-0 left-0 h-full
        bg-white p-4 py-8 shadow-md z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      
      <NavLink to={"/"} className="flex items-center gap-2 w-[90%] px-3 py-2 mb-6 bg-black text-white rounded-lg text-sm">
        <FiPlus /> New Chat
      </NavLink>

      <div className="flex flex-col gap-3">
        <SidebarItem label="BMW 330i Quote Validation" />
        <SidebarItem label="Audi Q5 Quote Validation" />
        <SidebarItem label="Audi A4 Quote Validation" />
      </div>

      <div className="text-sm mt-68 bg-gray-400 w-fit px-4 py-1 rounded-md text-white">
        logout
      </div>
    </aside>
  );
}
