import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Admincomponents/Dashboard'
import Vehicles from './Admincomponents/Vehicles'
import Customers from './Admincomponents/Customers'
import Dealers from './Admincomponents/Dealers'
import Quotations from './Admincomponents/Quotations'
import Locations from './Admincomponents/Locations'
import Reports from './Admincomponents/Reports'
import Settings from './Admincomponents/Settings'

const MainArea = () => {
  return (
    <div>
        <Routes>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/vehicles' element={<Vehicles/>}/>
                <Route path='/customers' element={<Customers/>}/>
                <Route path='/dealers' element={<Dealers/>}/>
                <Route path='/quotations' element={<Quotations/>}/>
                <Route path='/locations' element={<Locations/>}/>
                <Route path='/reports' element={<Reports/>}/>
                <Route path='/settings' element={<Settings/>}/>
            </Routes>
    </div>
  )
}

export default MainArea