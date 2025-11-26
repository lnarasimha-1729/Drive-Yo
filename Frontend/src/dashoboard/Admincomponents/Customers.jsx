import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import AdminProfile from "./Adminprofile";

export default function Customers() {
  const [search, setSearch] = useState("");

  const customers = [
    {
      name: "Michael Johnson",
      email: "m.johnson@email.com",
      phone: "(310) 555-1234",
      location: "Los Angeles, CA",
      active: 3,
      completed: 2,
      memberSince: "Jan 12, 2022",
      status: "Active",
    },
    {
      name: "Sarah Williams",
      email: "s.williams@email.com",
      phone: "(310) 555-1234",
      location: "New York, NY",
      active: 2,
      completed: 1,
      memberSince: "Mar 05, 2022",
      status: "Inactive",
    },
    {
      name: "Robert Chen",
      email: "r.chen@email.com",
      phone: "(310) 555-1234",
      location: "Miami",
      active: 3,
      completed: 2,
      memberSince: "Jun 18, 2025",
      status: "Active",
    },
    {
      name: "David Thompson",
      email: "d.thompson@email.com",
      phone: "(310) 555-1234",
      location: "Chicago",
      active: 2,
      completed: 3,
      memberSince: "Nov 22, 2024",
      status: "Active",
    }
  ];

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 sm:p-6 md:p-8 lg:py-10">
      {/* Page Title */}

      <div className="flex items-end justify-between lg:mb-2">
      <p className="text-lg sm:text-3xl lg:text-2xl font-semibold">Customers</p>
      <AdminProfile/>
      </div>
      <div className="border-b mt-2 mb-5 sm:mb-6" />

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">2223</p>
            <p className="text-gray-600 text-sm">Total Customers</p>
          </div>
          <div className="bg-black w-9 h-9 p-2 rounded-md flex items-center justify-center">
            <img className="w-6" src="https://img.icons8.com/ios-filled/50/FFFFFF/gender-neutral-user.png" alt="user"/>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">1423</p>
            <p className="text-gray-600 text-sm">Active Leases</p>
          </div>
          <div className="bg-black w-9 h-9 p-2 rounded-md flex items-center justify-center">
            <img className="w-6" src="https://img.icons8.com/ios-filled/50/FFFFFF/car-rental.png" alt="car-rental"/>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">54</p>
            <p className="text-gray-600 text-sm">New This Month</p>
          </div>
          <div className="bg-black w-9 h-9 p-2 rounded-md flex items-center justify-center">
            <img className="w-6" src="https://img.icons8.com/ios-filled/50/FFFFFF/calendar-plus.png" alt="calendar-plus"/>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold">354</p>
            <p className="text-gray-600 text-sm">Premium Member</p>
          </div>
          <div className="bg-black w-9 h-9 p-1 rounded-md flex items-center justify-center">
            <img className="w-7" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/warranty-card.png" alt="warranty-card"/>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="flex items-center bg-white border rounded-lg px-4 py-2 shadow w-full sm:w-[70%] md:w-[40%]">
          <FiSearch className="text-gray-500 text-lg sm:text-xl" />
          <input
            type="text"
            placeholder="Search Customer..."
            className="ml-3 outline-none flex-1 text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Customer Information Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="bg-blue-800 text-white px-4 py-3 rounded-t-lg">
          <h2 className="font-semibold text-base sm:text-lg">Customer Information</h2>
        </div>

        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b text-gray-700 text-xs sm:text-sm">
              <th className="p-3">Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Location</th>
              <th className="p-3">Leases</th>
              <th className="p-3">Member Since</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-xs sm:text-sm">
            {filtered.map((c, i) => (
              <tr key={i} className="border-b">
                {/* Name */}
                <td className="p-3">{c.name}</td>

                {/* Contact */}
                <td className="p-3">
                  <p className="text-gray-800">{c.email}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{c.phone}</p>
                </td>

                {/* Location */}
                <td className="p-3">{c.location}</td>

                {/* Leases */}
                <td className="p-3">
                  <p className="font-medium">{c.active} Active</p>
                  <p className="text-sm text-gray-500">{c.completed} Completed</p>
                </td>

                {/* Member Since */}
                <td className="p-3">{c.memberSince}</td>

                {/* Status */}
                <td className="p-3">
                  {c.status === "Active" ? (
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
          <p className="text-center py-4 text-gray-500 text-sm">No customers found.</p>
        )}
      </div>
    </div>
  );
}
