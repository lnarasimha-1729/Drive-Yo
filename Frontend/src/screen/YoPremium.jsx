import React from 'react'
import { useNavigate } from 'react-router-dom'

const YoPremium = () => {
  const navigate = useNavigate()
  return (
    <div className='px-20 py-5 bg-gray-100 !min-h-[100vh] min-w-[100vw]'>
      <p onClick={() => navigate("/")} className='cursor-pointer text-end w-full'>X</p>
      <div className=''>
        <p className='text-2xl text-center font-semibold'>Upgrade Plan</p>

      </div>

      <div className='flex justify-center mt-5'>
        <div className="flex flex-col gap-6 bg-white shadow-lg w-[40%] rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">

  {/* Header */}
  <div className="flex items-center justify-between">
    <p className="text-2xl font-semibold text-gray-800">Yo Premium</p>
    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
      ⭐ Most Popular
    </span>
  </div>

  {/* Pricing */}
  <div className="flex items-end gap-2 border-b pb-4">
    <p className="text-gray-400 text-lg">$</p>
    <p className="text-4xl font-bold text-gray-900">60</p>
    <p className="text-gray-400 text-sm mb-1">/month</p>
  </div>

  {/* Features */}
  <div className="text-sm flex flex-col gap-3">
    <div className="flex items-center gap-2">
      <span className="text-green-500 text-lg">✔</span>
      <p>AI Agent for Lease Negotiation</p>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-green-500 text-lg">✔</span>
      <p>Get the best deals on lease instantly</p>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-green-500 text-lg">✔</span>
      <p>Save more money on car leasing</p>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-green-500 text-lg">✔</span>
      <p>Unlimited lease negotiations for 30 days</p>
    </div>
  </div>

  {/* CTA Button */}
  <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
    Get Premium
  </button>

  {/* Guarantee */}
  <p className="text-xs text-center text-gray-400">
    🔒 100% secure • Cancel anytime
  </p>

</div>

      </div>
    </div>
  )
}

export default YoPremium