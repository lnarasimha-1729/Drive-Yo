import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function MainHome() {
  const navigate = useNavigate();

  const placeholders = [
    "Ask DriveYo anything...",
    "Compare car deals...",
    "Check hidden charges...",
    "Negotiate with dealerships..."
  ];

  const [text, setText] = useState("")
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholders.length);
        setAnimate(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col bg-[#fafafa] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 min-h-screen lg:gap-22">

      {/* Center Section */}
      <div className="flex flex-col items-center text-center mt-20 lg:mt-20 md:mt-20 lg:mr-0 gap-2">
        
        <p className="text-2xl md:text-3xl lg:text-3xl font-bold mb-4">
          Welcome to DriveYo
        </p>

        <p className="text-sm sm:text-base md:text-md text-gray-600 max-w-md sm:max-w-lg md:max-w-2xl mb-8">
          DriveYo, your car leasing assistant. Get the best deals,
          validate quotes, and negotiate with dealerships effortlessly.
        </p>

        {/* White Card */}
        <div className="
          bg-white px-6 py-6 sm:px-8 rounded-xl shadow-md 
          w-full max-w-sm sm:max-w-md md:max-w-lg
        ">
          <p className="text-base md:text-lg font-semibold mb-6">
            Do you have a dealer quote already?
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              // navigate and pass state telling /quote to auto-open upload
              onClick={() => navigate("/quote", { state: { autoOpenUpload: true } })}
              className="
                px-4 py-2 bg-black text-white rounded-lg 
                text-xs sm:text-sm font-medium cursor-pointer
              "
            >
              Yes, I have a quote
            </button>

            <button
              onClick={() => navigate("/manual")}
              className="
                px-4 py-2 border-2 border-black rounded-lg 
                text-xs sm:text-sm font-medium cursor-pointer
              "
            >
              No, I need help finding a car
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Input */}
      <div className="flex justify-center md:mt-20 pb-16 mt-12 lg:mt-0 lg:w-full">
        <div className="
          flex items-center 
          w-full max-w-sm sm:max-w-md md:max-w-xl lg:min-w-2xl
          bg-white border border-gray-300 rounded-full px-4 sm:px-6 py-3 shadow
        ">
          <input
            type="text"
            onChange={(e)=>setText(e.target.value)}
            placeholder={placeholders[index]}
            className={`flex-1 outline-none text-sm sm:text-base ${
              animate ? "animate-placeholderUp" : ""
            }`}
          />
          <FiSend
            className={`text-xl cursor-pointer transition duration-200 
              ${text.trim().length > 0 ? "text-black" : "text-gray-300 cursor-default"}
            `}
            onClick={() => {
              if (text.trim().length > 0) {
                console.log("Submitted:", text);
              }
            }}
          />
        </div>
      </div>

    </div>
  );
}
