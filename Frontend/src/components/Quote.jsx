import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

export default function Quote() {
  const [editMode, setEditMode] = useState(false);

  const [dealSummary, setDealSummary] = useState({
  vehicle: "2025 BMW 330i xDrive",
  paymentAmount: "385",
  paymentFreq: "monthly",
  term: "36",
  miles: "12,000",
  zip: "90120"
});


  const [uploadedFile, setUploadedFile] = useState(null);
  const [step, setStep] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [negotiationAnswer, setNegotiationAnswer] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState(false);

  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const statusFirstButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-scroll on content update
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [uploadedFile, step, selectedStatus]);

  // Auto-open file picker on navigation
  useEffect(() => {
    const autoOpen = location.state?.autoOpenUpload;
    if (!autoOpen) return;

    if (window.showOpenFilePicker) {
      (async () => {
        try {
          const [handle] = await window.showOpenFilePicker({
            multiple: false,
            types: [
              {
                description: "Documents",
                accept: {
                  "application/pdf": [".pdf"],
                  "image/*": [".png", ".jpg", ".jpeg"],
                  "text/*": [".txt"],
                },
              },
            ],
          });
          const file = await handle.getFile();
          if (file) {
            setUploadedFile(file);
            setStep(1);
            setWelcomeMessage(false);
          }

        } catch {
          fileInputRef.current?.click();
        }
      })();
    } else {
      setTimeout(() => fileInputRef.current?.click(), 100);
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setWelcomeMessage(false);
      setStep(1);
    }
  };

  useEffect(() => {
    if (location.state?.newChat) {
      setWelcomeMessage(true);
    }
  }, []);


  return (
    <div className="flex flex-col lg:items-center h-screen p-4 lg:p-0 bg-[#fafafa] lg:w-[100%]">

      {/* MAIN SCROLL AREA */}
      <div
        ref={scrollRef}
        className="
          flex-1 overflow-y-auto px-2 sm:px-8 md:px-12 xl:px-40 pb-32 mt-14 lg:min-w-[70%]
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {welcomeMessage && (
          <div className="flex flex-col gap-10 text-center text-sm text-gray-600 px-4 py-3 mb-4 rounded-lg mt-8">
            <h1 className="text-3xl font-medium text-black">Welcome to Drive Yo</h1>
            <span className="text-base text-gray-400 max-w-xl">DriveYo, your car leasing assistant. Get the best deals,
              validate quotes, and negotiate with dealerships effortlessly.</span>
          </div>
        )}


        {/* FILE BUBBLE */}
        {uploadedFile && (
          <div className="flex flex-col items-end mb-10">
            <div className="bg-gray-200 px-4 py-2 rounded-lg shadow-sm text-gray-800 text-sm font-medium max-w-[80%] break-words">
              {uploadedFile.name}
            </div>
            <span className="text-xs text-gray-500 mt-1">File Uploaded</span>
          </div>
        )}

        {/* SUMMARY BLOCK */}
        {step >= 1 && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">
                YO
              </div>
              <span className="text-sm font-semibold">Quotation Summary</span>
            </div>

            <div className="bg-white shadow rounded-xl p-6 w-full max-w-sm mb-10">

              {/* SUMMARY HEADER + EDIT BUTTON */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold">Deal Summary</h3>

                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-blue-600 text-xs cursor-pointer"
                  >
                    <div className="relative group w-4">
                      <img
                        src="https://img.icons8.com/forma-bold/24/create-new.png"
                        alt="Edit"
                        className="w-4 cursor-pointer"
                      />

                      <span className="
    absolute left-1/2 -translate-x-1/2 -top-7
    bg-black text-white text-xs px-2 py-1 rounded
    opacity-0 group-hover:opacity-100 transition-all
    whitespace-nowrap
  ">
                        Edit
                      </span>
                    </div>

                  </button>
                )}
              </div>

              {/* VEHICLE */}
              <div className="text-xs border-t py-3 flex justify-between items-center">
                <span className="text-gray-600">Vehicle</span>
                {editMode ? (
                  <input
                    value={dealSummary.vehicle}
                    onChange={(e) =>
                      setDealSummary({ ...dealSummary, vehicle: e.target.value })
                    }
                    className="border rounded px-2 py-1 text-xs"
                  />
                ) : (
                  <span className="font-medium">{dealSummary.vehicle}</span>
                )}
              </div>

              {/* MONTHLY */}
              <div className="text-xs border-t py-3 flex justify-between items-center">
                <span className="text-gray-600">Payment</span>
                {editMode ? (
  <div className="flex items-center gap-1">
    
    {/* Amount Input */}
    <input
      value={dealSummary.paymentAmount}
      onChange={(e) =>
        setDealSummary({ ...dealSummary, paymentAmount: e.target.value })
      }
      className="border rounded px-2 py-1 text-xs w-17"
      placeholder="385"
    />

    <span>/</span>

    {/* Frequency Dropdown */}
    <select
      value={dealSummary.paymentFreq}
      onChange={(e) =>
        setDealSummary({ ...dealSummary, paymentFreq: e.target.value })
      }
      className="border rounded px-2 text-white py-1 text-xs w-18 bg-black cursor-pointer"
    >
      <option value="monthly">Monthly</option>
      <option value="quarterly">Quarterly</option>
      <option value="semiannual">Semi-Annual</option>
      <option value="annual">Annual</option>
    </select>
  </div>
) : (
  <span className="font-medium">
    ${dealSummary.paymentAmount}/{dealSummary.paymentFreq}
  </span>
)}

              </div>

              {/* TERM */}
              <div className="text-xs border-t py-3 flex justify-between items-center">
                <span className="text-gray-600">Lease Term</span>
                {editMode ? (
                  <input
                    value={dealSummary.term}
                    onChange={(e) =>
                      setDealSummary({ ...dealSummary, term: e.target.value })
                    }
                    className="border rounded px-2 py-1 text-xs"
                  />
                ) : (
                  <span className="font-medium">{dealSummary.term} Months</span>
                )}
              </div>

              {/* MILES */}
              <div className="text-xs border-t py-3 flex justify-between items-center">
                <span className="text-gray-600">Miles</span>
                {editMode ? (
                  <input
                    value={dealSummary.miles}
                    onChange={(e) =>
                      setDealSummary({ ...dealSummary, miles: e.target.value })
                    }
                    className="border rounded px-2 py-1 text-xs"
                  />
                ) : (
                  <span className="font-medium">{dealSummary.miles}</span>
                )}
              </div>

              {/* ZIP */}
              <div className="text-xs border-t py-3 flex justify-between items-center">
                <span className="text-gray-600">Zip Code</span>
                {editMode ? (
                  <input
                    value={dealSummary.zip}
                    onChange={(e) =>
                      setDealSummary({ ...dealSummary, zip: e.target.value })
                    }
                    className="border rounded px-2 py-1 text-xs"
                  />
                ) : (
                  <span className="font-medium">{dealSummary.zip}</span>
                )}
              </div>

              {/* SAVE BUTTON */}
              {editMode && (
                <button
                  onClick={() => setEditMode(false)}
                  className="mt-4 bg-black text-white px-4 py-2 rounded-lg w-full text-xs cursor-pointer"
                >
                  Save Changes
                </button>
              )}

              {/* CONTINUE BUTTON (moves to next step) */}
              {!editMode && (
                <button
                  onClick={() => setStep(2)}
                  className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg w-full text-sm cursor-pointer"
                >
                  Continue
                </button>
              )}
            </div>
          </>
        )}


        {/* STEP 1 — STATUS CHECKBOXES */}
        {step >= 2 && (
          <>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">
                YO
              </div>
              <span className="text-sm font-semibold">Based on the Quotation, below incentives are applicable.</span>
            </div>

            <p className="text-gray-500 text-sm ml-11 -mt-2 mb-4">
              Please Choose one or more from the below questioner.
            </p>

            <div className="ml-11 space-y-4 mb-2">
              {[
                { label: "Are you a military personnel?", key: "military" },
                { label: "Do you own AAA membership", key: "aaa" },
                { label: "Do you have loyalty pass?", key: "loyalty" },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedStatus[item.key] || false}
                    onChange={(e) =>
                      setSelectedStatus((prev) => ({
                        ...prev,
                        [item.key]: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                  {item.label}
                </label>
              ))}
            </div>

            <button
              className="ml-11 bg-black text-white px-5 py-2 rounded-lg text-sm mb-4 cursor-pointer"
              onClick={() => setStep(3)}
            >
              Analyze
            </button>
          </>
        )}

        {/* STEP 2 — ANALYSIS */}
        {step >= 3 && (
          <>
            <div className="flex items-start gap-3 mb-6">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">YO</div>
              <p className="text-sm">Thank you for your responses.</p>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">YO</div>
              <p className="text-sm flex items-center gap-2">
                Analyzing the Quote{" "}
                <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
              </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">YO</div>
              <p className="text-sm">
                This is a <span className="text-green-600 font-bold">Good deal!</span>
              </p>
            </div>

            <div className="flex items-start gap-3 mb-6 max-w-lg">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">YO</div>
              <p className="text-sm">
                However, there is still a room for further negotiation, You can save up to{" "}
                <span className="text-green-600 font-bold">$499.</span>
              </p>
            </div>

            {/* YES / NO BUTTONS */}
            <div className="flex gap-4 ml-11 my-4">
              <button
                className="text-sm px-8 py-2 bg-black text-white rounded-lg cursor-pointer"
                onClick={() => {
                  setNegotiationAnswer("Yes");
                  setStep(4);
                }}
              >
                Negotiate
              </button>

              <button
                className="text-sm px-8 py-2 border border-black rounded-lg cursor-pointer"
                onClick={() => navigate("/quote", { state: { newChat: true, autoOpenUpload: true } })
                }

              >
                Open New Chat
              </button>
            </div>

            {/* USER ANSWER BUBBLE */}
            {step >= 4 && negotiationAnswer && (
              <div className="flex justify-end items-center gap-2 mb-10 mr-4">
                <span className="text-sm">{negotiationAnswer}</span>
                <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm">S</div>
              </div>
            )}
          </>
        )}

        {/* STEP 3 — PREMIUM SECTION */}
        {step >= 4 && (
          <>
            <div className="flex items-start gap-3 my-4 max-w-lg">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">YO</div>
              <p className="text-sm">
                Become a premium member to know which parameter to negotiate.
              </p>
            </div>

            <div className="flex gap-4 ml-11 mt-4 text-sm">
              <button
                onClick={() => navigate("/yo")}
                className="px-8 py-2 rounded-lg bg-green-100 text-green-700 border border-green-600 cursor-pointer"
              >
                Go Premium
              </button>

              <button
                className="px-8 py-2 border border-black rounded-lg cursor-pointer"
                onClick={() => navigate("/quote", { state: { newChat: true, autoOpenUpload: true } })}
              >
                Open New Chat
              </button>
            </div>
          </>
        )}
      </div>

      {/* BOTTOM CHAT INPUT */}
      <div className="w-full flex justify-center px-2 pb-0 lg:pb-16 bg-gradient-to-t from-[#fafafa] lg:max-w-[65%]">
        <div
          className="
      flex items-center gap-3
      w-full min-w-[80%]
      bg-white border border-gray-300 rounded-full 
      px-3 py-2
    ">
          {/* Upload button */}
          {!uploadedFile && (
            <label
              htmlFor="fileUploadMain"
              className="w-9 h-9 flex items-center justify-center bg-black rounded-full cursor-pointer"
            >
              <div className="relative group">
                <span className="text-white text-xl">+</span>

                <span className="
    absolute left-1/2 -translate-x-1/2 -top-12 
    bg-black text-white text-xs px-2 py-1 rounded 
    opacity-0 group-hover:opacity-100 
    transition-all
  ">
                  Add files
                </span>
              </div>


            </label>
          )}

          {/* File preview */}
          {/* {uploadedFile && (
      <div className="flex-1 min-w-0 bg-gray-100 px-3 py-2 rounded-lg flex items-center">
        <span className="text-sm text-gray-700 truncate">
          {uploadedFile.name}
        </span>
      </div>
    )} */}

          <input
            ref={fileInputRef}
            id="fileUploadMain"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Input */}
          <input
            type="text"
            placeholder="Ask DriveYo"
            className={`flex-1 outline-none text-black text-sm lg:text-base h-9 placeholder:text-[1rem] placeholder:text-gray-400 ${uploadedFile && "pl-5"}`}
          />

          <div className="relative group">
            <FiSend className="text-xl cursor-pointer mr-2" />

            {/* Tooltip */}
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
