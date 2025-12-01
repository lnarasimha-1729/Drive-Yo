import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainHome from "./components/MainHome";
import Quote from "./components/Quote";
import Manual from "./components/Manual";
import YoPremium from "./screen/YoPremium";
import DashboardHome from "./dashoboard/DashboardHome";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="w-full h-screen flex flex-col">

      {/* NAVBAR */}
      <div className="w-full fixed top-0 left-0 z-20 bg-white h-14 flex items-center">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      {/* SIDEBAR + CONTENT */}
      <div className="flex flex-1 lg:pt-5 overflow-hidden">

        {/* SIDEBAR (NO WRAPPER!) */}
        <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};





function AppRoutes() {
  const location = useLocation();
  const isYoPremium = location.pathname === "/yo";
  const isAdmin = location.pathname.startsWith("/admin");

  // Yo Premium pages run without layout
  if (isYoPremium) {
    return (
      <Routes>
        <Route path="/yo" element={<YoPremium />} />
      </Routes>
    );
  }

  // ADMIN pages – NO layout wrapper
  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/*" element={<DashboardHome />} />
      </Routes>
    );
  }

  // USER PAGES — WITH LAYOUT (Quote / Manual / Home)
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route
  path="/quote"
  element={<Quote key={Date.now()} />}
/>
        <Route path="/manual" element={<Manual key={Date.now()} />} />
        <Route path="/yo" element={<YoPremium />} />
      </Routes>
    </Layout>
  );
}



export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
