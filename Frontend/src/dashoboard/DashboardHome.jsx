import React, { useState } from 'react';
import { Route, Routes, NavLink, Navigate, useLocation } from 'react-router-dom';

import Dashboard from './Admincomponents/Dashboard';
import Vehicles from './Admincomponents/Vehicles';
import Customers from './Admincomponents/Customers';
import Dealers from './Admincomponents/Dealers';
import Quotations from './Admincomponents/Quotations';
import Locations from './Admincomponents/Locations';
import Reports from './Admincomponents/Reports';
import Settings from './Admincomponents/Settings';
import Profile from './Admincomponents/Profile';

const DashboardHome = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const hideSidebar =
    location.pathname.includes("/admin/profile") ||
    location.pathname.includes("/admin/settings");

  return (
    <div className="w-full h-screen flex">

      {/* MOBILE MENU BUTTON */}
      {!hideSidebar && (
        <button
          className="md:hidden fixed top-0 left-0 z-50 p-2 bg-blue-900 text-white rounded"
          onClick={() => setOpen(!open)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5" />
          </svg>
        </button>
      )}

      {/* SIDEBAR */}
      {!hideSidebar && (
        <aside
          className={`
            fixed md:static top-0 left-0 w-2/4 h-full z-40 w-2/3
            bg-gradient-to-b from-blue-800 to-blue-950 text-white
            transition-all duration-300 ease-in-out
            flex flex-col
            ${open ? "w-64" : "w-0 md:w-64"}
            overflow-hidden
          `}
        >

          {/* BRAND HEADER */}
          <div className="w-full border-b border-blue-400 py-6 text-center text-2xl font-semibold">
            Drive Yo
          </div>

          {/* MENU ITEMS */}
          <nav className="flex flex-col px-4 pt-6 lg:pl-14 gap-2 w-full">

            {[
              { to: "dashboard", label: "Dashboard", icon: "https://img.icons8.com/material-rounded/24/FFFFFF/dashboard-layout.png" },
              { to: "vehicles", label: "Vehicles", icon: "https://img.icons8.com/sf-regular/48/FFFFFF/car.png" },
              { to: "customers", label: "Customers", icon: "https://img.icons8.com/pastel-glyph/64/FFFFFF/gender-neutral-user.png" },
              { to: "dealers", label: "Dealers", icon: "https://img.icons8.com/ios/50/FFFFFF/supplier.png" },
              { to: "quotations", label: "Quotations", icon: "https://img.icons8.com/ios/50/FFFFFF/google-docs.png" },
              { to: "locations", label: "Locations", icon: "https://img.icons8.com/ios/50/FFFFFF/marker--v1.png" },
              { to: "reports", label: "Reports", icon: "https://img.icons8.com/ios/50/FFFFFF/graph-report.png" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={`/admin/${item.to}`}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 px-3 py-2 rounded-lg
                  transition-all duration-200
                  ${isActive
                    ? "bg-blue-700 font-semibold"
                    : "opacity-80 hover:bg-blue-800"}
                  `
                }
              >
                <img src={item.icon} alt="" className="w-5" />
                {item.label}
              </NavLink>
            ))}

          </nav>
        </aside>
      )}

      {/* MOBILE BACKDROP */}
      {!hideSidebar && open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto bg-gray-50">
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
        </Routes>
      </main>
    </div>
  );
};

export default DashboardHome;
