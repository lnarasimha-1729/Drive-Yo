import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()
  return (
    <div>
        <div className="w-[100vw] bg-white flex justify-between items-center px-6 py-2 shadow-sm">

                {/* Logo */}
                <h1
                    onClick={() => navigate("/admin/dashboard")}
                    className="text-2xl font-semibold cursor-pointer"
                >
                    DriveYo
                </h1>

                {/* Right icons */}
                <div className="flex items-center gap-4">

                    {/* Notification Icon */}
                    <button className="w-9 h-9 bg-black rounded-full flex items-center justify-center">
                        <img
            className="w-5 h-5"
            src="https://img.icons8.com/sf-regular/48/FFFFFF/appointment-reminders.png"
            alt="notification"
          />
                    </button>

                    {/* Admin Button */}
                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
                        <img
            className="w-6 h-6"
            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/user--v1.png"
            alt="user"
          />
                        Admin
                    </button>

                </div>

            </div>
    </div>
  )
}

export default Navbar