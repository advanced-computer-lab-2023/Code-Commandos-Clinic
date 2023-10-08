// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrescriptionContainer from './pages/PrescriptionContainer';



const App = () => {
  return (
    
    <Router>
     <Routes>
       <Route path="" element={<PrescriptionContainer/>} />
     </Routes> 
    </Router>
  );
};

export default App;
