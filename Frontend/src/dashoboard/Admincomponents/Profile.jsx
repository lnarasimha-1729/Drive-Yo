import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-gray-50 px-0 py-0">

            {/* TOP NAVBAR */}
            <Navbar/>

            <div className="flex items-center gap-2 mb-6 px-6">
        <span
          onClick={() => navigate("/admin/dashboard")}
          className="text-sm text-blue-600 font-medium cursor-pointer"
        >
          Dashboard
        </span>

        <span className="text-gray-400">›</span>

        <span className="text-sm text-gray-800 font-medium">Profile</span>
      </div>


            {/* Breadcrumb */}
            <div className="px-14">
            



            {/* Title */}
            <div className="flex items-center gap-2 mb-2">
                <img
                    src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
                    className="w-6 h-6"
                />
                <h1 className="text-2xl font-semibold">Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT PROFILE CARD */}
                <div className="bg-[#4a77d8] text-white rounded-2xl p-8 shadow-md flex flex-col items-center">

                    {/* PROFILE IMAGE */}
                    <div className="relative">
                        <img className="w-24 h-24 rounded-full object-cover" src="https://img.icons8.com/ios-filled/50/1A1A1A/guest-male--v1.png" alt="guest-male--v1"/>


                        {/* Camera icon */}
                        <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow cursor-pointer">
                            <img
                                src="https://img.icons8.com/ios-glyphs/30/000000/camera.png"
                                className="w-5 h-5"
                            />
                        </div>
                    </div>

                    <p className="text-xl font-semibold mt-4">Ethan Parker</p>
                    <p className="text-sm opacity-80">Admin</p>

                    <p className="text-sm opacity-80 mt-2">
                        ethanparker@gmail.com
                    </p>
                    <p className="text-sm opacity-80">Joined: Jan 15, 2025</p>
                </div>

                {/* RIGHT PROFILE FORM */}
                <div className="bg-white rounded-2xl shadow-md p-8 lg:col-span-2">

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Profile Information</h2>

                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
                            Save Changes
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* First Name */}
                        <div>
                            <label className="text-sm text-gray-600">First Name</label>
                            <input
                                value="Ethan"
                                className="w-full mt-1 px-4 py-2 border rounded-lg"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="text-sm text-gray-600">Last Name</label>
                            <input
                                value="Parker"
                                className="w-full mt-1 px-4 py-2 border rounded-lg"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm text-gray-600">Email Address</label>
                            <input
                                value="ethanparker@gmail.com"
                                className="w-full mt-1 px-4 py-2 border rounded-lg"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm text-gray-600">Phone Number</label>
                            <input
                                value="+91 98765 54321"
                                className="w-full mt-1 px-4 py-2 border rounded-lg"
                            />
                        </div>

                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Profile;
