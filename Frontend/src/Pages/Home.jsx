import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const placeholders = [
    "Ask DriveYo anything...",
    "Compare car deals...",
    "Check hidden charges...",
    "Negotiate with dealerships..."
  ];

  const [text, setText] = useState("");
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
    <div className="flex flex-col justify-center md:justify-center bg-[#fafafa] max-w-3/4 lg:max-w-1/2 min-h-screen">

      {/* Center Section */}
      <div className="flex flex-col items-center text-center gap-4">

        <h3 className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] xl:text-[2.25rem] font-medium">
          Welcome to DriveYo
        </h3>

        <p className="
          text-[0.875rem] md:text-[0.9rem] lg:text-[1.5rem] xl:text-[1rem] text-gray-600
           mb-4
        ">
          DriveYo, your car leasing assistant. Get the best deals, validate quotes,
          and negotiate with dealerships effortlessly.
        </p>

        {/* White Card */}
        <div className="
          bg-white px-5 py-6 sm:px-8 rounded-xl shadow-sm
        ">
          <p className="text-[1rem] md:text-[1.1rem] lg:text-[1.125rem] xl:text-[1.125rem] font-semibold mb-4">
            Do you have a dealer quote already?
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() =>
                navigate("/quotation-upload", { state: { autoOpenUpload: true } })
              }
              className="
                px-4 py-3 lg:py-2 xl:py-1 bg-black text-white rounded-lg 
                text-[0.875rem] md:text-[0.875rem] lg:text-[0.875rem] xl:text-[0.875rem] font-medium cursor-pointer
                hover:opacity-80 transition lg:text-nowrap
              "
            >
              Yes, I have a quote
            </button>

            <button
              onClick={() => navigate("/car-details")}
              className="
                px-4 py-2.5 lg:py-3 border-2 border-black rounded-lg 
                text-[0.875rem] md:text-[0.875rem] lg:text-[0.875rem] xl:text-[0.875rem] font-medium cursor-pointer lg:text-nowrap
              "
            >
              No, I need help finding a car
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Input */}
      <div className="flex justify-center mt-10 md:mt-16 pb-10">
        <div
          className="
            flex items-center 
            min-w-full
            bg-white border border-gray-300 rounded-full
            px-4 sm:px-6 py-3 shadow lg:h-14
          "
        >
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholders[index]}
            className={`
              flex-1 outline-none
              text-sm sm:text-base md:text-lg
              2xl:py-1.5
              ${animate ? "animate-placeholderUp" : ""}
            `}
          />

          <div className="relative group">
            <FiSend
              className={`
                text-xl md:text-2xl cursor-pointer transition duration-200 
                ${text.trim().length > 0 ? "text-black" : "text-gray-300 cursor-default"}
              `}
              onClick={() => {
                if (text.trim().length > 0) {
                  console.log("Submitted:", text);
                }
              }}
            />

            <span className="
              absolute left-1/2 -translate-x-1/2 -top-7 
              bg-black text-white text-xs px-2 py-1 rounded 
              opacity-0 group-hover:opacity-100 
              transition-all
            ">
              Send
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
