import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DoctorRegistrationRequests from './pages/viewDoctorRequests'
import DoctorRegistration from './pages/registerAsDoctor';
import PatientRegistration from './pages/registerAsPatient';
import DoctorUpdate from './pages/updateDoctor';
import SearchByNameAndOrSpeciality from './pages/searchByNameAndOrSpeciality'
import FilterBySpecialityAndDate from "./pages/filterBySpecialityAndDate";
import HealthPackageUpdate from './pages/updateHealthPackage';
import AddHealthPackage from './pages/addHealthPackage';
import ViewDoctorsWithSessionPrice from './pages/viewDoctorsWithSessionPrice';

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
            path="/HealthPackageUpdate"
            element={<HealthPackageUpdate/>}
        />
        <Route
            path="/AddHealthPackage"
            element={<AddHealthPackage/>}
        />
        <Route
            path="/ViewDoctorsWithSessionPrice"
            element={<ViewDoctorsWithSessionPrice/>}
        />
        </Routes>
       </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
