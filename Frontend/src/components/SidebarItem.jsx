import React from 'react'

export default function SidebarItem({ label }) {
  return (
    <button className="text-gray-500 text-left w-[90%] px-3 py-2 border rounded-lg text-xs hover:bg-gray-100">
      {label}
    </button>
  );
}


