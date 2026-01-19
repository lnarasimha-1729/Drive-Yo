import React, { useMemo, useState } from "react";
import {
  Bell,
  Store,
  Car,
  FileText,
  User,
  Search,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import DealerProfile from "../DealerProfile";
import AdminProfile from "../../AdminDashboard/AdminProfile";

const stats = [
  { label: "Total Quotes", value: 222, icon: Store },
  { label: "New Quotes", value: 30, icon: Car },
  { label: "Vehicles Leased", value: 32, icon: FileText },
  { label: "New Leases This Month", value: 4, icon: Car },
  { label: "Active Negotiations", value: 8, icon: MessageSquare }
];

const quotes = [
  {
    id: "Quote 01",
    vehicle: "BMW 330i (G20)",
    leased_on: "10/12/2025",
    Quote_Send_On: "01/12/2024",
    payment: "$385/month",
    term: "36 Months",
  },
  {
    id: "Quote 02",
    vehicle: "Audi Q5",
    leased_on: "Pending",
    Quote_Send_On: "01/12/2025",
    payment: "$385/month",
    term: "12 Months",
  },
  {
    id: "Quote 03",
    vehicle: "Mercedes-Benz (C-Class, GLA)",
    leased_on: "10/12/2025",
    Quote_Send_On: "01/12/2025",
    payment: "$385/month",
    term: "24 Months",
  },
  {
    id: "Quote 04",
    vehicle: "BMW (3 Series, X1)",
    leased_on: "10/12/2025",
    Quote_Send_On: "01/12/2025",
    payment: "$385/month",
    term: "36 Months",
    highlight: true,
  },
  {
    id: "Quote 05",
    vehicle: "BMW (3 Series, X1)",
    leased_on: "10/12/2025",
    Quote_Send_On: "01/12/2025",
    payment: "$385/month",
    term: "12 Months",
  },
];

const getLeaseStatusStyle = (leasedOn) => {
  if (!leasedOn || leasedOn.toLowerCase() === "pending") {
    return "bg-red-100 text-red-600 border border-red-200";
  }
  return "bg-green-100 text-green-700 border border-green-200";
};


export default function DealerDashboard() {
  // 🔍 Filters state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [termFilter, setTermFilter] = useState("");

  // 🧠 Filter logic
  const filteredQuotes = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return quotes.filter((q) => {
      // 🔍 Global search across all fields
      const matchesSearch = Object.values(q)
        .filter((value) => value !== null && value !== undefined)
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesVehicle = vehicleFilter
        ? q.vehicle === vehicleFilter
        : true;

      const matchesPayment = paymentFilter
        ? q.payment === paymentFilter
        : true;

      const matchesTerm = termFilter ? q.term === termFilter : true;

      return (
        matchesSearch &&
        matchesVehicle &&
        matchesPayment &&
        matchesTerm
      );
    });
  }, [search, vehicleFilter, paymentFilter, termFilter]);


  return (
    <div className="min-h-screen bg-gray-50 pl-12 p-3 sm:p-5 md:p-8 lg:py-8 md:px-6 lg:px-6 pb-24 md:pb-8">

      {/* Header */}
      <div className="flex items-end justify-between lg:mb-2">
        <p className="font-semibold text-[1.125rem] md:text-[1.25rem]">
          Dashboard
        </p>
        <DealerProfile />
      </div>
      <div className="border-b mt-2 mb-4 sm:mb-4"></div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 mb-8">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow p-4 flex justify-between">
              <div>
                <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">{item.value}</p>
                <p className="text-gray-500 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">{item.label}</p>
              </div>
              <div className="bg-black text-white w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 flex items-center justify-center rounded-md">
                <Icon />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-row md:flex-col flex-wrap lg:flex-nowrap gap-6 lg:gap-4 mb-8">
        {/* Search */}
        <div className="flex items-center bg-white px-4 py-2.5 rounded-full shadow-sm flex-1 lg:w-1/3 lg:flex-none">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Quotation.."
            className="ml-2 outline-none text-sm"
          />
        </div>

        {/* Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">

          {/* Vehicle */}
          <select
            className="bg-white px-4 py-2 rounded-full shadow-sm text-sm border-1"
            onChange={(e) => setVehicleFilter(e.target.value)}
          >
            <option value="">Vehicle</option>
            {[...new Set(quotes.map((q) => q.vehicle))].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>

          {/* Monthly Payment */}
          <select
            className="bg-white px-4 py-2 rounded-full shadow-sm text-sm border-1"
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="">Monthly Payment</option>
            {[...new Set(quotes.map((q) => q.payment))].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          {/* Lease Term */}
          <select
            className="bg-white px-4 py-2 rounded-full shadow-sm text-sm border-1"
            onChange={(e) => setTermFilter(e.target.value)}
          >
            <option value="">Lease Term</option>
            {[...new Set(quotes.map((q) => q.term))].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-[#4A6CC8] text-white">
            <tr>
              <th className="p-4 text-left">Quote ID</th>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Monthly Payment</th>
              <th className="p-4 text-left">Lease Term</th>
              <th className="p-4 text-left">Quote Send On</th>
              <th className="p-4 text-left">Leased On</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-sm md:text-base! lg:text-sm!">
            {filteredQuotes.map((q, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="p-4 font-medium">{q.id}</td>
                <td className="p-4">{q.vehicle}</td>
                <td className="p-4">{q.payment}</td>
                <td className="p-4">{q.term}</td>
                <td className="p-4">
                  {q.Quote_Send_On}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getLeaseStatusStyle(
                      q.leased_on
                    )}`}
                  >
                    {q.leased_on}
                  </span>
                </td>

              </tr>
            ))}
            {filteredQuotes.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No quotes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
