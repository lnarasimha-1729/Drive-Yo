import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({ isOpen, closeSidebar }) {
  // DESKTOP collapse state
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        fixed md:static top-0 left-0 h-full 
        bg-white shadow-sm z-60 pl-2 py-4 lg:py-8 
        transform transition-all duration-300 mt-14 lg:mt-9

        /* WIDTH CONTROL */
        ${collapsed ? "lg:w-[70px]" : "lg:w-[220px]"}
        md:w-[220px]

        /* MOBILE OPEN/CLOSE */
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >

      {/* ⭐ Desktop Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          hidden lg:flex 
          absolute top-4 -right-4
          bg-gray-200 hover:bg-gray-300 
          w-7 h-7 rounded-full shadow 
          items-center justify-center
          transition cursor-e-resize
        "
      >
        {collapsed ? 
        <div className="relative group">
        <ChevronRight size={18} />

        <span className="
    absolute left-1/2 translate-x-1/3 top-0 
    bg-black text-white text-xs px-2 py-1 rounded 
    opacity-0 group-hover:opacity-100 
    transition-all
  ">
    Open Sidebar
  </span>
        </div> : 
        <div className="relative group">
        <ChevronLeft size={18} />

        <span className="
    absolute left-1/2 -translate-x-1/2 -top-12 
    bg-black text-white text-xs px-2 py-1 rounded 
    opacity-0 group-hover:opacity-100 
    transition-all
  ">
    Close Sidebar
  </span>
        </div>}
      </button>

      {/* Close on mobile */}
      <div className="md:hidden text-end mb-4">
        <button onClick={closeSidebar} className="text-lg">✕</button>
      </div>

      {/* New Chat */}
      <NavLink
        to="/"
        onClick={closeSidebar}
        className={`
          flex items-center gap-2 px-3 py-2 mb-2
          bg-black text-white rounded-lg text-sm w-[80%]
          transition-all
        `}
      >
        <FiPlus />
        {!collapsed && "New Chat"}
      </NavLink>

      {/* Sidebar Items */}
      {!collapsed && (
        <>
        <div className="pl-3 mb-2 text-black">Chats</div>
      <div className="flex flex-col gap-3 overflow-y-scroll h-[75%]">
        <SidebarItem label={!collapsed ? "BMW 330i Quote Validation" : ""} collapsed={collapsed} />
        <SidebarItem label={!collapsed ? "Audi Q5 Quote Validation" : ""} collapsed={collapsed} />
        <SidebarItem label={!collapsed ? "Audi A4 Quote Validation" : ""} collapsed={collapsed} />
        <SidebarItem label={!collapsed ? "BMW 330i Quote Validation" : ""} collapsed={collapsed} />
        <SidebarItem label={!collapsed ? "Audi Q5 Quote Validation" : ""} collapsed={collapsed} />
        <SidebarItem label={!collapsed ? "Audi A4 Quote Validation" : ""} collapsed={collapsed} />
        <SidebarItem label={!collapsed ? "BMW 330i Quote Validation" : ""} collapsed={collapsed} />
        <SidebarItem label={!collapsed ? "Audi Q5 Quote Validation" : ""} collapsed={collapsed} />
        <SidebarItem label={!collapsed ? "Audi A4 Quote Validation" : ""} collapsed={collapsed} />
        <SidebarItem label={!collapsed ? "BMW 330i Quote Validation" : ""} collapsed={collapsed} />
        <SidebarItem label={!collapsed ? "Audi Q5 Quote Validation" : ""} collapsed={collapsed} />
        <SidebarItem label={!collapsed ? "Audi A4 Quote Validation" : ""} collapsed={collapsed} />
      </div>
      </>
      )}

      {/* Bottom Buttons */}
      <div className="absolute bottom-10 left-4 w-full pr-4">

        {/* YO NEGOTIATOR - Mobile only */}
        <button
          onClick={() => {
            closeSidebar();
            window.location.href = "/yo";
          }}
          className="lg:hidden text-xs w-[75%] bg-[#D4AF37] text-white py-2 rounded-lg mb-8 font-medium shadow-md active:scale-95 cursor-pointer"
        >
          Yo Negotiator
        </button>
      </div>
    </aside>
  );
}
