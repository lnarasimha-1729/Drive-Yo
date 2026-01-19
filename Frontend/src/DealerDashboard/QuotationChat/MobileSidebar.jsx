import React from "react";
import { X } from "lucide-react";
import QuoteHistorySidebar from "./QuotationHistorySidebar";

const MobileSidebar = ({ open, onClose }) => {
  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/40
          transition-opacity duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* SLIDE DRAWER */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="h-14 flex items-center justify-end px-4">
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="h-[calc(100%-56px)] overflow-y-auto">
          <QuoteHistorySidebar />
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;