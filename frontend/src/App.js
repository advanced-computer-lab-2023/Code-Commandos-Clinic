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
       <Route path="/PrescriptionContainer" element={<PrescriptionContainer/>} />
       <Route path="/ViewPrescriptionDetails"  element={<ViewPrescriptionDetails/>} />
       <Route path="/FilterByDoctor"  element={<FilterByDoctor/>}/>
     </Routes> 
    </Router>
  );
};

export default App;
