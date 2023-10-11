import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from "./components/Navbar";
import DoctorRegistrationRequests from './pages/viewDoctorRequests'
import DoctorRegistration from './pages/registerAsDoctor';
import PatientRegistration from './pages/registerAsPatient';
import DoctorUpdate from './pages/updateDoctor';
import SearchByNameAndOrSpeciality from './pages/searchByNameAndOrSpeciality'
import FilterBySpecialityAndDate from "./pages/filterBySpecialityAndDate";
import HealthPackageUpdate from './pages/updateHealthPackage';
import AddHealthPackage from './pages/addHealthPackage';
import ViewDoctorsWithSessionPrice from './pages/viewDoctorsWithSessionPrice';
import ViewAndRemovePatients from "./pages/ViewAndRemovePatients";
import AddAdmin from './pages/AddAdmin';
import ShowAndRemoveAdmins from './pages/ShowAndRemoveAdmins';
import ViewAndRemoveDoctors from "./pages/ViewAndRemoveDoctors";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
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
        <Route
            path="/ViewAndRemovePatients"
            element={<ViewAndRemovePatients/>}
        />
        <Route
            path="/AddAdmin"
            element={<AddAdmin />}
          />
          <Route 
            path="/ShowAndRemoveAdmins"
            element={<ShowAndRemoveAdmins />}
          />
          <Route 
            path="/ViewAndRemoveDoctors"
            element={<ViewAndRemoveDoctors />}
          />

        </Routes>
       </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
