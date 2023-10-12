import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DoctorRegistrationRequests from './pages/viewDoctorRequests'
import DoctorRegistration from './pages/registerAsDoctor';
import SearchByNameAndOrSpeciality from './pages/searchByNameAndOrSpeciality'
import FilterBySpecialityAndDate from "./pages/filterBySpecialityAndDate";
import ViewPatientsOfDoctor from "./pages/ViewPatientsOfDoctor";
import RegisterPatientWithDoctor from "./pages/RegisterPatientWithDoctor";
import FilterPatientsWithUpcomingAppointments from "./pages/FilterPatientsWithUpcomingAppointments";
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
            path="/ViewPatientsOfDoctor"
            element={<ViewPatientsOfDoctor/>}
          />
          <Route 
            path="/FilterPatientsWithUpcomingAppointments"
            element={<FilterPatientsWithUpcomingAppointments/>}
          />
            <Route
                path="/RegisterPatientWithDoctor"
                element={<RegisterPatientWithDoctor/>}
            />
        </Routes>
       </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
