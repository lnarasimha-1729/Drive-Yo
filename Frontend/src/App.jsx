import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./Home-components/HomeNavbar";
import Sidebar from "./Home-components/Sidebar";
import Quote from "./Pages/Quote";
import Manual from "./Pages/Car_details";
import YoPremium from "./Pages/YoPremium";
import AuthScreen from "./Pages/AuthScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DealerPage from "./DealerDashboard/DealerPage";
import Page from "./AdminDashboard/Page";
import QuotationChatPage from "./DealerDashboard/QuotationChat/QuotationChatPage";
import QuotationDetails from "./DealerDashboard/QuotationChat/QuotationDetail";
import Home from "./Pages/Home";
import Car_details from "./Pages/Car_details";
import NotFound from "./Home-components/Notfound";

import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="min-h-screen flex flex-col">

      {/* NAVBAR */}
      <div className="w-full fixed top-0 left-0 z-50 bg-white h-14 flex items-center">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      {/* SIDEBAR + CONTENT */}
      <div className="fixed w-full flex flex-1 lg:pt-5 pt-0 overflow-hidden z-40">
        <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />

        <main className="flex-1 overflow-auto flex items-center justify-center max-w-screen bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


const LayoutWrapper = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quotation-upload" element={<Quote />} />
        <Route path="/car-details" element={<Car_details />} />
        <Route path="/quotation/:id" element={<QuotationDetails />} />
      </Routes>
    </Layout>
  );
};


function AppRoutes() {
  return (
    <Routes>

      {/* NO LAYOUT */}
      <Route path="/login" element={<AuthScreen />} />
      <Route path="/yo-premium" element={<YoPremium />} />
      <Route path="/admin/*" element={<Page />} />
      <Route path="/dealer/*" element={<DealerPage />} />
      <Route path="/quotation/chat/:id" element={<QuotationChatPage />} />

      {/* USER ROUTES WITH LAYOUT */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="quotation-upload" element={<Quote />} />
        <Route path="car-details" element={<Car_details />} />
        <Route path="quotation/:id" element={<QuotationDetails />} />
      </Route>

      {/* ✅ PURE 404 — NO NAVBAR, NO SIDEBAR */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}






export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000}
        pauseOnHover
        draggable
        newestOnTop />
      <AppRoutes />
    </BrowserRouter>
  );
}
