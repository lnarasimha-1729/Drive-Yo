import { History, Car, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
export default function QuoteHistorySidebar({ collapsed, setCollapsed }) {
  const history = [
    { name: "BMW 330i", price: "$589/mo", term: "36 months", active: true },
    { name: "Audi Q5", price: "$679/mo", term: "48 months" },
    { name: "Mercedes C-Class", price: "$629/mo", term: "36 months" },
    { name: "Tesla Model 3", price: "$699/mo", term: "24 months" },
  ];

  return (
    <div className="relative flex flex-col w-full h-full">

      {/* Toggle */}
      <button
        onClick={() => setCollapsed(prev => !prev)}
        className="
          hidden md:block lg:flex absolute top-2 -right-4
          w-7 h-7 md:w-7 md:h-7 rounded-full bg-gray-200 hover:bg-gray-300 pl-1 lg:pl-0
          shadow items-center justify-center transition z-50 cursor-e-resize
        "
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-gray-100">
        {
          !collapsed ? (
            <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center shrink-0">
          <History size={16} />
        </div>
          ):("")
        }

        {!collapsed && (
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Quote History
            </p>
            <p className="text-xs text-gray-400">
              Recent analyses
            </p>
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {history.map((item, idx) => (
          <button
            key={idx}
            className={`
              w-full px-3 py-3 rounded-lg transition
              flex items-center gap-3
              ${item.active
                ? "bg-gray-100 border border-gray-200"
                : "hover:bg-gray-50"
              }
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <div className="relative group">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                <Car size={16} />
              </div>

              {collapsed && (
                <div className="
                  absolute left-12 top-1/2 -translate-y-1/2
                  bg-black text-white text-xs px-2 py-1 rounded
                  opacity-0 group-hover:opacity-100 transition
                  whitespace-nowrap z-50
                ">
                  {item.name} • {item.price}
                </div>
              )}
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {item.price} • {item.term}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
