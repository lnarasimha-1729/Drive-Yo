import React, { useState } from "react";
import AdminProfile from "../AdminProfile";

export default function Reports() {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");

  // Dropdown-style dates
  const [startDate, setStartDate] = useState("01 October 2025");
  const [endDate, setEndDate] = useState("01 October 2025");

  return (
    <div className="min-h-screen bg-gray-50 pl-12 p-3 sm:p-5 md:p-8 lg:py-8 md:px-6 lg:px-6 pb-24 md:pb-8">

      {/* Page Title */}
      <div className="flex items-end justify-between lg:mb-2">
        <p className="font-semibold text-[1.125rem] md:text-[1.25rem]">Reports</p>
        <AdminProfile />
      </div>
      <div className="border-b mt-2 mb-5 sm:mb-6" />

      {/* Main Card */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">

        {/* Heading */}
        <h2 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">
          Custom Report Builder
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-14 text-sm">

          {/* REPORT TYPE */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Report Type
            </label>

            <div className="border rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer shadow-sm">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-transparent outline-none text-sm sm:text-base"
              >
                <option>Select Report Type</option>
                <option>Sales Report</option>
                <option>Customer Report</option>
                <option>Vehicle Report</option>
                <option>Dealer Report</option>
              </select>
            </div>
          </div>

          {/* DATE RANGE */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Date Range
            </label>

            <div className="border rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer shadow-sm">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-transparent outline-none text-sm sm:text-base"
              >
                <option>Select Date Range</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>Custom Range</option>
              </select>
            </div>

            {/* DATE PICKERS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">

              {/* Start Date */}
              <div className="border px-4 py-2 rounded-lg shadow-sm w-full cursor-pointer">
                <select
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm sm:text-base"
                >
                  <option>01 October 2025</option>
                  <option>02 October 2025</option>
                  <option>03 October 2025</option>
                </select>
              </div>

              {/* End Date */}
              <div className="border px-4 py-2 rounded-lg shadow-sm w-full cursor-pointer">
                <select
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm sm:text-base"
                >
                  <option>01 October 2025</option>
                  <option>02 October 2025</option>
                  <option>03 October 2025</option>
                </select>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
