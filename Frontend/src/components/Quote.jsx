import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

export default function Quote() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [step, setStep] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [negotiationAnswer, setNegotiationAnswer] = useState(null);

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
      setStep(1);
    }
  };

  return (
    <div className="flex flex-col lg:items-end h-screen bg-[#fafafa] lg:w-[85%]">

      {/* MAIN SCROLL AREA */}
      <div
        ref={scrollRef}
        className="
          flex-1 overflow-y-auto px-2 sm:px-8 md:px-12 xl:px-40 pb-32 mt-14 lg:min-w-3xl
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >

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
              <h3 className="text-sm font-semibold mb-4">Deal Summary</h3>

              {[
                ["Vehicle", "2025 BMW 330i xDrive"],
                ["Monthly Payment", "$385/month"],
                ["Lease Term", "36 months"],
                ["Miles", "12,000"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="text-xs border-t py-3 flex justify-between"
                >
                  <span className="text-gray-600">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 1 — STATUS CHECKBOXES */}
        {step >= 1 && (
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
                    className="w-4 h-4"
                  />
                  {item.label}
                </label>
              ))}
            </div>

            <button
              className="ml-11 bg-black text-white px-5 py-2 rounded-lg text-sm mb-4"
              onClick={() => setStep(2)}
            >
              Analyze
            </button>
          </>
        )}

        {/* STEP 2 — ANALYSIS */}
        {step >= 2 && (
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
                <span className="text-green-600 font-bold">$49.</span>
              </p>
            </div>

            {/* YES / NO BUTTONS */}
            <div className="flex gap-4 ml-11 my-4">
              <button
                className="text-sm px-8 py-2 bg-black text-white rounded-lg"
                onClick={() => {
                  setNegotiationAnswer("Yes");
                  setStep(3);
                }}
              >
                Negotiate
              </button>

              <button
                className="text-sm px-8 py-2 border border-black rounded-lg"
                onClick={() => navigate("/quote", { state: { autoOpenUpload: true } })}

              >
                Open New Chat
              </button>
            </div>

            {/* USER ANSWER BUBBLE */}
            {step >= 3 && negotiationAnswer && (
              <div className="flex justify-end items-center gap-2 mb-10 mr-4">
                <span className="text-sm">{negotiationAnswer}</span>
                <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm">S</div>
              </div>
            )}
          </>
        )}

        {/* STEP 3 — PREMIUM SECTION */}
        {step >= 3 && (
          <>
            <div className="flex items-start gap-3 my-4 max-w-lg">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">YO</div>
              <p className="text-sm">
                Become a premium member to know which parameter to negotiate.
              </p>
            </div>

            <div className="flex gap-4 ml-11 mt-4">
              <button
                onClick={() => navigate("/yo")}
                className="px-8 py-2 rounded-lg bg-green-100 text-green-700 border border-green-600"
              >
                Go Premium
              </button>

              <button
                className="px-8 py-2 border border-black rounded-lg"
                onClick={() => navigate("/quote")}
              >
                Open New Chat
              </button>
            </div>
          </>
        )}
      </div>

      {/* BOTTOM CHAT INPUT */}
      <div className="bottom-0 left-0 w-full px-2 pb-16 bg-gradient-to-t from-[#fafafa] lg:max-w-3xl">
        <div className="flex items-center gap-3 w-full bg-white border border-gray-300 rounded-full px-3 py-2 shadow-sm">

          {/* Upload button */}
          {!uploadedFile && (
            <label
              htmlFor="fileUploadMain"
              className="w-9 h-9 flex items-center justify-center bg-black rounded-full cursor-pointer"
            >
              <span className="text-white text-xl">+</span>
            </label>
          )}

          {/* File preview */}
          {uploadedFile && (
            <div className="flex-1 min-w-0 bg-gray-100 px-3 py-2 rounded-lg flex items-center">
              <span className="text-sm text-gray-700 truncate">{uploadedFile.name}</span>
            </div>
          )}

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
            className="flex-1 outline-none text-gray-600 text-sm"
          />

          <FiSend className="text-gray-600 text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
