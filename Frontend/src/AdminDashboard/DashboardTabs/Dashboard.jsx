import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Adminprofile from "../AdminProfile";
import { Car, CarFront, File, MapPin, Store } from "lucide-react";

export default function Dashboard() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = 2025;
  const currentMonth = "November";

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  return (
    <div className="min-h-screen bg-gray-50 pl-12 p-3 sm:p-5 md:p-8 lg:py-8 md:px-6 lg:px-6 pb-24 md:pb-8">

      {/* Heading */}
      <div className="flex items-end justify-between lg:mb-2">
        <p className="font-semibold text-[1.125rem] md:text-[1.25rem]">
          Dashboard
        </p>

        <Adminprofile />
      </div>
      <div className="border-b mt-2 mb-4 sm:mb-4"></div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 mb-4">

        {/* Card */}
        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">258</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base! lg:text-xs xl:text-lg">Total Dealers</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 flex items-center justify-center rounded-md">
            <Store className="text-white" />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">1423</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Total Quotations</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 flex items-center justify-center rounded-md">
            <File className="text-white" />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">854</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Vehicles Leased</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 flex items-center justify-center rounded-md">
            <CarFront className="text-white" />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">65</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Active Zip Codes</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 flex items-center justify-center rounded-md">
            <MapPin className="text-white" />
          </div>
        </div>

      </div>

      {/* Month Selector */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow flex flex-wrap 
                      items-center gap-2 sm:gap-4 mb-4">

        <button className="p-1.5 bg-[#4A6CC8] text-white rounded">
          <FiChevronLeft />
        </button>

        <p className="text-sm sm:text-md font-medium whitespace-nowrap">
          {selectedMonth} {selectedYear}
        </p>

        <button className="p-1.5 bg-[#4A6CC8] text-white rounded">
          <FiChevronRight />
        </button>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-1.5 border rounded text-sm"
        >
          {months.map((m) => <option key={m}>{m}</option>)}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-1.5 border rounded text-sm"
        >
          {[2024, 2025, 2026].map((yr) => (
            <option key={yr}>{yr}</option>
          ))}
        </select>
      </div>

      {/* Top Dealers + Top Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-[#4A6CC8] text-white px-4 py-2">
            <h2 className="font-semibold text-sm sm:text-md">Top Dealers</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[420px] sm:min-w-[450px]">
              <thead className="text-xs sm:text-sm">
                <tr className="border-b border-gray-400 text-gray-700">
                  <th className="p-3">Dealer Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Leases</th>
                </tr>
              </thead>
              <tbody className="text-sm sm:text-sm md:text-base! lg:text-sm!">
                <tr className="border-b border-gray-400">
                  <td className="p-3">Metro Motors</td>
                  <td className="p-3">Los Angeles, CA</td>
                  <td className="p-3">142</td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="p-3">Sunset Auto Group</td>
                  <td className="p-3">Miami, FL</td>
                  <td className="p-3">115</td>
                </tr>
                <tr>
                  <td className="p-3">Windy City Leasing</td>
                  <td className="p-3">Chicago, IL</td>
                  <td className="p-3">98</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-[#4A6CC8] text-white px-4 py-2">
            <h2 className="font-semibold text-sm sm:text-md">Top Vehicles</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[420px] sm:min-w-[450px]">
              <thead className="text-xs sm:text-sm">
                <tr className="border-b border-gray-400 text-gray-700">
                  <th className="p-3">Vehicle Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Leases</th>
                </tr>
              </thead>
              <tbody className="text-sm sm:text-sm md:text-base! lg:text-sm!">
                <tr className="border-b border-gray-400">
                  <td className="p-3">BMW 330i</td>
                  <td className="p-3">Los Angeles, CA</td>
                  <td className="p-3">142</td>
                </tr>
                <tr className="border-b border-gray-400">
                  <td className="p-3">Audi Q5</td>
                  <td className="p-3">Miami, FL</td>
                  <td className="p-3">115</td>
                </tr>
                <tr>
                  <td className="p-3">Honda Civic</td>
                  <td className="p-3">Chicago, IL</td>
                  <td className="p-3">98</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Top Customers + Zip Codes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-[#4A6CC8] text-white px-4 py-2">
            <h2 className="font-semibold text-sm sm:text-md">Top Customers</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[420px] sm:min-w-[450px]">
              <thead className="text-xs sm:text-sm">
                <tr className="border-b border-gray-400 text-gray-700">
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Leases</th>
                </tr>
              </thead>
              <tbody className="text-sm sm:text-sm md:text-base! lg:text-sm!">
                <tr>
                  <td className="p-3">Michael Johnson</td>
                  <td className="p-3">Los Angeles, CA</td>
                  <td className="p-3">5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-[#4A6CC8] text-white px-4 py-2">
            <h2 className="font-semibold text-sm sm:text-md">Top Zip Codes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[420px] sm:min-w-[450px]">
              <thead className="text-xs sm:text-sm">
                <tr className="border-b border-gray-400 text-gray-700">
                  <th className="p-3">Zip Code</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Leases</th>
                </tr>
              </thead>
              <tbody className="text-sm sm:text-sm md:text-base lg:text-sm!">
                <tr>
                  <td className="p-3">90210</td>
                  <td className="p-3">Beverly Hills, CA</td>
                  <td className="p-3">89</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
