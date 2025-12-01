import React, { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import AdminProfile from "./Adminprofile";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [leaseFilter, setLeaseFilter] = useState("All");

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

  const locations = ["All", ...new Set(customers.map((c) => c.location))];

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ? true : c.status === statusFilter;

      const matchesLocation =
        locationFilter === "All" ? true : c.location === locationFilter;

      const matchesLease =
        leaseFilter === "All"
          ? true
          : leaseFilter === "1+" && c.active >= 1
          ? true
          : leaseFilter === "2+" && c.active >= 2
          ? true
          : leaseFilter === "3+" && c.active >= 3
          ? true
          : false;

      return matchesSearch && matchesStatus && matchesLocation && matchesLease;
    });
  }, [search, statusFilter, locationFilter, leaseFilter]);


  return (
    <div className="p-8 sm:p-6 md:p-8 lg:py-8 lg:px-6">

      {/* Page Title */}
      <div className="flex items-end justify-between lg:mb-2">
        <p className="text-lg sm:text-3xl lg:text-2xl font-semibold">Customers</p>
        <AdminProfile />
      </div>
      <div className="border-b mt-2 mb-5 sm:mb-4" />

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3 mb-4">
        {/* CARD 1 */}
        <StatCard
          value="2223"
          label="Total Customers"
          icon="https://img.icons8.com/ios-filled/50/FFFFFF/gender-neutral-user.png"
        />
        <StatCard
          value="1423"
          label="Active Leases"
          icon="https://img.icons8.com/ios-filled/50/FFFFFF/car-rental.png"
        />
        <StatCard
          value="54"
          label="New This Month"
          icon="https://img.icons8.com/ios-filled/50/FFFFFF/calendar-plus.png"
        />
        <StatCard
          value="354"
          label="Premium Member"
          icon="https://img.icons8.com/sf-black-filled/64/FFFFFF/warranty-card.png"
        />
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">

        {/* Search Bar */}
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

        {/* FILTER BUTTONS */}
        <div className="flex gap-3">
          {/* Status Filter */}
          <select
            className="border px-3 py-2 rounded-lg shadow bg-white text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          {/* Location Filter */}
          <select
            className="border px-3 py-2 rounded-lg shadow bg-white text-sm"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            {locations.map((loc, i) => (
              <option key={i}>{loc}</option>
            ))}
          </select>

          {/* Lease Filter */}
          <select
            className="border px-3 py-2 rounded-lg shadow bg-white text-sm"
            value={leaseFilter}
            onChange={(e) => setLeaseFilter(e.target.value)}
          >
            <option>All</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
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
                <td className="p-3">{c.name}</td>

                <td className="p-3">
                  <p className="text-gray-800">{c.email}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{c.phone}</p>
                </td>

                <td className="p-3">{c.location}</td>

                <td className="p-3">
                  <p className="font-medium">{c.active} Active</p>
                  <p className="text-sm text-gray-500">{c.completed} Completed</p>
                </td>

                <td className="p-3">{c.memberSince}</td>

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



/* Reusable Stat Card */
function StatCard({ value, label, icon }) {
  return (
    <div className="p-4 sm:p-5 bg-white rounded-lg shadow flex items-center justify-between">
      <div>
        <p className="text-lg sm:text-xl font-semibold">{value}</p>
        <p className="text-gray-600 text-sm">{label}</p>
      </div>
      <div className="bg-black w-9 h-9 p-2 rounded-md flex items-center justify-center">
        <img className="w-6" src={icon} alt="icon" />
      </div>
    </div>
  );
}
