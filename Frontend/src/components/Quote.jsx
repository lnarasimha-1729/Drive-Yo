import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Quote() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [step, setStep] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [negotiationAnswer, setNegotiationAnswer] = useState(null);


  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [uploadedFile, step, selectedStatus]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setStep(1); // go to next step
    }
  };

  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-screen bg-[#fafafa] mt-5">

      {/* back button */}
      <div
        className="py-4 text-gray-600 text-sm ml-4 cursor-pointer"
        onClick={() => window.history.back()}
      >
        back
      </div>

      {/* chat scroll */}
      <div ref={scrollRef} className="flex-1 overflow-y-scroll w-[90%] px-28 pb-40">

        {/* YO: Upload your Quotation */}
        <div className="flex items-center gap-3 mb-14">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
            YO
          </div>
          <span className="text-sm font-semibold">Upload your Quotation</span>
        </div>

        {/* File bubble right */}
        {uploadedFile && (
          <>
            <div className="flex flex-col items-end mb-6 mr-4">
              <div className="text-sm bg-gray-200 px-6 py-2 rounded-lg text-gray-800 font-medium shadow-sm">
                {uploadedFile.name}
              </div>
              <span className="text-xs text-gray-500 mt-1">File Uploaded</span>
            </div>
          </>
        )}

        {/* Summary */}
        {step >= 1 && (
          <>
            {/* YO: Quotation Summary */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
                YO
              </div>
              <span className="text-sm font-semibold">Quotation Summary</span>
            </div>

            <div className="bg-white shadow rounded-xl p-8 w-full max-w-[400px] mb-10">
              <h3 className="text-sm font-semibold mb-4">Deal Summary</h3>

              <div className="border-t py-3 flex justify-between">
                <span className="text-gray-600">Vehicle</span>
                <span className="font-medium">2025 BMW 330i xDrive</span>
              </div>

              <div className="border-t py-3 flex justify-between">
                <span className="text-gray-600">Monthly Payment</span>
                <span className="font-medium">$385/month</span>
              </div>

              <div className="border-t py-3 flex justify-between">
                <span className="text-gray-600">Lease Term</span>
                <span className="font-medium">36 months</span>
              </div>

              <div className="border-t py-3 flex justify-between">
                <span className="text-gray-600">Miles</span>
                <span className="font-medium">12,000</span>
              </div>
            </div>
          </>
        )}

        {/* STEP 2 — Select Status */}
        {step >= 1 && (
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
                YO
              </div>
              <span className="text-sm font-semibold">Please select your status.</span>
            </div>

            {/* buttons */}
            <div className="flex gap-3 mb-8">
              {["Military", "Loyalty", "AAA", "N/A"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setStep(2);
                  }}
                  className="px-4 py-1 border rounded-lg text-sm cursor-pointer"
                >
                  {status}
                </button>
              ))}
            </div>
          </>
        )}

        {/* user answer bubble */}
        {selectedStatus && (
          <div className="flex justify-end items-center gap-2 mb-10 mr-4">
            <span className="text-sm">{selectedStatus}</span>
            <div className="w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded-full text-sm">
              S
            </div>
          </div>
        )}

        {/* STEP 3 — Analysis */}
        {step >= 2 && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
                YO
              </div>
              <span className="text-sm">Analyzing the quote</span>
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>

            {/* Good Deal */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
                YO
              </div>
              <span className="text-sm">
                This is a <span className="text-green-600 font-bold">Good Deal!</span>
              </span>
            </div>

            {/* Negotiation message */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
                YO
              </div>
              <span className="text-sm">
                However, there is still room for further negotiation.
              </span>
            </div>

            {/* Yes / No buttons */}
            <div className="flex gap-4 mt-5">
  {/* YES */}
  <button
    className="px-6 py-2 bg-black text-white rounded-lg text-sm cursor-pointer"
    onClick={() => {
      setNegotiationAnswer("Yes");
      setStep(3);
    }}
  >
    Yes
  </button>

  {/* NO */}
  <button
    className="px-6 py-2 border border-black rounded-lg text-sm cursor-pointer"
    onClick={() => {
      setNegotiationAnswer("No");
      setStep(3);

      setTimeout(() => {
        // RESET EVERYTHING
        setUploadedFile(null);
        setSelectedStatus(null);
        setStep(0);
      }, 500);
    }}
  >
    No
  </button>
</div>

{step >= 3 && negotiationAnswer && (
  <div className="flex justify-end items-center gap-2 mb-10 mr-4">
    <span className="text-sm">{negotiationAnswer}</span>
    <div className="w-8 h-8 bg-gray-400 text-white flex items-center justify-center rounded-full text-sm">
      S
    </div>
  </div>
)}

{step >= 3 && (
  <>
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm">
        YO
      </div>
      <span className="text-sm">
        Become a premium member to know which parameter to negotiate.
      </span>
    </div>

    <div onClick={()=>navigate("/yo")} className="ml-10 text-green-600 font-semibold cursor-pointer underline">
      Go Premium
    </div>
  </>
)}


          </>
        )}
      </div>

      {/* bottom input */}
      <div className="flex justify-center w-full fixed bottom-0 left-10 w-[80%] flex justify-center pb-6">
        <div className="flex items-center w-[50%] bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">

          {!uploadedFile && (
            <label
              htmlFor="fileUploadMain"
              className="w-8 h-8 flex items-center justify-center bg-black rounded-full -ml-2 mr-2 cursor-pointer"
            >
              <span className="text-white text-xl">+</span>
            </label>
          )}

          {uploadedFile && (
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg mr-3">
              <span className="text-sm text-gray-700 truncate max-w-[120px]">
                {uploadedFile.name}
              </span>
            </div>
          )}

          <input
            id="fileUploadMain"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />

          <input
            type="text"
            placeholder="Ask DriveYo"
            className="flex-1 outline-none text-gray-600"
          />

          <FiSend className="text-gray-600 text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
