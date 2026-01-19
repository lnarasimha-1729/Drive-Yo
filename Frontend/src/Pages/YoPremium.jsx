import React from "react";
import { useNavigate } from "react-router-dom";

const YoPremium = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gray-100 px-4 sm:px-8 py-0 flex flex-col">

      {/* Close Button */}
      <p
        onClick={() => navigate(-1)}

        className="cursor-pointer text-end text-lg text-gray-600"
      >
        X
      </p>

      {/* Heading */}
      <p className="text-2xl sm:text-3xl text-center font-semibold">
        Upgrade Plan
      </p>

      {/* Pricing Card */}
      <div className="flex justify-center mt-4">
        <div className="
          flex flex-col gap-6 bg-white shadow-lg 
          w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-2/5 
          rounded-2xl p-6 sm:p-8 lg:mb-4 
          border border-gray-100 
          hover:shadow-xl transition-all duration-300
        ">
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-xl sm:text-2xl font-semibold text-gray-800">
              Yo Premium
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-end gap-2 border-b pb-4">
            <p className="text-gray-400 text-lg">$</p>
            <p className="text-4xl font-bold text-gray-900">60</p>
            <p className="text-gray-400 text-sm mb-1">/month</p>
          </div>

          {/* Features */}
          <div className="text-sm flex flex-col gap-3">
            {[
              "AI Agent for Lease Negotiation",
              "Get the best deals on lease instantly",
              "Save more money on car leasing",
              "Unlimited lease negotiations for 30 days",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-green-500 text-lg">✔</span>
                <p>{feature}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="
              w-full py-3 
              bg-gradient-to-r from-blue-500 to-blue-700 
              text-white font-medium 
              rounded-xl shadow-md 
              hover:shadow-lg hover:scale-[1.02] 
              active:scale-95 transition-all
            "
          >
            Get Premium
          </button>

          {/* Guarantee */}
          <p className="text-xs text-center text-gray-400">
            🔒 100% secure • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default YoPremium;
