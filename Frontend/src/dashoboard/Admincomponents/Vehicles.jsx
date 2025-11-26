import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import AdminProfile from "./Adminprofile";

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
    <div className="p-8 sm:p-6 lg:py-10">
      {/* Page Title */}
      <div className="flex items-end justify-between lg:mb-2">
      <p className="text-lg sm:text-3xl lg:text-2xl font-semibold">Vehicles</p>
      <AdminProfile/>
      </div>
      <div className="border-b mt-2 mb-5 sm:mb-6"></div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">2258</p>
            <p className="text-gray-600 text-sm">Total Vehicles</p>
          </div>
          <div className="bg-black w-9 h-9 p-2 rounded-md">
            <img
              className="w-6"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/car.png"
              alt="car"
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">1423</p>
            <p className="text-gray-600 text-sm">Available for Lease</p>
          </div>
          <div className="bg-black w-9 h-9 p-2 rounded-md">
            <img
              className="w-6"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/car.png"
              alt="car"
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">854</p>
            <p className="text-gray-600 text-sm">Currently Leased</p>
          </div>
          <div className="bg-black w-9 h-9 p-2 rounded-md">
            <img
              className="w-7"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/car-rental.png"
              alt="leased"
            />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="flex items-center bg-white border rounded-lg px-4 py-2 shadow w-full sm:w-[70%] md:w-[40%]">
          <FiSearch className="text-gray-500 text-lg sm:text-xl" />
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
        <div className="bg-blue-800 text-white px-4 py-3 flex items-center gap-2 rounded-t-lg">
          <FaCar className="text-sm sm:text-base" />
          <h2 className="font-semibold text-base sm:text-lg">Vehicle Inventory</h2>
        </div>

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

          <tbody className="text-xs sm:text-sm">
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

        {filtered.length === 0 && (
          <p className="text-center py-4 text-gray-500 text-sm">
            No vehicles found.
          </p>
        )}
      </div>
    </div>
  );
}
