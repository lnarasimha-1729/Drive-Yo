import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import AdminProfile from "../AdminProfile";
import { Building2, CalendarPlus, Key, KeyRoundIcon, Store } from "lucide-react";

export default function Dealers() {
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All Status");
  const [locationFilter, setLocationFilter] = useState("All Location");
  const [dealerFilter, setDealerFilter] = useState("All Dealers");
  const [leaseTypeFilter, setLeaseTypeFilter] = useState("All Lease Type");

  const dealers = [
    {
      company: "AutoNation Premier",
      name: "John Smith",
      title: "Manager",
      email: "m.johnson@email.com",
      phone: "(310) 555-1234",
      location: "Los Angeles, CA",
      active: 3,
      completed: 2,
      memberSince: "Jan 12, 2022",
      status: "Active",
    },
    {
      company: "Metro Motors",
      name: "Sarah Johnson",
      title: "Director",
      email: "s.williams@email.com",
      phone: "(310) 555-1234",
      location: "New York, NY",
      active: 2,
      completed: 1,
      memberSince: "Mar 05, 2022",
      status: "Inactive",
    },
    {
      company: "Sunset Auto Group",
      name: "Carlos",
      title: "Owner",
      email: "r.chen@email.com",
      phone: "(310) 555-1234",
      location: "Miami",
      active: 3,
      completed: 2,
      memberSince: "Jun 18, 2025",
      status: "Active",
    },
  ];

  const filtered = dealers.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.company.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || d.status === statusFilter;

    const matchesLocation =
      locationFilter === "All Location" || d.location === locationFilter;

    const matchesDealer =
      dealerFilter === "All Dealers" || d.company === dealerFilter;

    const matchesLeaseType =
      leaseTypeFilter === "All Lease Type" ||
      (leaseTypeFilter === "Short Term" && d.active <= 2) ||
      (leaseTypeFilter === "Long Term" && d.active > 2);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesLocation &&
      matchesDealer &&
      matchesLeaseType
    );
  });
  return (
    <div className="min-h-screen bg-gray-50 pl-12 p-3 sm:p-5 md:p-8 lg:py-8 md:px-6 lg:px-6 pb-24 md:pb-8">


      {/* Page Title */}
      <div className="flex items-end justify-between lg:mb-2">
        <p className="font-semibold text-[1.125rem] md:text-[1.25rem]">Dealers</p>
        <AdminProfile />
      </div>
      <div className="border-b mt-2 mb-5 sm:mb-4"></div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 mb-4">

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">2223</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Total Dealers</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 rounded-md flex items-center justify-center">
            <Store className="text-white" />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">1423</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Active Dealers</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 rounded-md flex items-center justify-center">
            <Store className="text-white" />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">354</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Active Leases</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 rounded-md flex items-center justify-center">
            <KeyRoundIcon className="text-white" />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">54</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">New This Month</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 rounded-md flex items-center justify-center">
            <CalendarPlus className="text-white" />
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 md:flex-col lg:flex-row md:justify-between mb-5">

        {/* Search Bar */}
        <div className="flex items-center bg-white border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full md:w-full lg:w-1/3">
          <FiSearch className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search Dealer..."
            className="ml-3 outline-none flex-1 text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm w-full md:w-auto">

          <select
            className="px-3 py-2 border rounded-lg shadow-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg shadow-sm"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option>All Location</option>
            <option>Los Angeles, CA</option>
            <option>New York, NY</option>
            <option>Miami</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg shadow-sm"
            value={dealerFilter}
            onChange={(e) => setDealerFilter(e.target.value)}
          >
            <option>All Dealers</option>
            <option>AutoNation Premier</option>
            <option>Metro Motors</option>
            <option>Sunset Auto Group</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg shadow-sm"
            value={leaseTypeFilter}
            onChange={(e) => setLeaseTypeFilter(e.target.value)}
          >
            <option>All Lease Type</option>
            <option>Short Term</option>
            <option>Long Term</option>
          </select>
        </div>
      </div>

      {/* Dealer Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <div className="bg-[#4A6CC8] text-white px-4 py-3 rounded-t-lg">
          <h2 className="text-base lg:text-base font-semibold">Dealer Information</h2>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead className="text-xs sm:text-sm">
            <tr className="border-b text-gray-700">
              <th className="p-3">Dealer Company</th>
              <th className="p-3">Dealer Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Location</th>
              <th className="p-3">Leases</th>
              <th className="p-3">Member Since</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm sm:text-sm md:text-base! lg:text-sm!">
            {filtered.map((d, i) => (
              <tr key={i} className="border-b">

                {/* Dealer Company */}
                <td className="p-3">{d.company}</td>

                {/* Dealer Name */}
                <td className="p-3">
                  <p>{d.name}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{d.title}</p>
                </td>

                {/* Contact */}
                <td className="p-3">
                  <p>{d.email}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{d.phone}</p>
                </td>

                {/* Location */}
                <td className="p-3">{d.location}</td>

                {/* Leases */}
                <td className="p-3">
                  <p>{d.active} Active</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{d.completed} Completed</p>
                </td>

                {/* Member Since */}
                <td className="p-3">{d.memberSince}</td>

                {/* Status */}
                <td className="p-3">
                  {d.status === "Active" ? (
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
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-4 text-gray-500 text-sm">
            No dealers found.
          </p>
        )}
      </div>
    </div>
  );
}
