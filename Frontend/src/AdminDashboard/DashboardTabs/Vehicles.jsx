import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCar, FaCartPlus } from "react-icons/fa";
import AdminProfile from "../AdminProfile";
import { CarFront, Key, KeySquare } from "lucide-react";

export default function Vehicles() {
  const [search, setSearch] = useState("");

  const data = [
    {
      make: "Tesla",
      model: "Tesla Model 3",
      trim: "Long Range",
      year: 2023,
      status: "Available",
      location: "Los Angeles, CA",
      rate: "$589/month Rate",
    },
    {
      make: "BMW",
      model: "BMW 3 Series",
      trim: "330i",
      year: 2022,
      status: "Leased",
      location: "New York, NY",
      rate: "$685/month Rate",
    },
    {
      make: "Audi",
      model: "Audi A4",
      trim: "Premium Plus",
      year: 2023,
      status: "Available",
      location: "Miami",
      rate: "$629/month Rate",
    },
    {
      make: "Mercedes",
      model: "Mercedes C300",
      trim: "C300",
      year: 2023,
      status: "Available",
      location: "Chicago",
      rate: "$485/month Rate",
    },
  ];

  const filtered = data.filter((v) =>
    `${v.make} ${v.model} ${v.trim}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pl-12 p-3 sm:p-5 md:p-8 lg:py-8 md:px-6 lg:px-6 pb-24 md:pb-8">

      {/* Page Title */}
      <div className="flex items-end justify-between lg:mb-2">
        <p className="font-semibold text-[1.125rem] md:text-[1.25rem]">
          Vehicles
        </p>
        <AdminProfile />
      </div>
      <div className="border-b mt-2 mb-5 sm:mb-4"></div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 mb-4">
        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">2258</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Total Vehicles</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 rounded-md flex items-center justify-center">
            <CarFront className="text-white" />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">1423</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Available for Lease</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 rounded-md flex items-center justify-center">
            <CarFront className="text-white" />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">854</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Currently Leased</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 rounded-md flex items-center justify-center">
            <KeySquare className="text-white" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="flex items-center bg-white rounded-lg px-4 py-2 w-full sm:w-[70%] md:w-[40%] border-2 border-gray-300">
          <FiSearch className="text-lg sm:text-xl" />
          <input
            type="text"
            placeholder="Search Vehicle..."
            className="ml-3 outline-none flex-1 text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Vehicle Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="bg-[#4A6CC8] text-white px-4 py-3 flex items-center gap-2 rounded-t-lg">
          <FaCar className="text-sm sm:text-base" />
          <h2 className="font-semibold text-base sm:text-lg">Vehicle Inventory</h2>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="text-xs sm:text-sm bg-gray-50">
            <tr className="border-b text-gray-700">
              <th className="p-3">Make</th>
              <th className="p-3">Model</th>
              <th className="p-3">Trim</th>
              <th className="p-3">Year</th>
              <th className="p-3">Status</th>
              <th className="p-3">Location</th>
              <th className="p-3">Lease Rate</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm sm:text-sm md:text-base! lg:text-sm!">
            {filtered.map((v, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{v.make}</td>
                <td className="p-3">{v.model}</td>
                <td className="p-3">{v.trim}</td>
                <td className="p-3">{v.year}</td>

                {/* Status Badge */}
                <td className="p-3">
                  {v.status === "Available" ? (
                    <span className="px-3 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-full">
                      Leased
                    </span>
                  )}
                </td>

                <td className="p-3">{v.location}</td>
                <td className="p-3">{v.rate}</td>

                <td className="p-3">
                  <button className="text-blue-600 hover:underline text-xs sm:text-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-4 text-gray-500 text-sm">
            No vehicles found.
          </p>
        )}
      </div>
    </div>
  );
}
