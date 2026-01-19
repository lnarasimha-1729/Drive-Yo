// Layout.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* MAIN SECTION */}
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
