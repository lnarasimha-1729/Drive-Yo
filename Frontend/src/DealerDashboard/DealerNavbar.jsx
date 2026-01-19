import { Bell, UserCircleIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DealerProfile from './DealerProfile'

const DealerNavbar = () => {

    const navigate = useNavigate()
  return (
    <div>
        <div className="max-w-full bg-white shadow-sm">

            <div className='flex items-center justify-between max-w-[80rem] px-4 md:px-8 py-1 mx-auto'>

                <div className='flex items-center gap-1 md:gap-1'>
                    <img src='/logo.png' alt='car' className='w-6 md:w-7'/>
                {/* Logo */}
                <h1
                    onClick={() => navigate("/admin/dashboard")}
                    className="text-lg md:text-xl lg:text-xl xl:text-2xl font-semibold cursor-pointer"
                >
                    DriveYo
                </h1>
                </div>

                {/* Right icons */}
                <div className="flex items-center gap-4 text-sm md:text-xl lg:text-xl xl:text-2xl">

                    {/* Admin Button */}
                    <button
                        className="flex items-center gap-2 text-lg md:text-xl lg:text-lg xl:text-lg text-white py-2 rounded-lg cursor-pointer"
                    >
                        <DealerProfile/>
                    </button>

                </div>

            </div>

            </div>
    </div>
  )
}

export default DealerNavbar