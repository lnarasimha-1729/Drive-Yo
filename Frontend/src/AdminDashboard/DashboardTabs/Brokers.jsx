import React, { useState, useMemo } from "react";
import {
  Bell,
  Store,
  FileText,
  Car,
  Search,
} from "lucide-react";
import AdminProfile from "../AdminProfile";

/* -------------------- STATS DATA -------------------- */
const stats = [
  { label: "Total Locations", value: 2523, icon: Store },
  { label: "Active Locations", value: 1423, icon: FileText },
  { label: "High Activity Areas", value: 54, icon: Car },
  { label: "New Markets", value: 354, icon: Car },
];

/* -------------------- TABLE DATA -------------------- */
const locationsData = [
  {
    name: "Beverly Hills",
    county: "Los Angeles County",
    zip: "90210",
    state: "California",
    leases: 89,
    growth: 18,
    status: "Active",
    dealer: "Dealer",
    term: "36",
  },
  {
    name: "Manhattan",
    county: "New York County",
    zip: "10001",
    state: "New York",
    leases: 65,
    growth: 12,
    status: "Inactive",
    dealer: "Dealer",
    term: "48",
  },
  {
    name: "Miami Beach",
    county: "Miami-Dade County",
    zip: "33139",
    state: "Florida",
    leases: 75,
    growth: 15,
    status: "Active",
    dealer: "Broker",
    term: "36",
  },
];

export default function Brokers() {
  /* -------------------- STATE -------------------- */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dealerFilter, setDealerFilter] = useState("All");
  const [termFilter, setTermFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  /* -------------------- FILTER LOGIC -------------------- */
  const filteredLocations = useMemo(() => {
    return locationsData.filter((loc) => {
      const matchesSearch =
        loc.name.toLowerCase().includes(search.toLowerCase()) ||
        loc.county.toLowerCase().includes(search.toLowerCase()) ||
        loc.state.toLowerCase().includes(search.toLowerCase()) ||
        loc.zip.includes(search);

      const matchesStatus =
        statusFilter === "All" || loc.status === statusFilter;

      const matchesDealer =
        dealerFilter === "All" || loc.dealer === dealerFilter;

      const matchesTerm =
        termFilter === "All" || loc.term === termFilter;

      const matchesLocation =
        locationFilter === "All" || loc.state === locationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDealer &&
        matchesTerm &&
        matchesLocation
      );
    });
  }, [search, statusFilter, dealerFilter, termFilter, locationFilter]);

  return (
    <div className="min-h-screen bg-gray-50 pl-12 p-3 sm:p-5 md:p-8 lg:py-8 md:px-6 lg:px-6 pb-24 md:pb-8">


      {/* -------------------- HEADER -------------------- */}
      <div className="flex items-end justify-between lg:mb-2">
        <p className="font-semibold text-[1.125rem] md:text-[1.25rem]">
          Brokers
        </p>
        <AdminProfile />
      </div>
      <div className="border-b mt-2 mb-4 sm:mb-4"></div>

      {/* -------------------- STATS -------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 mb-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">{item.value}</h2>
              <p className="text-gray-500 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">{item.label}</p>
            </div>
            <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 bg-black text-white rounded-md flex items-center justify-center">
              <item.icon />
            </div>
          </div>
        ))}
      </div>

      {/* -------------------- SEARCH + FILTERS -------------------- */}
      <div className="flex flex-col gap-4 mb-4">

        {/* Search */}
        <div className="flex items-center bg-white px-4 py-2.5 border-2 border-gray-300 rounded-lg w-[100%] lg:w-1/3">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            placeholder="Search Location.."
            className="outline-none text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border-1 bg-white px-4 py-2.5 rounded-lg shadow-sm text-sm"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={dealerFilter}
            onChange={(e) => setDealerFilter(e.target.value)}
            className="border-1 bg-white px-4 py-2.5 rounded-lg shadow-sm text-sm"
          >
            <option value="All">Dealer</option>
            <option value="Dealer">Dealer</option>
            <option value="Broker">Broker</option>
          </select>

          <select
            value={termFilter}
            onChange={(e) => setTermFilter(e.target.value)}
            className="border-1 bg-white px-4 py-2.5 rounded-lg shadow-sm text-sm"
          >
            <option value="All">Term</option>
            <option value="36">36 Months</option>
            <option value="48">48 Months</option>
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="border-1 bg-white px-4 py-2.5 rounded-lg shadow-sm text-sm"
          >
            <option value="All">All Location</option>
            <option value="California">California</option>
            <option value="New York">New York</option>
            <option value="Florida">Florida</option>
          </select>

        </div>
      </div>

      {/* -------------------- TABLE -------------------- */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="bg-[#4A6CC8] text-white px-6 py-3 font-medium">
          Locations
        </div>

        <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[420px] sm:min-w-[450px] text-sm">
          <thead className="border-b text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Location</th>
              <th className="text-left px-6 py-3">Zip Code</th>
              <th className="text-left px-6 py-3">State</th>
              <th className="text-left px-6 py-3">Active Leases</th>
              <th className="text-left px-6 py-3">
                Growth
                <div className="text-xs text-gray-400">from last month</div>
              </th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm sm:text-sm md:text-base! lg:text-sm!">
            {filteredLocations.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No locations found
                </td>
              </tr>
            ) : (
              filteredLocations.map((loc, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="px-6 py-4">
                    <div className="font-medium">{loc.name}</div>
                    <div className="text-xs text-gray-400">{loc.county}</div>
                  </td>
                  <td className="px-6 py-4">{loc.zip}</td>
                  <td className="px-6 py-4">{loc.state}</td>
                  <td className="px-6 py-4">{loc.leases}</td>
                  <td className="px-6 py-4 text-green-600">
                    ↑ {loc.growth}%
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${loc.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {loc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">—</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
