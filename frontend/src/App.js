// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrescriptionContainer from './pages/PrescriptionContainer';
import ViewPrescriptionDetails from './pages/viewPrescriptionDetails';
import FilterByDoctor from './pages/filterByDoctor';



const App = () => {
  return (
    
    <Router>
     <Routes>
       <Route path="/api/prescription/prescriptionList/:patient" element={<PrescriptionContainer/>} />
       <Route path={`/api/prescription/:id`}  element={<ViewPrescriptionDetails/>} />
       <Route path={`/api/prescription/filterByDoctor`}  element={<FilterByDoctor/>}/>
     </Routes> 
    </Router>
  );
};

export default App;
