import React, { useState } from "react";
import { Route, Routes, NavLink, Navigate, useLocation } from "react-router-dom";
import { LayoutDashboardIcon, File } from "lucide-react";

import Dashboard from "./DashboardTabs/DealerDashboard";
import Quotation from "./DashboardTabs/DealerQuotation";
import DealerProfile from "./DealerProfile";
import Profile from "./DashboardTabs/Profile";
import Settings from "./DashboardTabs/Settings";

const DealerPage = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const hideSidebar =
    location.pathname.includes("/dealer/profile") ||
    location.pathname.includes("/dealer/settings");

  return (
    <div className="h-screen flex overflow-hidden">

      {/* ✅ COLLAPSED MOBILE STRIP */}
      {!hideSidebar && (
        <div className="md:hidden fixed top-0 left-0 h-screen w-10 bg-blue-900 z-40 pl-3 pt-5">
          <button
            className="text-white text-2xl"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      )}

      {/* ✅ FULL SIDEBAR */}
      {!hideSidebar && (
        <aside
          className={`
            fixed top-0 left-0 z-50
            h-screen w-50 sm:w-50 md:w-56 lg:w-60 xl:w-64
            bg-gradient-to-b from-[#4A6CC8] to-[#4A6DC9] text-white
            transform transition-transform duration-300 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full"}
            md:static md:translate-x-0
            flex flex-col
          `}
        >
          {/* BRAND */}
          <div className="border-b border-blue-400 py-6 text-center text-2xl font-semibold">
            Drive Yo
          </div>

          {/* MENU */}
          <nav className="flex-1 overflow-y-auto px-4 pt-6 gap-2 flex flex-col">
            {[
              { to: "dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
              { to: "quotation", label: "Quotations", icon: File },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={`/dealer/${item.to}`}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition
                  ${isActive
                    ? "bg-[#4C6CE9] font-semibold"
                    : "opacity-80 hover:bg-blue-800"}`
                }
              >
                <item.icon className="w-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
      )}

      {/* ✅ BACKDROP (MOBILE) */}
      {!hideSidebar && open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ✅ MAIN CONTENT (OFFSET FOR STRIP) */}
      <main className="flex-1 bg-gray-50 overflow-auto ml-0 md:ml-0 lg:ml-0 xl:ml-0">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quotation" element={<Quotation />} />
          <Route path="profile" element={<Profile/>}/>
          <Route path="settings" element={<Settings/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default DealerPage;
