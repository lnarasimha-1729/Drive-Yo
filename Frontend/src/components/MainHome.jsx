import React, {useState, useEffect} from "react";
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

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholders.length);
        setAnimate(false);     // reset
      }, 300);
    }, 2500); // change every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#fafafa] px-4 md:px-8 min-h-screen">

      {/* center section */}
      <div className="
        flex flex-col items-center text-center 
        !mt-5 md:mt-16 
        mx-2 md:mx-0 !mr-16
      ">
        <p className="text-xl md:text-2xl font-bold mb-4">
          Welcome to DriveYo
        </p>

        <p className="text-sm md:text-base text-gray-600 max-w-xl md:max-w-2xl mb-10">
          DriveYo your car leasing assistant. Get the best deals,
          validate quotes, and negotiate with dealerships.
        </p>

        {/* white card */}
        <div className="
          bg-white px-8 py-6 rounded-xl shadow 
          max-w-md md:max-w-xl mt-4
        ">
          <p className="text-md font-semibold mb-6">
            Do you have a dealer quote already?
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
            <button
              onClick={() => navigate("/quote")}
              className="
                px-2 py-2 bg-black text-white rounded-lg 
                text-xs font-medium cursor-pointer
              "
            >
              Yes I have a quote
            </button>

            <button
              onClick={() => navigate("/manual")}
              className="
                px-2 py-2 border-2 border-black rounded-lg 
                text-xs font-medium cursor-pointer
              "
            >
              No, I need help finding a car
            </button>
          </div>
        </div>
      </div>

      {/* bottom input */}
      <div className="flex justify-center mt-10 md:mt-16 mr-14 pb-10">
      <div className="
        flex items-center 
        w-full max-w-xl md:max-w-2xl 
        bg-white border border-gray-300 rounded-full px-6 py-3 shadow
      ">
        <input
          type="text"
          placeholder={placeholders[index]}
          className={`flex-1 outline-none text-sm md:text-base ${
            animate ? "animate-placeholderUp" : ""
          }`}
        />
        <FiSend className="text-gray-600 text-xl cursor-pointer" />
      </div>
    </div>

    </div>
  );
}
