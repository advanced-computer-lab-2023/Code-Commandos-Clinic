import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DoctorRegistrationRequests from './pages/viewDoctorRequests'
import DoctorRegistration from './pages/registerAsDoctor';
import SearchByNameAndOrSpeciality from './pages/searchByNameAndOrSpeciality'
import FilterBySpecialityAndDate from "./pages/filterBySpecialityAndDate";
import Patient from './pages/viewListOfPatients'
import UpcomingAppointments from './pages/viewAllUpcomingAppointments';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <div className="pages">
        <Routes>
          <Route 
            path="/DoctorRegistrationRequests"
            element={<DoctorRegistrationRequests />}
          />
          <Route 
            path="/DoctorRegistration"
            element={<DoctorRegistration />}
          />
          <Route
            path="/SearchByNameAndOrSpeciality"
            element={<SearchByNameAndOrSpeciality />}
          />
        <Route
            path="/FilterBySpecialityAndDate"
            element={<FilterBySpecialityAndDate/>}
        />
        <Route 
            path="/ListOfPatients"
            element={<Patient/>}
          />
          <Route 
            path="/viewAllUpcomingAppointments"
            element={<UpcomingAppointments/>}
          />
        </Routes>
       </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
