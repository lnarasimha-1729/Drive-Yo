import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Manual() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Chat History
  const [messages, setMessages] = useState([]);

  // Form Data
  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    model: "",
    trim: "",
    zip: "",
  });

  const [incentives, setIncentives] = useState({
    military: false,
    aaa: false,
    loyalty: false,
  });

  const [leaseTerm, setLeaseTerm] = useState(null);
  const [miles, setMiles] = useState(null);
  const [negotiationChoice, setNegotiationChoice] = useState(null);

  const [step, setStep] = useState(0);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const startFlow = () => {
    setStep(1);
    addMessage("YO", "Based on your car details, the below incentives are applicable.");
    addMessage("YO", "Please choose yes/no for the following:");
  };

  const askLeaseTerm = () => {
    setStep(2);
    addMessage("YO", "What lease term do you prefer?");
  };

  const askMiles = () => {
    setStep(3);
    addMessage("YO", "How many miles per year?");
  };

  const showAnalysisAndNegotiation = () => {
    setStep(4);

    addMessage("YO", "Analyzing the quote...");
    addMessage("YO", "This is a GOOD deal!");
    addMessage("YO", "However, there is still room for negotiation. You can save up to $499.");
  };

  const showPremium = () => {
    setStep(5);
    addMessage("YO", "Become a premium member to know which parameter to negotiate.");
  };

  return (
    <div className="flex flex-col lg:items-center h-screen p-4 lg:p-0 bg-[#fafafa] lg:w-[100%]">

      {/* CHAT AREA */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 xl:px-40 mt-14 pb-4 lg:min-w-[70%]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >

        {/* STEP 0 — VEHICLE DETAILS */}
        {step === 0 && (
          <>
            <div className="text-sm text-gray-600 mb-4 ml-1">
              Tell us about the vehicle you're interested in, and we'll help you analyze your lease instantly.

            </div>

            <div className="bg-white text-sm shadow rounded-xl p-6 sm:p-8 lg:p-5 w-full max-w-sm mb-4">
              <p className="text-sm mb-4 font-semibold">Select Car Details</p>

              {/* FIELD WRAPPER */}
              <div className="space-y-2 h-64">

                {/* MAKE */}
                <div>
                  <label className="text-sm font-medium">Make</label>
                  <div className="relative mt-1">
                    <select
                      className="
            w-full border border-gray-300 rounded-lg px-3 py-2
            appearance-none cursor-pointer bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-black/70 focus:border-black
            hover:bg-gray-100 transition
          "
                      value={vehicleDetails.make}
                      onChange={(e) =>
                        setVehicleDetails({ ...vehicleDetails, make: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      <option value="BMW">BMW</option>
                      <option value="Audi">Audi</option>
                    </select>

                    {/* Chevron Icon */}
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>

                {/* MODEL */}
                <div>
                  <label className="text-sm font-medium">Model</label>
                  <div className="relative mt-1">
                    <select
                      className="
            w-full border border-gray-300 rounded-lg px-3 py-2
            appearance-none cursor-pointer bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-black/70 focus:border-black
            hover:bg-gray-100 transition
          "
                      value={vehicleDetails.model}
                      onChange={(e) =>
                        setVehicleDetails({ ...vehicleDetails, model: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      <option value="330i">330i</option>
                      <option value="X5">X5</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>

                {/* TRIM */}
                <div>
                  <label className="text-sm font-medium">Trim</label>
                  <div className="relative mt-1">
                    <select
                      className="
            w-full border border-gray-300 rounded-lg px-3 py-2
            appearance-none cursor-pointer bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-black/70 focus:border-black
            hover:bg-gray-100 transition
          "
                      value={vehicleDetails.trim}
                      onChange={(e) =>
                        setVehicleDetails({ ...vehicleDetails, trim: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      <option value="Base">Base</option>
                      <option value="Sport">Sport</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
                      ▼
                    </div>
                  </div>
                </div>

                {/* ZIP CODE */}
                <div>
                  <label className="text-sm font-medium">Zip Code</label>
                  <input
                    className="
          w-full border border-gray-300 rounded-lg px-3 py-2 mt-1
          bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/70 focus:border-black
          hover:bg-gray-100 transition
        "
                    placeholder="90120"
                    value={vehicleDetails.zip}
                    onChange={(e) =>
                      setVehicleDetails({ ...vehicleDetails, zip: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* APPLY BUTTON */}
              <button
                disabled={
                  !(
                    vehicleDetails.make &&
                    vehicleDetails.model &&
                    vehicleDetails.trim &&
                    vehicleDetails.zip
                  )
                }
                className="
      mt-6 bg-black text-white w-full py-2.5 rounded-lg text-sm font-medium
      disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
      transition active:scale-[0.98]
    "
                onClick={() => {
                  if (
                    vehicleDetails.make &&
                    vehicleDetails.model &&
                    vehicleDetails.trim &&
                    vehicleDetails.zip
                  ) {
                    addMessage(
                      "USER",
                      `${vehicleDetails.make} ${vehicleDetails.model} (${vehicleDetails.trim}) — Zip: ${vehicleDetails.zip}`
                    );
                    startFlow();
                  }
                }}
              >
                APPLY
              </button>
            </div>
          </>

        )}


        {/* CHAT HISTORY */}
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-4">
            {msg.sender === "YO" ? (
              <div className="flex items-center gap-3">
                <div
                  className="
    flex-shrink-0 aspect-square
    w-8 h-8 sm:w-8 sm:h-8
    rounded-full flex items-center justify-center
    text-xs sm:text-sm font-semibold leading-none uppercase select-none
    bg-black text-white
  "
                >
                  YO
                </div>
                <p className="text-sm break-">{msg.text}</p>
              </div>
            ) : (
              <div className="flex justify-end items-center gap-2 mb-10">
                <span className="text-sm bg-gray-200 px-3 py-2 rounded-lg">{msg.text}</span>
                <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm">S</div>
              </div>
            )}
          </div>
        ))}

        {/* STEP 1 — INCENTIVES */}
        {step === 1 && (
          <div className="ml-11 my-8 space-y-4">
            {[
              { label: "Are you a military personnel?", key: "military" },
              { label: "Do you own AAA membership?", key: "aaa" },
              { label: "Do you have a loyalty pass?", key: "loyalty" },
            ].map((item) => (
              <label key={item.key} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={incentives[item.key]}
                  onChange={(e) =>
                    setIncentives((prev) => ({
                      ...prev,
                      [item.key]: e.target.checked,
                    }))
                  }
                />
                {item.label}
              </label>
            ))}

            <button
              onClick={() => {
                addMessage(
                  "USER",
                  `Military: ${incentives.military ? "Yes" : "No"}, AAA: ${incentives.aaa ? "Yes" : "No"
                  }, Loyalty: ${incentives.loyalty ? "Yes" : "No"}`
                );
                askLeaseTerm();
              }}
              className="mt-3 bg-black text-white px-5 py-2 rounded-lg text-sm cursor-pointer"
            >
              Analyze
            </button>
          </div>
        )}

        {/* STEP 2 — LEASE TERM */}
        {step === 2 && (
          <div className="flex flex-wrap gap-3 mb-14 ml-11">
            {["12 months", "24 months", "36 months"].map((term) => (
              <button
                key={term}
                className="px-4 py-2 border rounded-lg text-sm cursor-pointer"
                onClick={() => {
                  addMessage("USER", term);
                  setLeaseTerm(term);
                  askMiles();
                }}
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* STEP 3 — MILES */}
        {step === 3 && (
          <div className="flex flex-wrap gap-3 mb-14 ml-11">
            {["10,000", "12,000", "15,000"].map((m) => (
              <button
                key={m}
                className="px-4 py-2 border rounded-lg text-sm cursor-pointer"
                onClick={() => {
                  addMessage("USER", m);
                  setMiles(m);
                  showAnalysisAndNegotiation(); // <-- NEGOTIATE COMES NOW
                }}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        {/* STEP 4 — NEGOTIATE NOW */}
        {step === 4 && (
          <div className="flex gap-4 ml-11 my-4 text-sm">
            <button
              className="text-sm px-4 lg:px-8 py-2 bg-black text-white rounded-lg cursor-pointer"
              onClick={() => {
                addMessage("USER", "Yes, I want to negotiate");
                showPremium();
              }}
            >
              Negotiate
            </button>

            <button
              className="text-sm px-4 lg:px-8 py-2 border border-black rounded-lg cursor-pointer text-nowrap"
              onClick={() => {
                addMessage("USER", "No, I'm fine");
                navigate("/manual");
              }}
            >
              Open New Chat
            </button>
          </div>
        )}

        {/* STEP 5 — PREMIUM */}
        {step === 5 && (
          <div className="flex gap-4 ml-11 mt-0 text-sm">
            <button
              onClick={() => navigate("/yo")}
              className="px-4 lg:px-8 py-0 rounded-lg text-yellow-500 border border-yellow-500 cursor-pointer text-nowrap"
            >
              Go Premium
            </button>

            <button
              className="px-4 lg:px-8 py-2 border border-black rounded-lg cursor-pointer text-nowrap"
              onClick={() => navigate("/manual")}
            >
              Open New Chat
            </button>
          </div>
        )}

      </div>

      {/* BOTTOM INPUT */}
      <div className="w-full flex justify-center px-2 pb-0 lg:pb-16 bg-gradient-to-t from-[#fafafa] lg:max-w-[65%]">
        <div
          className="
      flex items-center gap-3
      w-full min-w-[80%]
      bg-white border border-gray-300 rounded-full 
      px-4 py-2 shadow-sm
    ">

          <input
            type="text"
            placeholder="Ask DriveYo"
            className="flex-1 outline-none text-black text-sm lg:text-base h-9 pl-3 placeholder:text-[1rem] placeholder:text-gray-400"
          />

          <div className="relative group">
            <FiSend
              className="text-xl cursor-pointer text-gray-600"
              onClick={() => {
                if (
                  step === 0 &&
                  vehicleDetails.make &&
                  vehicleDetails.model &&
                  vehicleDetails.trim &&
                  vehicleDetails.zip
                ) {
                  addMessage(
                    "USER",
                    `${vehicleDetails.make} ${vehicleDetails.model} (${vehicleDetails.trim}) — Zip: ${vehicleDetails.zip}`
                  );
                  startFlow();
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
