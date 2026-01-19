import React from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ChevronRight, Forward, ForwardIcon, MoveRight, UserCircle } from "lucide-react";
import DealerNavbar from "../DealerNavbar";

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-gray-50 px-0 py-0">

            {/* TOP NAVBAR */}
            <DealerNavbar />

            <div className="max-w-[80rem] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-0 mb-6 pt-4">
                <span
                    onClick={() => navigate("/dealer/dashboard")}
                    className="text-[0.875rem] md:text-[1rem] lg:text-[1rem] text-blue-600 font-medium cursor-pointer"
                >
                    Dashboard
                </span>

                <ChevronRight className="w-4" />

                <span className="text-[0.875rem] md:text-[1rem] lg:text-[1rem] text-gray-800 font-medium">Profile</span>
            </div>


            {/* Breadcrumb */}
            <div className="pb-6">

                {/* Title */}
                <div className="flex items-center gap-2 mb-2">
                    <UserCircle />
                    <h1 className="text-[1rem] md:text-[1.06rem] lg:text-[1.15rem] font-semibold">Profile</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* LEFT PROFILE CARD */}
                    <div className="bg-[#4a77d8] text-white rounded-2xl p-8 shadow-md flex flex-col items-center justify-center">

                        {/* PROFILE IMAGE */}
                        <div className="relative">
                            <UserCircle className="text-black w-24 h-24 rounded-full object-cover" />


                            {/* Camera icon */}
                            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow cursor-pointer">
                                <Camera className="text-black w-5" />
                            </div>
                        </div>

                        <p className="text-xl font-semibold mt-4">Ethan Parker</p>
                        <p className="text-sm opacity-80">Dealer</p>

                        <p className="text-sm opacity-80 mt-2">
                            ethanparker@gmail.com
                        </p>
                        <p className="text-sm opacity-80">Joined: Jan 15, 2025</p>
                    </div>

                    {/* RIGHT PROFILE FORM */}
                    <div className="bg-white rounded-2xl shadow-md p-8 lg:col-span-2">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[1rem] md:text-[1.06rem] lg:text-[1.15rem] font-semibold">Profile Information</h2>

                            <button className="text-[0.875rem] md:text-[0.875rem] lg:text-[0.875rem] px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
                                Save Changes
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4 lg:gap-4 xl:gap-12 text-[0.875rem] md:text-[0.875rem] lg:text-[0.875rem]">

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
        </div>
    );
};

export default Profile;
