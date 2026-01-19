import React, { useState } from "react";
import Navbar from "./Navbar";
import QuoteHistorySidebar from "./QuotationHistorySidebar";
import MobileSidebar from "./MobileSidebar";
import QuotationDetails from "./QuotationDetail";

const QuotationChatPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [historyCollapsed, setHistoryCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
      </div>

      {/* MOBILE SIDEBAR */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* CONTENT */}
      <div className="flex pt-14 h-screen overflow-hidden">

        {/* DESKTOP SIDEBAR */}
        <aside
  className={`
    hidden md:flex bg-white border-r border-gray-300
    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
    ${historyCollapsed ? "w-[5rem]" : "w-60"}
  `}
>
  <QuoteHistorySidebar
    collapsed={historyCollapsed}
    setCollapsed={setHistoryCollapsed}
  />
</aside>

<main
  className={`
    flex-1 overflow-hidden
    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
  `}
>
  <QuotationDetails />
</main>


      </div>
    </div>
  );
};

export default QuotationChatPage;
