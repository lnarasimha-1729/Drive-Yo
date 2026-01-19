import React from "react";
import {
  FileText,
  Crown,
  MapPin,
  Car,
  Bell,
  User,
  Search,
} from "lucide-react";
import AdminProfile from "../AdminProfile";

const stats = [
  { label: "Total Customers", value: 1423, icon: FileText },
  { label: "Premium Customers", value: 1258, icon: Crown },
  { label: "Customers Engaged", value: 1254, icon: MapPin },
  { label: "Active Leases", value: 220, icon: Car },
  {
    label: "New This Month",
    value: 54,
    sub: "premium members",
    icon: Car,
  },
];

const customers = [
  {
    name: "Michael Johnson",
    membership: "Premium Member",
    note: "",
    progress: "Negotiation completed",
    email: "m.johnson@email.com",
    phone: "(310) 555-1234",
    location: "Los Angeles, CA",
    status: "Active",
  },
  {
    name: "Sarah Williams",
    membership: "Free Tier",
    note: "1 free verification left",
    progress: "Quotation Verified",
    email: "s.williams@email.com",
    phone: "(310) 555-1234",
    location: "New York, NY",
    status: "Active",
  },
  {
    name: "Robert Chen",
    membership: "Premium Member",
    note: "",
    progress: "Lease Completed",
    email: "r.chen@email.com",
    phone: "(310) 555-1234",
    location: "Miami",
    status: "Inactive",
  },
];

export default function Customers() {
  return (
    <div className="min-h-screen bg-gray-50 pl-12 p-3 sm:p-5 md:p-8 lg:py-8 md:px-6 lg:px-6 pb-24 md:pb-8">

      {/* Header */}
      <div className="flex items-end justify-between lg:mb-2">
        <p className="font-semibold text-[1.125rem] md:text-[1.25rem]">
          Customers
        </p>
        <AdminProfile />
      </div>
      <div className="border-b mt-2 mb-4 sm:mb-4"></div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 mb-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-start"
            >
              <div>
                <p className="text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">{item.value}</p>
                <p className="text-gray-500 text-sm sm:text-sm md:text-base! lg:text-xs xl:text-lg">{item.label}</p>
                {item.sub && (
                  <p className="text-green-500 text-sm">{item.sub}</p>
                )}
              </div>
              <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1.5 flex items-center justify-center bg-black rounded-lg text-white">
                <Icon />
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
        <div className="relative w-full lg:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Customer.."
            className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <select className="border rounded-lg px-4 py-2">
            <option>All Status</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            <option>All Location</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            <option>All Lease Type</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-scroll">
        <div className="bg-[#4A6CC8] text-white px-6 py-3 font-semibold">
          Customer Information
        </div>

        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left text-gray-600">
              <th className="p-4">Name</th>
              <th className="p-4">Membership Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-sm md:text-base! lg:text-sm!">
            {customers.map((c, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="p-4 font-medium">{c.name}</td>

                <td className="p-4">
                  <p>{c.membership}</p>
                  {c.note && (
                    <p className="text-orange-500 text-xs">{c.note}</p>
                  )}
                </td>

                <td
                  className={`p-4 font-medium ${c.progress.includes("Completed")
                    ? "text-green-600"
                    : ""
                    }`}
                >
                  {c.progress}
                </td>

                <td className="p-4">
                  <p>{c.email}</p>
                  <p className="text-gray-500 text-xs">{c.phone}</p>
                </td>

                <td className="p-4">{c.location}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${c.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                      }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
