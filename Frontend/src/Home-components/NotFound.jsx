// NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-[#fafafa]">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-2">Page Not Found</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-black text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
}
