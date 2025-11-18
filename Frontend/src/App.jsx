import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainHome from "./components/MainHome";
import Quote from "./components/Quote";
import Manual from "./components/Manual";
import YoPremium from "./screen/YoPremium";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col">

      {/* NAVBAR (fixed, exact height) */}
      <div className="w-full fixed top-0 left-0 z-20 bg-white shadow-sm h-16 flex items-center">
        <Navbar />
      </div>

      {/* SIDEBAR + MAIN CONTENT */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Make pt-16 EXACTLY equal to navbar height */}

        {/* SIDEBAR */}
        <aside className="bg-white shadow-md md:w-[20%] lg:w-[18%] h-full">
          <Sidebar />
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};




function AppRoutes() {
  const location = useLocation();
  const isYoPremium = location.pathname === "/yo";

  return (
    <div>
      {isYoPremium ? (
        <Routes>
          <Route path="/yo" element={<YoPremium />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<MainHome />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/manual" element={<Manual />} />
            <Route path="/yo" element={<YoPremium />} />
          </Routes>
        </Layout>
      )}
    </div>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
