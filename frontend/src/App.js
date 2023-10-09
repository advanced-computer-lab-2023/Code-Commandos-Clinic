// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrescriptionContainer from './pages/PrescriptionContainer';
import ViewPrescriptionDetails from './pages/viewPrescriptionDetails';



const App = () => {
  return (
    
    <Router>
     <Routes>
       <Route path="" element={<PrescriptionContainer/>} />
       <Route path={`/api/prescription/:id`}  element={<ViewPrescriptionDetails/>} />
     </Routes> 
    </Router>
  );
};

export default App;
