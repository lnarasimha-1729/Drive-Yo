import { Plus } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

export default function Quote() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const QUOTE_API = "https://f749051jt9.execute-api.ap-south-1.amazonaws.com";
  const EXPLAIN_API = "https://pir8u99c4m.execute-api.ap-south-1.amazonaws.com";

  const [editMode, setEditMode] = useState(false);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [step, setStep] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [negotiationAnswer, setNegotiationAnswer] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [incentives, setIncentives] = useState([]);


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

  useEffect(() => {
    if (!location.state?.autoOpenUpload) return;

    // Delay ensures DOM + layout is fully ready
    const timer = setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadedFile(file);
      setStep(1);
      setSummaryLoading(true);
      setSummaryError(null);
      setExplanation("");

      // 1️⃣ Upload to S3
      setLoadingMessage("This may take some time…");
      const s3Key = await uploadFileToS3(file);

      // ⏱ WAIT 10 SECONDS
      setLoadingMessage("Waiting for document processing…");
      await sleep(10000);

      // 2️⃣ Call quote API
      setLoadingMessage("Extracting quote from uploaded document…");
      const quoteId = await callQuoteByS3Key(s3Key);

      // ⏱ WAIT 30 SECONDS
      setLoadingMessage("Analyzing quote details…");
      await sleep(30000);

      // 3️⃣ Call explain API
      setLoadingMessage("Generating quote explanation…");
      const explanationText = await callExplainLease(quoteId);

      // ✅ Done
      const parseExplanation = (text) => {
        const marker = "Additional Information:";
        const [main, extra] = text.split(marker);

        // Extract incentives (lines after marker)
        const incentiveList =
          extra
            ?.split("\n")
            .map(line => line.trim())
            .filter(line => line && !line.toLowerCase().includes("there are"))
            .map((line, index) => ({
              id: index,
              label: line.replace(/^[-•]\s*/, "")
            })) || [];

        return {
          mainText: main.trim(),
          incentives: incentiveList
        };
      };

      const parsed = parseExplanation(explanationText);

      setQuoteText(parsed.mainText);
      setIncentives(parsed.incentives);

      setLoadingMessage("");
      setStep(2);
    } catch (err) {
      console.error(err);
      setSummaryError(err.message || "Something went wrong");
      setLoadingMessage("");
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.newChat) {
      resetChat();
    }
  }, [location.state]);

  const uploadFileToS3 = async (file) => {
    const bucketName = "jdpocr";
    const region = "ap-south-1";

    const fileKey = `uploads/${Date.now()}-${file.name}`;
    const uploadUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;

    try {
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      console.log("✅ Uploaded to S3:", fileKey);
      return fileKey; // 🔥 IMPORTANT
    } catch (err) {
      console.error("❌ Upload failed", err);
      throw err;
    }
  };


  const callQuoteByS3Key = async (s3Key) => {
    const res = await fetch(`${QUOTE_API}/quote-by-s3-key`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ s3_key: s3Key }),
    });

    if (!res.ok) throw new Error("quote-by-s3-key failed");

    const data = await res.json();
    return data.quote_id;
  };

  const callExplainLease = async (rawId) => {
    const res = await fetch(`${EXPLAIN_API}/explain-lease`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw_id: rawId }),
    });

    if (!res.ok) throw new Error("explain-lease failed");

    const data = await res.json();
    return data.explanation;
  };

  const selectedLabels = [
    { label: "Military Personnel", key: "military" },
    { label: "AAA Membership", key: "aaa" },
    { label: "Loyalty Pass", key: "loyalty" },
  ]
    .filter(item => selectedStatus[item.key])
    .map(item => item.label);

  const resetChat = () => {
    setUploadedFile(null);
    setStep(0);
    setSelectedStatus({});
    setNegotiationAnswer(null);
    setExplanation("");
    setSummaryLoading(false);
    setSummaryError(null);
    setLoadingMessage("");
    setWelcomeMessage(true);

    // Optional: reset file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const cleanExplanation = (text) => {
    if (!text) return "";

    return text
      // Remove markdown headings (###, ####, etc.)
      .replace(/^#{1,6}\s*/gm, "")

      // Remove bold markdown (**text** → text)
      .replace(/\*\*(.*?)\*\*/g, "$1")

      // Remove list markers (-, •)
      .replace(/^\s*[-•]\s*/gm, "")

      // Remove extra blank lines
      .replace(/\n{3,}/g, "\n\n")

      // Trim spaces
      .trim();
  };

  const hasAwsData = !!quoteText && !summaryLoading && !summaryError;



  return (
    <div className="relative flex flex-col bg-[#fafafa] w-full max-w-[50rem] h-screen">

      {/* MAIN SCROLL AREA */}
      <div
  ref={scrollRef}
  className="
    flex-1 overflow-y-auto
    px-4 sm:px-6 md:px-8
    pb-24 mt-16 sm:mt-16 lg:mt-10
  "
  style={{scrollbarWidth: "none", msOverflowStyle: "none" }}
>
        {welcomeMessage && (
          <div className="flex flex-col items-center justify-center gap-5 h-full lg:gap-10 text-center text-[0.875rem] text-gray-600 px-4 py-3 mb-4 rounded-lg mt-8">
            <p className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] 2xl:text-[2rem] font-medium text-black">Welcome to Drive Yo</p>
            <span className="text-base text-gray-400 max-w-xl">DriveYo, your car leasing assistant. Get the best deals,
              validate quotes, and negotiate with dealerships effortlessly.</span>
          </div>
        )}


        {/* FILE BUBBLE */}
        {uploadedFile && (
          <div className="flex flex-col items-end mb-10 md:mt-4">
            <div className="bg-gray-200 px-4 py-2 rounded-lg shadow-sm text-gray-800 text-[0.875rem] font-medium max-w-[80%] break-words">
              {uploadedFile.name}
            </div>
            <span className="text-xs text-gray-500 mt-1">File Uploaded</span>
          </div>
        )}

        {/* SUMMARY BLOCK */}
        {step >= 1 && (
          <>
            {summaryLoading && (
              <div className="flex items-center gap-3 mb-6 text-[0.875rem] text-gray-600">
                <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                <span>{loadingMessage || "Processing…"}</span>
              </div>
            )}

            {summaryError && (
              <p className="text-[0.875rem] text-red-600 mb-4">
                {summaryError}
              </p>
            )}

            {/* AWS RESPONSE */}
            {hasAwsData && (
              <div className="bg-white shadow rounded-xl p-6 max-w-2xl mb-10">
                <h3 className="text-[0.875rem] font-semibold mb-3">Quote Analysis</h3>
                <pre className="text-[0.875rem] text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {cleanExplanation(quoteText)}
                </pre>
              </div>
            )}


          </>
        )}

        {/* STEP 1 — STATUS CHECKBOXES */}
        {hasAwsData && incentives.length > 0 && step >= 2 && (
          <>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-[0.875rem] flex-shrink-0 leading-none">
                YO
              </div>
              <span className="text-[0.875rem] font-semibold">
                Based on the quotation, the following incentives may apply:
              </span>
            </div>

            <p className="text-gray-500 text-[0.875rem] mb-4">
              Please select all that apply to you.
            </p>

            <div className="space-y-3 mb-4">
              {incentives.map((item) => (
                <label key={item.id} className="flex items-center gap-3 text-[0.875rem]">
                  <input
                    type="checkbox"
                    checked={selectedStatus[item.label] || false}
                    onChange={(e) =>
                      setSelectedStatus(prev => ({
                        ...prev,
                        [item.label]: e.target.checked
                      }))
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                  {item.label}
                </label>
              ))}
            </div>

            <button
              className="bg-black text-white px-5 py-2 rounded-lg text-[0.875rem] mb-4"
              onClick={() => setStep(3)}
            >
              Analyze
            </button>
          </>
        )}


        {/* USER SELECTED INCENTIVES BUBBLE */}
        {step >= 3 && selectedLabels.length > 0 && (
          <div className="flex justify-end items-start gap-2 mb-8 mr-4">
            <div className="bg-gray-200 px-4 py-2 rounded-lg shadow-sm max-w-[70%]">
              <p className="text-xs text-gray-500 mb-1">Selected Incentives</p>
              <ul className="text-[0.875rem] list-disc list-inside">
                {selectedLabels.map((label, index) => (
                  <li key={index}>{label}</li>
                ))}
              </ul>
            </div>

            <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-[0.875rem]">
              S
            </div>
          </div>
        )}


        {/* STEP 2 — ANALYSIS */}
        {step >= 3 && (
          <>
            <div className="flex items-start gap-3 mb-6">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-[0.875rem]">YO</div>
              <p className="text-[0.875rem]">Thank you for your responses.</p>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-[0.875rem]">YO</div>
              <p className="text-[0.875rem] flex items-center gap-2">
                Analyzing the Quote{" "}
                <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
              </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-[0.875rem]">YO</div>
              <p className="text-[0.875rem]">
                This is a <span className="text-green-600 font-bold">Good deal!</span>
              </p>
            </div>

            <div className="flex items-start gap-3 mb-6 max-w-lg">
              <div className="w-14 md:w-8 lg:w-8 2xl:w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-[0.875rem]">YO</div>
              <p className="text-[0.875rem]">
                However, there is still a room for further negotiation, You can save up to{" "}
                <span className="text-green-600 font-bold">$499.</span>
              </p>
            </div>

            {/* YES / NO BUTTONS */}
            <div className="flex gap-4  my-4">
              <button
                className="text-[0.875rem] px-4 lg:px-8 py-2 bg-black text-white rounded-lg cursor-pointer"
                onClick={() => {
                  setNegotiationAnswer("Yes");
                  setStep(4);
                }}
              >
                Negotiate
              </button>

              <button
                className="text-[0.875rem] px-4 lg:px-8 py-2 border border-black rounded-lg cursor-pointer text-nowrap"
                onClick={() => navigate("/quotation-upload", { state: { newChat: true, autoOpenUpload: true } })
                }
              >
                Analyze New Quote
              </button>
            </div>

            {/* USER ANSWER BUBBLE */}
            {step >= 4 && negotiationAnswer && (
              <div className="flex justify-end items-center gap-2 mb-10 mr-4">
                <span className="text-[0.875rem]">{negotiationAnswer}</span>
                <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-[0.875rem]">S</div>
              </div>
            )}
          </>
        )}

        {/* STEP 3 — PREMIUM SECTION */}
        {step >= 4 && (
          <>
            <div className="flex items-start gap-3 my-4 max-w-lg">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-[0.875rem]">YO</div>
              <p className="text-[0.875rem]">
                Become a premium member to know which parameter to negotiate.
              </p>
            </div>

            <div className="flex gap-4  mt-4 text-[0.875rem]">
              <button
                onClick={() => navigate("/yo-premium")}
                className="px-4 lg:px-8 py-2 rounded-lg text-yellow-500 border border-yellow-500 cursor-pointer"
              >
                Go Premium
              </button>

              <button
                className="px-4 lg:px-8 py-2 border border-black rounded-lg cursor-pointer text-nowrap"
                onClick={() => navigate("/quotation-upload", { state: { newChat: true, autoOpenUpload: true } })}
              >
                Analyze New Quote
              </button>
            </div>
          </>
        )}
      </div>

      {/* BOTTOM CHAT INPUT */}
      <div className="sticky bottom-12
  bg-gradient-to-t from-[#fafafa] via-[#fafafa] to-transparent
  px-3 py-6
  z-40">
        <div className="
              flex items-center gap-3
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
                <Plus className="text-white w-5" />

                <span className="
                      absolute left-1/2 -translate-x-1/2 -top-12 
                      bg-black text-white text-xs px-2 py-1 rounded 
                      opacity-0 group-hover:opacity-100 
                      transition-all">
                  Add files
                </span>
              </div>
            </label>
          )}

          <input
            ref={fileInputRef}
            id="fileUploadMain"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />

          {/* Input */}
          <input
            type="text"
            placeholder="Ask DriveYo"
            className={`flex-1 outline-none text-black text-[0.875rem] lg:text-base h-9 placeholder:text-[1rem] placeholder:text-gray-400 ${uploadedFile && "pl-5"}`}
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