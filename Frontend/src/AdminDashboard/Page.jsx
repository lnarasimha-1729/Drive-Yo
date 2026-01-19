import React, { useState } from "react";
import { Route, Routes, NavLink, Navigate, useLocation } from "react-router-dom";
import {
  LayoutDashboardIcon,
  User,
  Store,
  File,
  FileTextIcon,
  CarFrontIcon,
} from "lucide-react";

import Dashboard from "./DashboardTabs/Dashboard";
import Vehicles from "./DashboardTabs/Vehicles";
import Customers from "./DashboardTabs/Customers";
import Dealers from "./DashboardTabs/Dealers";
import Quotations from "./DashboardTabs/Quotations";
import Locations from "./DashboardTabs/Locations";
import Reports from "./DashboardTabs/Reports";
import Settings from "./DashboardTabs/Settings";
import Profile from "./DashboardTabs/Profile";
import Brokers from "./DashboardTabs/Brokers";

const Page = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const hideSidebar =
    location.pathname.includes("/admin/profile") ||
    location.pathname.includes("/admin/settings");

  return (
    <div className="h-screen flex overflow-hidden">

      {/* MOBILE MENU BUTTON */}
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

      {/* SIDEBAR */}
      {!hideSidebar && (
        <aside
  className={`
    fixed top-0 left-0 z-50
    h-screen w-50 sm:w-50 md:w-56 lg:w-60 xl:w-64
    bg-gradient-to-b from-[#4A6CC8] to-blue-900 text-white
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

          {/* NAV */}
          <nav className="flex flex-col px-4 pt-6 gap-2">
            {[
              { to: "dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
              { to: "customers", label: "Customers", icon: User },
              { to: "dealers", label: "Dealers", icon: Store },
              { to: "brokers", label: "Brokers", icon: User },
              { to: "quotations", label: "Quotations", icon: File },
              { to: "vehicles", label: "Vehicles", icon: CarFrontIcon },
              { to: "reports", label: "Reports", icon: FileTextIcon },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={`/admin/${item.to}`}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg
                  transition
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

      {/* BACKDROP */}
      {!hideSidebar && open && (
  <div
    className="fixed inset-0 bg-black/40 z-40 md:hidden"
    onClick={() => setOpen(false)}
  />
)}

      

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-gray-50 overflow-auto">
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="customers" element={<Customers />} />
          <Route path="dealers" element={<Dealers />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="locations" element={<Locations />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="brokers" element={<Brokers />} />
        </Routes>
      </main>
    </div>
  );
};

export default Page;
