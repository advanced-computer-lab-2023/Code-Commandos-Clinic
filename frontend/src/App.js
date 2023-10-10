import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DoctorRegistrationRequests from './pages/viewDoctorRequests'
import DoctorRegistration from './pages/registerAsDoctor';
import PatientRegistration from './pages/registerAsPatient';
import DoctorUpdate from './pages/updateDoctor';
import SearchByNameAndOrSpeciality from './pages/searchByNameAndOrSpeciality'
import FilterBySpecialityAndDate from "./pages/filterBySpecialityAndDate";
import AddAdmin from './pages/addAdmin';
import ShowAllAdminss from './pages/showAllToRemoveAdmins';
import ShowAllDoctors from './pages/showAllToRemoveDoctors';
import ShowAllPatients from './pages/showAllToRemovePatients';
import Tryy from './pages/forRemovingAsAdmin';
// import RemoveAsAdmin from './pages/removeAsAdmin'
//import RemovePatientOrDoctorOrAdmin from '/pages/'

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
            path="/PatientRegistration"
            element={<PatientRegistration />}
          />
          <Route 
            path="/DoctorUpdate"
            element={<DoctorUpdate />}
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
            path="/AddAdmin"
            element={<AddAdmin />}
          />
          <Route 
            path="/Tryy"
            element={<Tryy />}
          />
          <Route 
            path="/ShowAllAdmins"
            element={<ShowAllAdminss />}
          />
          <Route 
            path="/ShowAllDoctors"
            element={<ShowAllDoctors />}
          />
           <Route 
            path="/ShowAllPatients"
            element={<ShowAllPatients />}
          />
          
        </Routes>
       </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
