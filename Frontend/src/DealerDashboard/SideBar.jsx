import React from 'react'

const SideBar = () => {
    const menuItems = [
    { name: "Dashboard", to: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Quotations", to: "/quotations", icon: <FileText size={20} /> }
  ];
  return (
    <div className="h-screen w-[100%] bg-gradient-to-b from-blue-800 to-blue-950 text-white flex flex-col">

      {/* Brand */}
      <div className="py-8 text-center border-b border-blue-600">
        <h1 className="text-2xl font-semibold tracking-wide">Drive Yo</h1>
      </div>

      {/* Menu */}
      <nav className="mt-8 flex flex-col gap-3 px-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition 
               ${
                 isActive
                   ? "bg-white/20 font-semibold border-l-4 border-white"
                   : "opacity-80 hover:opacity-100 hover:bg-white/10"
               }`
            }
          >
            {item.icon}
            <span className="text-[15px]">{item.name}</span>
          </NavLink>
        ))}
      </nav>

    </div>
  )
}

export default SideBar