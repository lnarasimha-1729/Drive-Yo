import { Plus, Send } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function QuotationDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const quote = state?.quote;

  const [negotiationStarted, setNegotiationStarted] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = React.useRef(null);
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [showPostReview, setShowPostReview] = useState(false);
  const [finalized, setFinalized] = useState(false);
  const [askNewUpload, setAskNewUpload] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [finalizeActionTaken, setFinalizeActionTaken] = useState(false);

  const [isFinalizing, setIsFinalizing] = useState(false);

  const chatRef = useRef(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [
    isUploaded,
    isReviewing,
    showPostReview,
    finalized,
    askNewUpload,
    declined
  ]);

  if (!quote) {
    return <div className="p-6">No quotation found</div>;
  }

  return (
    <div className="mx-auto h-screen bg-[#fafafa] flex flex-col max-w-[50rem] md:px-8">

  {/* CHAT SCROLL AREA */}
  <div
    ref={chatRef}
    className="flex-1 overflow-y-auto px-4 lg:px-6 pb-32 mt-8"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
    <div className="mx-auto space-y-4">

          {/* Chat Bubble */}
          <ChatBubble text="Hello! Metro Motors Car Dealers, you have a new quote for review." />
          <ChatBubble text="The summary is below." />

          {/* Deal Summary */}
          <div
            className="
    bg-white rounded-xl shadow
    p-4 sm:p-5 lg:p-6
    mx-auto ml-11 sm:ml-11 w-2/3
  "
          >
            <h3 className="text-[0.875rem] sm:text-lg font-semibold mb-4">
              Deal Summary
            </h3>

            <div className="space-y-3 sm:space-y-4 text-[0.875rem]">
              <Row label="Vehicle" value={quote.vehicle} />
              <Row label="Monthly Payment" value={quote.payment} />
              <Row label="Lease Term" value={quote.term} />
              <Row label="Miles" value="12,000" />
              <Row label="Zip Code" value="90129" />
              <Row label="Discount Options" value="Loyalty Pass" />
            </div>
          </div>


          {/* ================= ACTION SECTION ================= */}
          {!negotiationStarted ? (
            <div className="ml-11 space-y-3">
              <p className="text-sm">Please confirm your action</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setNegotiationStarted(true)}
                  className="border border-green-500 text-green-600 px-4 py-2 rounded-lg text-sm cursor-pointer"
                >
                  Proceed
                </button>
                <button
                  onClick={() => {
                    setDeclined(true);
                    setNegotiationStarted(false); // stop negotiation flow
                  }}
                  className="border border-red-500 text-red-600 px-4 py-2 rounded-lg text-sm cursor-pointer"
                >
                  Decline the Quote
                </button>

              </div>
            </div>
          ) : (
            <>
              {/* Accepted message (right aligned like screenshot) */}
              <div className="flex justify-end items-center gap-2 text-sm">
                <span>Accepted the Quote</span>
                <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">
                  S
                </div>
              </div>

              {/* Upload request */}
              <div className="flex flex-col items-start gap-3">
                <ChatBubble text="Please upload your quote for further negotiation"/>
                <div className="space-y-3">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-black text-white px-8 py-2 rounded-lg text-sm cursor-pointer ml-11"
                  >
                    Upload
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.png,.jpg"
                    onChange={(e) => {
                      const selectedFile = e.target.files[0];

                      if (selectedFile) {
                        setUploadedFile(selectedFile);
                        setIsUploaded(true);
                        setIsReviewing(true);

                        // ⬇️ scroll immediately after upload
                        setTimeout(scrollToBottom, 50);

                        setTimeout(() => {
                          setIsReviewing(false);
                          setShowPostReview(true);
                        }, 1500);
                      }

                    }}
                  />
                </div>
              </div>


              {isUploaded && (
                <>
                  {/* Uploaded file bubble */}
                  <div className="flex justify-end items-center gap-3 mt-6">
                    <div className="border border-green-500 px-4 py-2 rounded-lg text-sm">
                      Quotation1.pdf
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">
                      S
                    </div>
                  </div>

                  <p className="text-right text-sm text-gray-600 mr-12">
                    Quotation Uploaded
                  </p>

                  {/* New Deal Summary */}
                  <div className="flex justify-end mt-4">
                    <div className="
                      bg-white rounded-xl shadow 
                      p-4 sm:p-6
                      w-full sm:w-[380px]
                    ">

                      <h3 className="font-semibold mb-4">Deal Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Vehicle</span>
                          <span className="font-medium">2025 BMW 330i xDrive</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Payment</span>
                          <span className="font-medium">$385/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lease Term</span>
                          <span className="font-medium">36 months</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Miles</span>
                          <span className="font-medium">12,000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isReviewing && (
                    <div className="mt-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">
                          YO
                        </div>
                        <div className="bg-white px-4 py-2 rounded-xl shadow text-sm flex items-center gap-2">
                          <span className="animate-pulse">Reviewing your quote</span>
                          <span className="animate-bounce">…</span>
                        </div>
                      </div>
                    </div>
                  )}


                  {showPostReview && (
                    <div className="space-y-4">

                      <div className="flex items-start gap-3">
                        <ChatBubble text="We've reviewed your quote. The residual value can be further considered
                          based on fair market value."/>
                      </div>

                      {/* YO message 1 */}
                      <div className="flex items-start gap-3">
                        <ChatBubble text="Please confirm to finalize, or indicate that you will be negotiating and submitting a revised quote."/>
                      </div>

                      {/* Buttons (aligned with message bubble, not avatar) */}
                      <div className="flex gap-3 flex-row ml-11">

                        <button
                          disabled={finalizeActionTaken}
                          className="border border-green-500 text-green-600 px-6 py-2 rounded-lg text-sm font-medium disabled:hidden cursor-pointer"
                          onClick={() => {
                            setFinalizeActionTaken(true); // show USER action
                            setIsFinalizing(true);   // start loading
                            setFinalized(false);    // ensure message not shown yet

                            setTimeout(() => {
                              setIsFinalizing(false); // stop loading
                              setFinalized(true);     // show final message
                            }, 1500); // ⏱️ adjust delay if needed
                          }}

                        >
                          Finalize
                        </button>

                        <button
                          className="bg-black text-white px-6 py-2 rounded-lg text-sm disabled:hidden cursor-pointer"
                          disabled={finalizeActionTaken}
                        >
                          Upload another quote
                        </button>
                      </div>

                      {finalizeActionTaken && (
                        <div className="flex justify-end items-center gap-2 mt-4 text-sm">
                          <span className="bg-gray-200 px-3 py-2 rounded-lg">
                            Finalized the quote
                          </span>
                          <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">
                            S
                          </div>
                        </div>
                      )}


                      {/* 🔄 FINALIZING LOADING */}
                      {isFinalizing && (
                        <div className="mt-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">
                              YO
                            </div>
                            <div className="bg-white px-4 py-2 rounded-xl shadow text-sm flex items-center gap-2">
                              <span className="animate-pulse">Finalizing your quote</span>
                              <span className="animate-bounce">…</span>
                            </div>
                          </div>
                        </div>
                      )}


                      {/* ✅ Final YO message — PERFECTLY ALIGNED */}
                      {finalized && (
                        <div className="flex items-start gap-3 mt-2">
                          <ChatBubble text="Thanks for getting the quote finalized. We'll follow up with you shortly."/>
                        </div>
                      )}

                    </div>

                  )}

                </>
              )}

            </>
          )}

          {declined && (
            <div className="space-y-4 mt-6">

              {/* USER message — RIGHT ALIGNED */}
              <div className="flex justify-end items-center gap-2 text-sm">
                <span className="bg-gray-200 px-3 py-2 rounded-lg">
                  Declined the quote
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">
                  S
                </div>
              </div>

              {/* YO response — LEFT ALIGNED (MATCHES ALL OTHER YO MESSAGES) */}
              <div className="flex items-start gap-3">
                <ChatBubble text="No problem. If you'd like to explore better lease options or review another quote,
                  feel free to reach out anytime."/>
              </div>

            </div>
          )}

        </div>

        

      </div>

      {/* INPUT BAR — MOBILE SAFE */}
<div className="sticky bottom-16 md:bottom-0 left-0 right-0 bg-gray-50 z-30">
  <div className="mx-auto px-4 py-3 pb-safe">
    <div className="flex items-center bg-white rounded-full shadow px-3 py-3.5 border border-gray-400">
      <Plus className="mr-3 shrink-0" />

      <input
        placeholder="Ask DriveYo"
        className="flex-1 outline-none text-sm bg-transparent"
      />

      <Send className="ml-3 shrink-0" />
    </div>
  </div>
</div>



    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

const ChatBubble = ({ text }) => (
  <div className="flex items-start gap-2 sm:gap-3 w-full">
    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center text-xs shrink-0">
      YO
    </div>
    <p className="bg-white px-4 py-2 rounded-xl shadow text-sm w-fit max-w-full sm:max-w-xl">
      {text}
    </p>
  </div>
);


const Row = ({ label, value }) => (
  <div className="flex justify-between pb-1 border-b border-gray-400">
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);
