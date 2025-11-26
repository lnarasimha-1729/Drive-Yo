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
    addMessage("YO", "Based on your quotation, the below incentives are applicable.");
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
    addMessage("YO", "However, there is still room for negotiation. You can save up to $49.");
  };

  const showPremium = () => {
    setStep(5);
    addMessage("YO", "Become a premium member to know which parameter to negotiate.");
  };

  return (
    <div className="flex flex-col lg:items-end h-screen bg-[#fafafa] lg:w-[85%]">

      {/* CHAT AREA */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 xl:px-40 pb-32 mt-14 lg:min-w-3xl"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >

        {/* STEP 0 — VEHICLE DETAILS */}
        {step === 0 && (
          <div className="bg-white text-xs shadow rounded-xl p-6 sm:p-8 lg:p-5 w-full max-w-sm mb-10">
            <p className="text-sm mb-4 font-semibold">Select Car Details</p>

            <label className="text-sm font-semibold">Make</label>
            <select
              className="w-full border rounded-lg px-3 py-1.5 mt-1 mb-2"
              value={vehicleDetails.make}
              onChange={(e) =>
                setVehicleDetails({ ...vehicleDetails, make: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="BMW">BMW</option>
              <option value="Audi">Audi</option>
            </select>

            <label className="text-sm font-semibold">Model</label>
            <select
              className="w-full border rounded-lg px-3 py-1.5 mt-1 mb-2"
              value={vehicleDetails.model}
              onChange={(e) =>
                setVehicleDetails({ ...vehicleDetails, model: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="330i">330i</option>
              <option value="X5">X5</option>
            </select>

            <label className="text-sm font-semibold">Trim</label>
            <select
              className="w-full border rounded-lg px-3 py-1.5 mt-1 mb-2"
              value={vehicleDetails.trim}
              onChange={(e) =>
                setVehicleDetails({ ...vehicleDetails, trim: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="Base">Base</option>
              <option value="Sport">Sport</option>
            </select>

            <label className="text-sm font-semibold">Zip Code</label>
            <input
              className="w-full border rounded-lg px-3 py-1.5 mt-1"
              placeholder="90120"
              value={vehicleDetails.zip}
              onChange={(e) =>
                setVehicleDetails({ ...vehicleDetails, zip: e.target.value })
              }
            />
          </div>
        )}

        {/* CHAT HISTORY */}
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-4">
            {msg.sender === "YO" ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">YO</div>
                <p className="text-sm">{msg.text}</p>
              </div>
            ) : (
              <div className="flex justify-end items-center gap-2">
                <span className="text-sm bg-gray-200 px-3 py-2 rounded-lg">{msg.text}</span>
                <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm">S</div>
              </div>
            )}
          </div>
        ))}

        {/* STEP 1 — INCENTIVES */}
        {step === 1 && (
          <div className="ml-11 my-4 space-y-4">
            {[
              { label: "Are you a military personnel?", key: "military" },
              { label: "Do you own AAA membership?", key: "aaa" },
              { label: "Do you have a loyalty pass?", key: "loyalty" },
            ].map((item) => (
              <label key={item.key} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4"
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
                  `Military: ${incentives.military ? "Yes" : "No"}, AAA: ${
                    incentives.aaa ? "Yes" : "No"
                  }, Loyalty: ${incentives.loyalty ? "Yes" : "No"}`
                );
                askLeaseTerm();
              }}
              className="mt-3 bg-black text-white px-5 py-2 rounded-lg text-sm"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2 — LEASE TERM */}
        {step === 2 && (
          <div className="flex flex-wrap gap-3 mb-8 ml-11">
            {["12 months", "24 months", "36 months"].map((term) => (
              <button
                key={term}
                className="px-4 py-2 border rounded-lg text-sm"
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
          <div className="flex flex-wrap gap-3 mb-8 ml-11">
            {["10,000", "12,000", "15,000"].map((m) => (
              <button
                key={m}
                className="px-4 py-2 border rounded-lg text-sm"
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
          <div className="flex gap-4 ml-11 my-4">
            <button
              className="text-sm px-8 py-2 bg-black text-white rounded-lg"
              onClick={() => {
                addMessage("USER", "Yes, I want to negotiate");
                showPremium();
              }}
            >
              Negotiate
            </button>

            <button
              className="text-sm px-8 py-2 border border-black rounded-lg"
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
          <div className="flex gap-4 ml-11 mt-4">
            <button
              onClick={() => navigate("/yo")}
              className="px-8 py-2 rounded-lg bg-green-100 text-green-700 border border-green-600"
            >
              Go Premium
            </button>

            <button
              className="px-8 py-2 border border-black rounded-lg"
              onClick={() => navigate("/manual")}
            >
              Open New Chat
            </button>
          </div>
        )}

      </div>

      {/* BOTTOM INPUT */}
      <div className="bottom-0 left-0 w-full flex justify-end px-4 pb-18 bg-gradient-to-t from-[#fafafa] lg:max-w-3xl">
        <div className="flex items-center gap-3 w-full sm:w-[90%] md:w-[70%] lg:w-full xl:w-[40%] bg-white border border-gray-300 rounded-full px-4 py-4 shadow-sm">

          <input
            type="text"
            placeholder="Ask DriveYo"
            className="flex-1 outline-none text-gray-600 text-sm"
          />

          <FiSend
            className="text-xl cursor-pointer ml-3 text-gray-600"
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
        </div>
      </div>

    </div>
  );
}
