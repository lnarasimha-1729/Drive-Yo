import React from "react";
import SignUp from "../Auth-components/SignUp";
import { Crown, Home, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100vh]">
      <div className="flex min-h-[100vh] flex-col md:flex-row">

        {/* LEFT PANEL (Desktop only) */}
        <div
          className="
            hidden md:flex
            md:w-3/5
            items-center justify-center
            bg-[url('/login_icon.png')]
            bg-cover bg-center
            relative
          "
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <h1 className="relative z-10 text-4xl font-bold text-white">
            Drive Yo
          </h1>
        </div>

        {/* RIGHT PANEL (Mobile + Desktop) */}
        <div
          className="
            flex flex-1
            flex-col
            items-center
            justify-center
            bg-[#dfdfdf]
            max-w-[50rem]
            gap-6
          "
        >
          {/* TOP ICONS */}
          <div className="flex gap-6">
            <button onClick={() => navigate("/")}>
              <Home size={20} />
            </button>

            <button onClick={() => navigate("/yo-premium")}>
              <Crown size={20} />
            </button>
          </div>

          {/* AUTH CARD */}
          <div className="">
          <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthScreen;
