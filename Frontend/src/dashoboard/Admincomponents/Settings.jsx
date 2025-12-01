import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-w-full min-h-screen bg-[#fafafa]">

      <Navbar/>

      {/* Breadcrumb */}
      <div className="px-8 pb-8">
      <div className="flex items-center gap-2 mb-6 px-6">
        <span
          onClick={() => navigate("/admin/dashboard")}
          className="text-sm text-blue-600 font-medium cursor-pointer"
        >
          Dashboard
        </span>

        <span className="text-gray-400">›</span>

        <span className="text-sm text-gray-800 font-medium">Settings</span>
      </div>

      {/* Title */}
      <div className="px-8">
      <div className="flex items-center gap-2 mb-2">
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/settings--v1.png"
          className="w-6 h-6"
        />
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      {/* MAIN CONTAINER */}
      <div className="bg-white rounded-2xl shadow py-6 px-24 w-full min-w-6xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">

          {/* PASSWORD SECTION */}
          <div className="rounded-2xl p-8 shadow-sm lg:w-2/5">
            <h2 className="text-lg font-semibold mb-2">Password</h2>
            <p className="text-gray-600 text-sm mb-6">
              Change your password regularly to keep your account secure.
            </p>

            {/* Current Password */}
            <div className="mb-2">
              <label className="text-sm font-medium">Current Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full mt-1 px-4 py-1.5 border rounded-sm text-sm"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="mb-2">
              <label className="text-sm font-medium">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full mt-1 px-4 py-1.5 border rounded-sm text-sm"
                />
              </div>
            </div>

            {/* Re-enter Password */}
            <div className="mb-6">
              <label className="text-sm font-medium">Re-enter New Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Re-enter New Password"
                  className="w-full mt-1 px-4 py-1.5 border rounded-sm text-sm"
                />
              </div>
            </div>

            <button className="flex items-center gap-2 px-2 py-2 border-1 border-blue-600 text-blue-600 rounded-lg text-xs font-medium">
              <img className="w-4" src="https://img.icons8.com/forma-regular-filled-sharp/96/2563eb/key-security.png" alt="key-security"/>
              Change Password
            </button>
          </div>

          {/* LOGIN HISTORY SECTION */}
          <div className="rounded-2xl p-8 shadow-sm h-fit lg:w-2/5">
            <h2 className="text-lg font-semibold mb-2">Login History</h2>
            <p className="text-gray-600 text-sm mb-6">
              Review your recent login activity and devices that have accessed your account.
            </p>

            <div className="border rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Admin user</p>
                  <p className="text-sm text-gray-500">Windows 10</p>
                </div>

                <p className="text-sm text-gray-600">Oct 28, 2025</p>
              </div>
            </div>

            <button className="mt-6 flex items-center gap-2 px-2 py-1 border-1 border-blue-600 text-blue-600 rounded-lg text-xs font-medium">
              <img className="w-6" src="https://img.icons8.com/sf-regular/96/2563eb/time-machine.png" alt="time-machine"/>View History
            </button>
          </div>

        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Settings;
