import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ViewPrescriptions from './pages/viewPrescriptions'

export const App = () => {
  return (
       <Routes>
        <Route path='/' element={<ViewPrescriptions />} />
      </Routes> 
  )
}

export default App