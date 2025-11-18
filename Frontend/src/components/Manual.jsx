import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Manual() {
  const scrollRef = useRef(null);

  const navigate = useNavigate()

  // Step controller
  const [step, setStep] = useState(0);

  // Vehicle details
  const [vehicleDetails, setVehicleDetails] = useState({
    make: "",
    model: "",
    trim: "",
    zip: ""
  });

  // Lease term
  const [leaseTerm, setLeaseTerm] = useState(null);

  // Miles
  const [userMiles, setUserMiles] = useState(null);

  // Status selection
  const [userStatus, setUserStatus] = useState(null);

  // Negotiation choice (Yes / No)
  const [negotiationChoice, setNegotiationChoice] = useState(null);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [step, leaseTerm, userMiles, userStatus, negotiationChoice]);

  return (
    <div className="flex flex-col h-screen bg-[#fafafa] mt-5">

      {/* Back */}
      <div
        className="py-4 text-gray-600 text-sm ml-4 cursor-pointer"
        onClick={() => window.history.back()}
      >
        back
      </div>

      {/* SCROLL AREA */}
      <div ref={scrollRef} className="flex-1 overflow-y-scroll w-[90%] px-28 pb-40">

        {/* STEP 0 — Vehicle Details */}
        {step === 0 && (
          <div className="bg-white shadow rounded-xl p-8 w-full max-w-[600px] mb-10">

            <label className="text-sm font-semibold">Make</label>
            <select
              className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
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
              className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
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
              className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
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
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="90120 (LA)"
              value={vehicleDetails.zip}
              onChange={(e) =>
                setVehicleDetails({ ...vehicleDetails, zip: e.target.value })
              }
            />
          </div>
        )}

        {/* STEP 1 — YO Message */}
        {step >= 1 && (
          <div className="flex items-center gap-3 mb-6 mt-3">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
              YO
            </div>
            <span className="text-sm">Great, I've got your vehicle details.</span>
          </div>
        )}

        {/* STEP 1.5 — Lease Term Question (render once step >= 1) */}
        {step >= 1 && (
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
                YO
              </div>
              <span className="text-sm font-semibold">What lease term do you prefer?</span>
            </div>

            <div className="flex gap-3 mb-8 cursor-pointer ml-12">
              {["12 months", "24 months", "36 months"].map((term) => {
                const selected = leaseTerm === term;
                return (
                  <button
                    key={term}
                    disabled={!!leaseTerm}
                    onClick={() => {
                      if (!leaseTerm) {
                        setLeaseTerm(term);
                        setTimeout(() => setStep(2), 200); // move to next question
                      }
                    }}
                    className={
                      "px-4 py-2 border rounded-lg text-sm " +
                      (selected ? "bg-gray-100 border-gray-400 font-medium" : "")
                    }
                  >
                    {term}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* USER BUBBLE — Lease Term (right) */}
        {leaseTerm && (
          <div className="flex justify-end items-center gap-2 mb-10 mr-4">
            <span className="text-sm">{leaseTerm}</span>
            <div className="w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded-full text-sm">
              S
            </div>
          </div>
        )}

        {/* STEP 2 — Miles Question (render once step >=2) */}
        {step >= 2 && (
          <>
            <div className="flex items-center gap-3 mb-3 mt-6">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
                YO
              </div>
              <span className="text-sm font-semibold">
                How many miles do you typically drive per month?
              </span>
            </div>

            <div className="flex gap-3 cursor-pointer mb-8 ml-12">
              {["10,000", "12,000", "15,000"].map((miles) => {
                const selected = userMiles === miles;
                return (
                  <button
                    key={miles}
                    disabled={!!userMiles}
                    onClick={() => {
                      if (!userMiles) {
                        setUserMiles(miles);
                        setTimeout(() => setStep(3), 200);
                      }
                    }}
                    className={
                      "px-4 py-2 border rounded-lg text-sm " +
                      (selected ? "bg-gray-100 border-gray-400 font-medium" : "")
                    }
                  >
                    {miles}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* USER BUBBLE — Miles */}
        {userMiles && (
          <div className="flex justify-end items-center gap-2 mb-10 mr-4">
            <span className="text-sm">{userMiles}</span>
            <div className="w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded-full text-sm">
              S
            </div>
          </div>
        )}

        {/* STEP 3 — Status Question (render once step >=3) */}
        {step >= 3 && (
          <>
            <div className="flex items-center gap-3 mb-3 mt-4">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
                YO
              </div>
              <span className="text-sm font-semibold">Please select your status.</span>
            </div>

            <div className="flex gap-3 mb-8 ml-12 cursor-pointer">
              {["Military", "Loyalty", "AAA", "N/A"].map((st) => {
                const selected = userStatus === st;
                return (
                  <button
                    key={st}
                    disabled={!!userStatus}
                    onClick={() => {
                      if (!userStatus) {
                        setUserStatus(st);
                        setTimeout(() => setStep(4), 200);
                      }
                    }}
                    className={
                      "px-4 py-2 border rounded-lg text-sm " +
                      (selected ? "bg-gray-100 border-gray-400 font-medium" : "")
                    }
                  >
                    {st}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* USER BUBBLE — Status */}
        {userStatus && (
          <div className="flex justify-end items-center gap-2 mb-10 mr-4">
            <span className="text-sm">{userStatus}</span>
            <div className="w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded-full text-sm">
              S
            </div>
          </div>
        )}

        {/* Next steps (example analyzing & Good Deal) — only shown after status */}
        {step >= 4 && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
                YO
              </div>
              <span className="text-sm">Analyzing the quote</span>
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>

            <div className="flex items-center gap-3 mb-4 mt-3">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">YO</div>
              <span className="text-sm">
                This is a <span className="text-green-600 font-bold">Good Deal!</span>
              </span>
            </div>
          </>
        )}

        {/* Negotiation Question — shows buttons and keeps question visible */}
        {step >= 4 && (
          <>
            <div className="flex items-center gap-3 mb-3 mt-4">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
                YO
              </div>
              <span className="text-sm">
                However, there is still a room for further negotiation.
              </span>
            </div>

            {/* Buttons remain visible */}
            <div className="flex gap-4 ml-12 mb-8">
              <button
                className={
                  "px-6 py-2 border rounded-lg text-sm cursor-pointer " +
                  (negotiationChoice === "Yes" ? "bg-gray-100 border-gray-400" : "")
                }
                onClick={() => {
                  if (!negotiationChoice) {
                    setNegotiationChoice("Yes");
                    setTimeout(() => setStep(5), 200);
                  }
                }}
              >
                Yes
              </button>

              <button
  className={
    "px-6 py-2 border rounded-lg cursor-pointer text-sm " +
    (negotiationChoice === "No" ? "bg-gray-100 border-gray-400" : "")
  }
  onClick={() => {
    setNegotiationChoice("No");

    setTimeout(() => {
      // RESET EVERYTHING
      setVehicleDetails({
        make: "",
        model: "",
        trim: "",
        zip: ""
      });
      setLeaseTerm(null);
      setUserMiles(null);
      setUserStatus(null);
      setNegotiationChoice(null);
      setStep(0);    // Go back to START
    }, 200);
  }}
>
  No
</button>

            </div>
          </>
        )}

        {/* User bubble for negotiation choice */}
        {negotiationChoice && (
          <div className="flex justify-end items-center gap-2 mb-10 mr-4">
            <span className="text-sm">{negotiationChoice}</span>
            <div className="w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded-full text-sm">
              S
            </div>
          </div>
        )}

        {/* Premium suggestion after choice */}
        {step >= 5 && (
          <>
            <div className="flex items-center gap-3 mb-3 mt-4">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
                YO
              </div>
              <span className="text-sm">
                Become a premium member to know which parameter to negotiate.
              </span>
            </div>


            <div onClick={()=>navigate("/yo")} className="ml-12 text-green-600 font-semibold underline cursor-pointer">
              Go Premium
            </div>
          </>
        )}
      </div>


      {/* BOTTOM INPUT */}
      <div className="fixed bottom-0 left-0 w-[80%] flex justify-center pb-6 ml-50">
  <div className="flex items-center w-[70%] bg-white border border-gray-300 rounded-full px-4 py-3 shadow-sm">

    <input
      type="text"
      placeholder="Ask DriveYo"
      className="flex-1 outline-none text-gray-600"
    />

    {/* STEP 0 → Arrow submits vehicle details */}
    {step === 0 ? (
      <FiSend
        className="text-gray-600 text-xl cursor-pointer ml-3"
        onClick={() => {
          if (
            vehicleDetails.make &&
            vehicleDetails.model &&
            vehicleDetails.trim &&
            vehicleDetails.zip
          ) {
            setStep(1);
          }
        }}
      />
    ) : (
      <FiSend className="text-gray-400 text-xl ml-3" />
    )}

  </div>
</div>

    </div>
  );
}
