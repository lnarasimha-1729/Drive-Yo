import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {ChevronDown} from "lucide-react"

export default function Car_details() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Chat History
  const [messages, setMessages] = useState([]);

  const [showPremiumAlert, setShowPremiumAlert] = useState(false);


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

  const resetFlow = () => {
    setMessages([]);
    setStep(0);
    setShowEstimate(false);
    setNegotiationAnswer(null);
    setShowPremiumAlert(false);

    setVehicleDetails({
      make: "",
      model: "",
      trim: "",
      zip: "",
    });

    setIncentives({
      military: false,
      aaa: false,
      loyalty: false,
    });

    setLeaseTerm(null);
    setMiles(null);
  };


  const [leaseTerm, setLeaseTerm] = useState(null);
  const [miles, setMiles] = useState(null);
  const [negotiationChoice, setNegotiationChoice] = useState(null);
  const [negotiationAnswer, setNegotiationAnswer] = useState(null);


  const [step, setStep] = useState(0);
  const STEP_ESTIMATE = 33;
  const [showEstimate, setShowEstimate] = useState(false);



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
    // Show estimate section
    setShowEstimate(true);

    // Messages before estimate
    addMessage("YO", "Thank you for your responses.");
    addMessage(
      "YO",
      "Based on your profile, Here's your estimated payment range:"
    );

    // ⏱️ Small delay feels natural (optional but recommended)
    setTimeout(() => {
      setStep(4); // <-- THIS ENABLES STEP 4 UI
    }, 300);
  };


  const showPremium = () => {
    setStep(5);
    addMessage("YO", "Become a premium member to know which parameter to negotiate.");
  };

  console.log(messages);

  const parseVehicleMessage = (text) => {
  if (!text.startsWith("Make:")) return null;

  return {
    make: text.match(/Make:\s([^ ]+)/)?.[1],
    model: text.match(/Model:\s([^ ]+)/)?.[1],
    trim: text.match(/Trim:\s([^ —]+)/)?.[1],
    zip: text.match(/Zip:\s(\d+)/)?.[1],
  };
};



  return (
    <div className="relative flex flex-col lg:pt-10 bg-[#fafafa] w-full max-w-[50rem] h-screen">


      {/* CHAT AREA */}
      <div
        ref={scrollRef}
        className="
    flex-1 overflow-y-auto
    px-4 sm:px-6 md:px-8
    pb-24 mt-16 sm:mt-16 lg:mt-0
  "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >

        {/* STEP 0 — VEHICLE DETAILS */}
        {step === 0 && (
          <>
            <div className="text-[0.875rem] text-black font-medium mb-4 md:mt-4">
              Tell us about the vehicle you're interested in, and we'll help you analyze your lease instantly.
            </div>

            <div className="bg-white text-xs sm:text-xs lg:text-[0.875rem] shadow rounded-xl p-6 sm:p-8 md:p-6 lg:p-5 w-full max-w-sm mb-4">
              <p className="text-[1rem] md:text-[1.065rem] lg:text-[1rem] xl:text-[1rem] mb-4 font-semibold">Select Car Details</p>

              {/* FIELD WRAPPER */}
              <div className="space-y-3">

                {/* MAKE */}
                <div className="flex flex-col gap-1">
                  <label className="text-[0.875rem] font-medium">Make</label>
                  <div className="relative">
                    <select
                      className="
            w-full border border-gray-300 rounded-xl px-3 py-3 text-[0.875rem]
            appearance-none cursor-pointer
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
                    <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
      />
                  </div>
                </div>

                {/* MODEL */}
                <div className="flex flex-col gap-1">
                  <label className="text-[0.875rem] font-medium">Model</label>
                  <div className="relative">
                    <select
                      className="
            w-full border border-gray-300 rounded-xl px-3 py-3 text-[0.875rem]
            appearance-none cursor-pointer
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
                    <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
      />
                  </div>
                </div>

                {/* TRIM */}
                <div className="flex flex-col gap-1">
                  <label className="text-[0.875rem] font-medium">Trim</label>
                  <div className="relative">
                    <select
                      className="
            w-full border border-gray-300 rounded-xl px-3 py-3 text-[0.875rem]
            appearance-none cursor-pointer
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
                    <ChevronDown
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
      />
                  </div>
                </div>

                {/* ZIP CODE */}
                <div className="flex flex-col gap-1">
                  <label className="text-[0.875rem] font-medium">Zip Code</label>
                  <input
                    className="
          w-full border border-gray-300 rounded-xl px-3 py-3 text-[0.875rem]
         focus:outline-none focus:ring-2 focus:ring-black/70 focus:border-black
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
      mt-4 bg-black text-white w-full py-3 sm:py-3 lg:py-3 rounded-lg text-[0.875rem] font-medium
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
                      `Make: ${vehicleDetails.make} Model: ${vehicleDetails.model} Trim: ${vehicleDetails.trim} — Zip: ${vehicleDetails.zip}`
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
        {messages.map((msg, idx) => {
  const vehicleData = parseVehicleMessage(msg.text);

  return (
    <div key={idx} className="mb-4">
      {msg.sender === "YO" ? (
        <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-8 md:h-8 bg-black text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 leading-none">

                  YO
                </div>
                <p className="text-[0.875rem]">{msg.text}</p>
              </div>
      ) : (
        <div className="flex justify-end gap-2">
          {vehicleData ? (
            <><div className="bg-gray-200 px-4 py-3 rounded-xl space-y-1 text-[0.875rem]">
                <div>Make: {vehicleData.make}</div>
                <div>Model: {vehicleData.model}</div>
                <div>Trim: {vehicleData.trim}</div>
                <div>Zip: {vehicleData.zip}</div>
              </div>
              <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-[0.875rem]">S</div></>

          ) : (
            <span className="bg-gray-200 px-3 py-2 rounded-lg text-[0.875rem]">
              {msg.text}
            </span>
          )}
        </div>
      )}
    </div>
  );
})}


        {/* STEP 1 — INCENTIVES */}
        {step === 1 && (
          <div className="ml-11 my-8 mb-44 space-y-4 w-full">
            {[
              { label: "Are you a military personnel?", key: "military" },
              { label: "Do you own AAA membership?", key: "aaa" },
              { label: "Do you have a loyalty pass?", key: "loyalty" },
            ].map((item) => (
              <label key={item.key} className="flex items-center gap-3 text-[0.875rem]">
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
              className="mt-3 bg-black text-white px-5 py-2 rounded-lg text-[0.875rem] cursor-pointer"
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
                className="px-4 py-2 border rounded-lg text-[0.875rem] cursor-pointer"
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
                className="px-4 py-2 border rounded-lg text-[0.875rem] cursor-pointer"
                onClick={() => {
                  addMessage("USER", m);
                  setMiles(m);

                  addMessage("YO", "Thank you for your responses.");
                  addMessage(
                    "YO",
                    "Based on your profile, Here's your estimated payment range:"
                  );

                  setShowEstimate(true);
                  setStep(4); // immediate, single render
                }}>

                {m}
              </button>
            ))}
          </div>
        )}

        {/* ESTIMATED PAYMENT RANGE — PERSISTENT */}
        {showEstimate && (

          <div className="ml-11 my-6 max-w-fit">
            <div className="bg-green-100 rounded-xl text-[0.875rem] lg:text-base px-6 py-5 flex flex-col sm:flex-row gap-8">

              <div className="flex-1">
                <p className="text-[0.875rem] text-gray-700 mb-1">
                  Down Payment Range
                </p>
                <p className="text-green-600 font-semibold text-[0.875rem] lg:text-base">
                  $2,500 – $4,500
                </p>
              </div>

              <div className="flex-1">
                <p className="text-[0.875rem] text-gray-700 mb-1">
                  Lease Range (Monthly)
                </p>
                <p className="text-green-600 font-semibold text-[0.875rem] lg:text-base">
                  $250 – $350
                </p>
              </div>
            </div>
          </div>
        )}

        {step >= 4 && (
          <div className="my-6 space-y-4">

            {/* YO Question */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-8 lg:w-8 2xl:w-8 bg-black text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 leading-none">
                YO
              </div>
              <p className="text-[0.875rem]">
                Would you like us to help you find the best possible deal by contacting multiple dealers on your behalf?
              </p>
            </div>

            {/* USER ANSWER — INLINE (NOT GLOBAL CHAT) */}
            {negotiationAnswer && (
              <div className="flex justify-end items-center gap-2">
                <span className="text-[0.875rem] bg-gray-200 px-3 py-2 rounded-lg">
                  {negotiationAnswer}
                </span>
                <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-[0.875rem]">
                  S
                </div>
              </div>
            )}

            {/* Buttons */}
            {!negotiationAnswer && (
              <div className="ml-11 flex gap-4 text-[0.875rem]">
                <button
                  className="px-4 lg:px-8 py-2 bg-black text-white rounded-lg"
                  onClick={() => {
                    setNegotiationAnswer("Yes");
                    setShowPremiumAlert(true); // 🚫 STOP FLOW HERE
                  }}
                >
                  Yes
                </button>
                
                <button
                  className="px-4 lg:px-8 py-2 border border-black rounded-lg"
                  onClick={() => {
                    addMessage("USER", "No");
                    resetFlow();
                  }}
                >
                  No
                </button>

              </div>
            )}
          </div>
        )}

        {/* STEP 5 — PREMIUM CTA */}
        {step >= 5 && (
          <div className="my-6 space-y-4 max-w-lg">

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs">
                YO
              </div>
              <p className="text-[0.875rem]">
                Get your best deal — unlock premium and secure the best possible price.
                The amount will be fully refunded once you close the deal on your vehicle.
              </p>
            </div>

            <div className="ml-11 flex gap-4 text-[0.875rem]">
              <button
                onClick={() => navigate("/yo-premium")}
                className="px-4 lg:px-8 py-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-50"
              >
                Go Premium
              </button>

              <button
                onClick={() => navigate("/manual")}
                className="px-4 lg:px-8 py-2 border border-black rounded-lg"
              >
                New Lease Verification
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM INPUT BAR */}
      <div className="sticky inset-x-0 bottom-12 z-10 bg-gradient-to-t from-[#fafafa] via-[#fafafa] to-transparent">
        <div className="mx-auto max-w-[50rem] px-4 py-6">
          <div
            className="
        flex items-center gap-3
        bg-white border border-gray-300 rounded-full
        px-6 py-4
        shadow-sm
      "
          >
            <input
              type="text"
              placeholder="Ask DriveYo"
              className="
          flex-1 outline-none bg-transparent
          text-[0.875rem] lg:text-base
          placeholder:text-gray-400
        "
            />
            <FiSend className="text-xl cursor-pointer text-gray-600" />
          </div>
        </div>
      </div>

      {showPremiumAlert && (
        <div className="fixed inset-0 bg-black/40 z-[30] flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 shadow-xl text-center">
            <h2 className="text-lg font-semibold mb-2">
              Premium Feature
            </h2>

            <p className="text-[0.875rem] text-gray-600 mb-4">
              Dealer negotiation is a premium feature.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => navigate("/yo-premium")}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Go Premium
              </button>
              <button
                onClick={() => setShowPremiumAlert(false)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}