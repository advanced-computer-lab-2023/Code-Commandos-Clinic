// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrescriptionContainer from './pages/PrescriptionContainer';
import FilterPrescriptions from "./pages/FilterPrescriptions";
import AddPrescription from "./pages/AddPrescription";



const App = () => {
  return (
    
    <Router>
     <Routes>
       <Route path="/PrescriptionContainer" element={<PrescriptionContainer/>} />
       <Route path="/FilterPrescriptions"  element={<FilterPrescriptions/>}/>
        <Route path="/AddPrescription"  element={<AddPrescription/>}/>
     </Routes> 
    </Router>
  );
};

export default App;
