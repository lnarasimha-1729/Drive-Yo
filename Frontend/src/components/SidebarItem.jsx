import React from 'react'

export default function SidebarItem({ label }) {
  return (
    <button className="text-gray-500 text-left w-[90%] min-h-8 px-3 py-2 rounded-lg text-xs hover:bg-gray-100 overflow-hidden text-nowrap cursor-pointer">
      {label}
    </button>
  );
}