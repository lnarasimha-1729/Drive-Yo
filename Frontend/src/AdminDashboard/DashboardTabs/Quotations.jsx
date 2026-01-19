import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import AdminProfile from "../AdminProfile";
import { CalendarPlus, Crown, File, FileCheck } from "lucide-react";

export default function Quotations() {
  const [search, setSearch] = useState("");

  const quotations = [
    {
      customer: "Michael Johnson",
      email: "m.johnson@email.com",
      vehicle: "Tesla Model 3",
      trim: "Long Range",
      dealer: "AutoNation Premier",
      payment1: "$589/mo",
      payment2: "$679/mo",
      term: "36 months",
      status: "Approved",
    },
    {
      customer: "Sarah Williams",
      email: "s.williams@email.com",
      vehicle: "BMW 3 Series",
      trim: "330i Sedan",
      dealer: "Metro Motors",
      payment1: "$629/mo",
      term: "36 months",
      status: "Rejected",
    },
    {
      customer: "Robert Chen",
      email: "r.chen@email.com",
      vehicle: "Audi A4",
      trim: "Premium Plus",
      dealer: "Sunset Auto Group",
      payment1: "$729/mo",
      term: "48 months",
      status: "Pending",
    },
  ];

  const filtered = quotations.filter((q) =>
    q.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pl-12 p-3 sm:p-5 md:p-8 lg:py-8 md:px-6 lg:px-6 pb-24 md:pb-8">

      {/* Page Title */}
      <div className="flex items-end justify-between lg:mb-2">
        <p className="font-semibold text-[1.125rem] md:text-[1.25rem]">Quotations</p>
        <AdminProfile />
      </div>
      <div className="border-b mt-2 mb-5 sm:mb-4" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 mb-4">

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">2523</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Total Quotations</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 rounded-md flex items-center justify-center">
            <File className="text-white" />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">1423</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Approved Quotes</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 rounded-md flex items-center justify-center">
            <FileCheck className="text-white" />
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

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">354</p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-base lg:text-base! xl:text-lg">Premium Member</p>
          </div>
          <div className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 rounded-md flex items-center justify-center">
            <Crown className="text-white w-5" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="flex items-center bg-white border-2 border-gray-300 rounded-lg px-4 py-2 w-full sm:w-[70%] md:w-[40%]">
          <FiSearch className="text-gray-500 text-lg sm:text-xl" />
          <input
            type="text"
            placeholder="Search Quotation..."
            className="ml-3 outline-none flex-1 text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <div className="bg-[#4A6CC8] text-white px-4 py-3 rounded-t-lg">
          <h2 className="text-base sm:text-lg font-semibold">Quotations</h2>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b text-gray-700 text-xs sm:text-sm">
              <th className="p-3">Customer</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Dealer</th>
              <th className="p-3">Monthly Payment</th>
              <th className="p-3">Term</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm sm:text-sm md:text-base! lg:text-sm!">
            {filtered.map((q, i) => (
              <tr key={i} className="border-b">

                {/* Customer */}
                <td className="p-3">
                  <p>{q.customer}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{q.email}</p>
                </td>

                {/* Vehicle */}
                <td className="p-3">
                  <p>{q.vehicle}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{q.trim}</p>
                </td>

                {/* Dealer */}
                <td className="p-3">{q.dealer}</td>

                {/* Monthly Payment */}
                <td className="p-3">
                  <p>{q.payment1}</p>
                  {q.payment2 && (
                    <p className="text-gray-500 text-xs sm:text-sm">{q.payment2}</p>
                  )}
                </td>

                {/* Term */}
                <td className="p-3">{q.term}</td>

                {/* Status */}
                <td className="p-3">
                  {q.status === "Approved" && (
                    <span className="px-3 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded-full">
                      Approved
                    </span>
                  )}

                  {q.status === "Rejected" && (
                    <span className="px-3 py-1 text-xs sm:text-sm bg-red-100 text-red-700 rounded-full">
                      Rejected
                    </span>
                  )}

                  {q.status === "Pending" && (
                    <span className="px-3 py-1 text-xs sm:text-sm bg-yellow-100 text-yellow-700 rounded-full">
                      Pending
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
            No quotations found.
          </p>
        )}
      </div>
    </div>
  );
}
