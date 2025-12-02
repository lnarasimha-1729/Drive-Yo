import React from 'react'

export default function SidebarItem({ label }) {
  return (
    <button className="text-black/70 text-sm text-left w-[90%] min-h-8 px-3 py-2 rounded-lg hover:bg-gray-100 overflow-hidden text-nowrap cursor-pointer">
      {label}
    </button>
  );
}