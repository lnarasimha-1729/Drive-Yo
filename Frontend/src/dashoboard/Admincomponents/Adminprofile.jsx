import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Top Buttons */}
      <div className="flex items-center gap-2">
        <button className="bg-black w-8 h-8 md:w-9 md:h-9 lg:w-7 lg:h-7 rounded-full flex items-center justify-center p-1">
          <img
            className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
            src="https://img.icons8.com/sf-regular/48/FFFFFF/appointment-reminders.png"
            alt="notification"
          />
        </button>

        {/* Admin button that toggles dropdown */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-black text-white px-2 py-1.5 md:px-4 md:py-2 rounded-md font-medium cursor-pointer text-sm md:text-base"
        >
          <img
            className="w-5 h-5 md:w-6 md:h-6"
            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/user--v1.png"
            alt="user"
          />
          Admin
        </button>
      </div>

      {/* Dropdown Card */}
      {open && (
        <div
          className="
            absolute right-0 mt-1 
            !w-40 sm:w-64 md:w-72 lg:w-50 
            bg-white rounded-xl shadow-xl 
            border border-gray-100 p-5 
            z-50

            /* Mobile Full Screen */
            max-sm:fixed max-sm:top-16 max-sm:right-2 max-sm:left-50 max-sm:w-auto
          "
        >
          {/* Profile Section */}
          <div className="flex flex-col items-center text-center relative">
            <div className="relative">
              <img
                className="w-14 h-14 lg:w-20 lg:h-20 md:w-16 md:h-16 rounded-full object-cover"
                src="https://images.squarespace-cdn.com/content/v1/5ec689480cc22c2d441e152f/4abb45fb-e456-4079-8076-b40ac0a89dfc/nlalor-photography-2021-06-17-Jason-Cholewa-Headshot-Web-Sized-1.jpg"
                alt="guest"
              />

              {/* Camera icon */}
              <div className="absolute bottom-0 right-0 bg-white shadow p-1 rounded-full cursor-pointer">
                <img
                  className="w-4 h-4 md:w-5 md:h-5"
                  src="https://img.icons8.com/ios-glyphs/30/000000/camera.png"
                  alt="camera"
                />
              </div>
            </div>

            <p className="mt-3 text-base md:text-lg font-semibold">
              Ethan Parker
            </p>
            <p className="text-gray-600 text-xs md:text-sm">
              ethanparker@gmail.com
            </p>
            <p className="text-gray-400 text-xs md:text-sm">Admin</p>

            <button
              className="flex gap-2 text-sm text-blue-500 px-4 py-2 rounded-sm font-medium cursor-pointer"
              onClick={() => navigate("/admin/profile")}
            >
              View Profile
            </button>
          </div>

          {/* Settings Button */}
          <button
            onClick={() => navigate("/admin/settings")}
            className="
              w-full mt-5 flex items-center gap-3 
              bg-black text-white py-2 rounded-lg 
              justify-center text-sm md:text-base lg:text-sm cursor-pointer
            "
          >
            <img
              className="w-5"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/settings.png"
              alt="settings"
            />
            Settings
          </button>

          {/* Logout Button */}
          <button
            className="
              w-full mt-3 flex items-center gap-3 
              bg-red-100 text-red-600 py-2 rounded-lg 
              justify-center text-sm md:text-base lg:text-sm cursor-pointer
            "
          >
            <img
              className="w-5"
              src="https://img.icons8.com/fluency-systems-regular/48/FA5252/logout-rounded.png"
              alt="logout"
            />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
