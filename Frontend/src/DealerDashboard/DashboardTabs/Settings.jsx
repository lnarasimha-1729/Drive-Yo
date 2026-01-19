import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, History, KeyRound, SettingsIcon } from "lucide-react";
import DealerNavbar from "../DealerNavbar";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafafa]">

      <DealerNavbar/>

      {/* Breadcrumb */}
      <div className="mx-auto pt-4 pb-8 max-w-[80rem] px-4 md:px-8">
      <div className="flex items-center gap-0 mb-6">
        <span
          onClick={() => navigate("/dealer/dashboard")}
          className="text-sm md:text-lg lg:text-base text-blue-600 font-medium cursor-pointer"
        >
          Dashboard
        </span>

        <ChevronRight className="w-4"/>

        <span className="text-sm md:text-md lg:text-base text-gray-800 font-medium">Settings</span>
      </div>

      {/* Title */}
      <div className="">
      <div className="flex items-center gap-2 mb-0 md:mb-2 text-sm md:text-lg lg:text-md">
        <SettingsIcon/>
        <h1 className="text-[1rem] md:text-[1.15rem] lg:text-[1.15rem] font-semibold">Settings</h1>
      </div>

      {/* MAIN CONTAINER */}
      <div className="md:bg-white rounded-2xl md:shadow py-6 px-0 md:px-24 lg:px-24 xl:px-24 w-full mx-auto">

        <div className="flex flex-col lg:flex-row lg:justify-center gap-4">

          {/* PASSWORD SECTION */}
          <div className="bg-white rounded-2xl p-8 shadow-sm lg:w-2/5">
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

            <button className="flex items-center gap-2 px-2 py-2 border-1 border-blue-600 text-blue-600 rounded-lg text-[0.875rem] font-medium">
              <KeyRound className="w-4"/>
              Change Password
            </button>
          </div>

          {/* LOGIN HISTORY SECTION */}
          <div className="bg-white rounded-2xl p-8 shadow-sm h-fit lg:w-2/5">
            <h2 className="text-lg font-semibold mb-2">Login History</h2>
            <p className="text-gray-600 text-sm mb-6">
              Review your recent login activity and devices that have accessed your account.
            </p>

            <div className="border rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Dealer user</p>
                  <p className="text-sm text-gray-500">Windows 10</p>
                </div>

                <p className="text-sm text-gray-600">Oct 28, 2025</p>
              </div>
            </div>

            <button className="mt-6 flex items-center gap-2 px-2 py-1 border-1 border-blue-600 text-blue-600 rounded-lg text-[0.875rem] font-medium">
             <History className="w-5"/>View History
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
