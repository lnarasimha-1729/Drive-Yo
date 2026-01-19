import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import AdminProfile from "../AdminProfile";
import { Map, MapPin, TrendingUp } from "lucide-react";

export default function Locations() {
  const [search, setSearch] = useState("");

  const locations = [
    {
      city: "Beverly Hills",
      county: "Los Angeles County",
      zip: "90210",
      state: "California",
      leases: 89,
      growth: "+18%",
      status: "Active",
    },
    {
      city: "Manhattan",
      county: "New York County",
      zip: "10001",
      state: "New York",
      leases: 65,
      growth: "+12%",
      status: "Inactive",
    },
    {
      city: "Miami Beach",
      county: "Miami-Dade County",
      zip: "33139",
      state: "Florida",
      leases: 75,
      growth: "+15%",
      status: "Active",
    },
  ];

  const filtered = locations.filter((l) =>
    l.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 sm:p-6 md:p-8 lg:py-8 lg:px-6">

      {/* Page Title */}
      <div className="flex items-end justify-between lg:mb-2">
      <p className="text-lg sm:text-3xl lg:text-2xl font-semibold">Locations</p>
      <AdminProfile/>
      </div>
      <div className="border-b mb-5 mt-2 sm:mb-4" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 mb-4">

        <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">2523</p>
            <p className="text-gray-600 text-sm">Total Locations</p>
          </div>
          <div className="bg-black w-9 h-9 p-2 rounded-md flex items-center justify-center">
            <MapPin className="text-white"/>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">1423</p>
            <p className="text-gray-600 text-sm">Active Locations</p>
          </div>
          <div className="bg-black w-9 h-9 p-2 rounded-md flex items-center justify-center">
            <MapPin className="text-white"/>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">54</p>
            <p className="text-gray-600 text-sm">High Activity Areas</p>
          </div>
          <div className="bg-black w-9 h-9 p-2 rounded-md flex items-center justify-center">
            <Map className="text-white"/>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">354</p>
            <p className="text-gray-600 text-sm">New Markets</p>
          </div>
          <div className="bg-black w-9 h-9 p-2 rounded-md flex items-center justify-center">
            <TrendingUp className="text-white"/>
          </div>
        </div>

      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="flex items-center bg-white border rounded-lg px-4 py-2 shadow w-full sm:w-[70%] md:w-[40%]">
          <FiSearch className="text-gray-500 text-lg sm:text-xl" />
          <input
            type="text"
            placeholder="Search Location..."
            className="ml-3 outline-none flex-1 text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <div className="bg-blue-800 text-white px-4 py-3 rounded-t-lg">
          <h2 className="text-base sm:text-lg font-semibold">Locations</h2>
        </div>

        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b text-gray-700 text-xs sm:text-sm">
              <th className="p-3">Location</th>
              <th className="p-3">Zip Code</th>
              <th className="p-3">State</th>
              <th className="p-3">Active Leases</th>
              <th className="p-3">Growth</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-xs sm:text-sm">
            {filtered.map((l, i) => (
              <tr key={i} className="border-b">

                {/* City + County */}
                <td className="p-3">
                  <p>{l.city}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{l.county}</p>
                </td>

                {/* ZIP */}
                <td className="p-3">{l.zip}</td>

                {/* State */}
                <td className="p-3">{l.state}</td>

                {/* Active Leases */}
                <td className="p-3">{l.leases}</td>

                {/* Growth */}
                <td className="p-3 text-green-600 flex items-center gap-1">
                  <span className="text-sm sm:text-lg">↑</span>
                  {l.growth}
                </td>

                {/* Status */}
                <td className="p-3">
                  {l.status === "Active" ? (
                    <span className="px-3 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded-full">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs sm:text-sm bg-red-100 text-red-700 rounded-full">
                      Inactive
                    </span>
                  )}
                </td>

                {/* Action */}
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
            No locations found.
          </p>
        )}
      </div>

    </div>
  );
}
