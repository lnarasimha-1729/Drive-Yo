import React, { useMemo, useState } from "react";
import { Bell, User, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DealerProfile from "../DealerProfile";

const quotations = [
  {
    id: "Quote 01",
    vehicle: "BMW 330i (G20)",
    payment: "$589/mo",
    term: "36 months",
    status: "Vehicle Leased",
    statusType: "success",
  },
  {
    id: "Quote 02",
    vehicle: "Audi Q5",
    payment: "$679/mo",
    term: "36 months",
    status: "Declined the quote",
    statusType: "success",
  },
  {
    id: "Quote 03",
    vehicle: "Mercedes-Benz (C-Class, GLA)",
    payment: "$629/mo",
    term: "48 months",
    status: "Awaiting Dealer Response",
  },
  {
    id: "Quote 04",
    vehicle: "Audi Q3",
    payment: "$629/mo",
    term: "48 months",
    status: "Revised Quote Sent to customer",
    statusType: "danger",
  },
  {
    id: "Quote 05",
    vehicle: "BMW 330i",
    payment: "$629/mo",
    term: "48 months",
    status: "Residual factor flag as high",
  },
];

export default function DashboardQuotation() {

  const navigate = useNavigate()

  // 🔍 Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [termFilter, setTermFilter] = useState("");

  // 🧠 Filtered data
  const filteredQuotations = useMemo(() => {
    return quotations.filter((q) => {
      const matchesSearch =
        q.id.toLowerCase().includes(search.toLowerCase()) ||
        q.vehicle.toLowerCase().includes(search.toLowerCase()) ||
        q.status.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter ? q.status === statusFilter : true;
      const matchesVehicle = vehicleFilter ? q.vehicle === vehicleFilter : true;
      const matchesPayment = paymentFilter ? q.payment === paymentFilter : true;
      const matchesTerm = termFilter ? q.term === termFilter : true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVehicle &&
        matchesPayment &&
        matchesTerm
      );
    });
  }, [search, statusFilter, vehicleFilter, paymentFilter, termFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Residual factor flag as high":
        return "bg-red-100 text-red-700 border border-red-200";

      case "Revised Quote Sent to customer":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";

      case "Awaiting Dealer Response":
        return "bg-orange-100 text-orange-700 border border-orange-200";

      case "Vehicle Leased":
        return "bg-green-100 text-green-700 border border-green-200";

      case "Declined the quote":
        return "bg-gray-200 text-gray-700 border border-gray-300";

      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pl-12 p-3 sm:p-5 md:p-8 lg:py-8 md:px-6 lg:px-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-end justify-between lg:mb-2">
        <p className="font-semibold text-[1.125rem] md:text-[1.25rem]">
          Quotations
        </p>
        <DealerProfile />
      </div>
      <div className="border-b mt-2 mb-4 sm:mb-4"></div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-6 max-w-[100vw] ">
        {/* Search */}
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm w-full lg:max-w-md">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Quotation.."
            className="ml-2 outline-none text-sm w-full"
          />
        </div>

        {/* Status */}
        <div className="grid grid-cols-2 lg:flex gap-2">
          <select
            className="bg-white px-4 py-2 rounded-full shadow-sm text-sm border-1"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status</option>
            {[...new Set(quotations.map((q) => q.status))].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          {/* Vehicle */}
          <select
            className="bg-white px-4 py-2 rounded-full shadow-sm text-sm border-1"
            onChange={(e) => setVehicleFilter(e.target.value)}
          >
            <option value="">Vehicle</option>
            {[...new Set(quotations.map((q) => q.vehicle))].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>

          {/* Monthly Payment */}
          <select
            className="bg-white px-4 py-2 rounded-full shadow-sm text-sm border-1"
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="">Monthly Payment</option>
            {[...new Set(quotations.map((q) => q.payment))].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          {/* Lease Term */}
          <select
            className="bg-white px-4 py-2 rounded-full shadow-sm text-sm border-1"
            onChange={(e) => setTermFilter(e.target.value)}
          >
            <option value="">Lease Term</option>
            {[...new Set(quotations.map((q) => q.term))].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-6 py-3">
        <h2 className="text-black text-lg font-semibold">Quotations</h2>
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">


        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-[#4A6CC8]">
              <tr className="text-left text-white">
                <th className="p-4">Quote ID</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Monthly Payment</th>
                <th className="p-4">Term</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm sm:text-sm md:text-base! lg:text-sm!">
              {filteredQuotations.map((q, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="p-4 font-medium">{q.id}</td>
                  <td className="p-4">{q.vehicle}</td>
                  <td className="p-4">{q.payment}</td>
                  <td className="p-4">{q.term}</td>
                  <td className="p-4 min-w-40">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        q.status
                      )}`}
                    >
                      {q.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        navigate(`/quotation/chat/${q.id}`, {
                          state: { quote: q },
                        })
                      }
                      className="bg-black text-white px-4 py-1.5 rounded-full text-xs cursor-pointer"
                    >
                      View
                    </button>

                  </td>
                </tr>
              ))}

              {filteredQuotations.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No quotations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
