import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from "./pages/Login";
import Home from "./pages/Home";
import DoctorRegistrationRequests from "./pages/viewDoctorRequests";
import DoctorRegistration from "./pages/registerAsDoctor";
import PatientRegistration from "./pages/registerAsPatient";
import DoctorUpdate from "./pages/updateDoctor";
import SearchByNameAndOrSpeciality from "./pages/searchByNameAndOrSpeciality";
import FilterBySpecialityAndDate from "./pages/filterBySpecialityAndDate";
import HealthPackageUpdate from "./pages/updateHealthPackage";
import AddHealthPackage from "./pages/addHealthPackage";
import ViewDoctorsWithSessionPrice from "./pages/viewDoctorsWithSessionPrice";
import ViewAndRemovePatients from "./pages/ViewAndRemovePatients";
import AddAdmin from "./pages/AddAdmin";
import ShowAndRemoveAdmins from "./pages/ShowAndRemoveAdmins";
import ViewAndRemoveDoctors from "./pages/ViewAndRemoveDoctors";
import ViewPatientsOfDoctor from "./pages/ViewPatientsOfDoctor";
import FilterPatientsWithUpcomingAppointments from "./pages/FilterPatientsWithUpcomingAppointments";
import RegisterPatientWithDoctor from "./pages/RegisterPatientWithDoctor";
import RegisteredFamilyMembers from "./pages/viewRegisteredFamilyMembers";
import FilteredAppointments from "./pages/viewFilteredAppointments";
import AddFamilyMember from "./pages/addFamilyMember";
import PrescriptionContainer from "./pages/PrescriptionContainer";
import FilterPrescriptions from "./pages/FilterPrescriptions";
import AddPrescription from "./pages/AddPrescription";
import CreateAppointment from "./pages/CreateAppointment";
import CreateDoctor from "./pages/CreateDoctor";
import {useState,useEffect} from "react";

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [check, setCheck] = useState(null);

    useEffect(() => {
        checkLogIn();
    }, []);
        const checkLogIn = async ()=>{
        try {
            const response = await fetch('/api/user/checkLoggedIn',{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if(response.ok){
                console.log("frontend says logged in")
                setIsLoggedIn(true);
                setCheck(true)
            }
            else {
                console.log("not logged in from frontend")
                setIsLoggedIn(false);
                setCheck(true)
            }
        }
        catch (error){
            setIsLoggedIn(false);
            setCheck(true)
        }
    }

  return (
    <div className="App">
      <BrowserRouter>
          {check && (isLoggedIn ? <Home/> : <Login />)}
       <div className="pages">
        <Routes>
            <Route path="/DoctorRegistrationRequests" element={<DoctorRegistrationRequests />}/>
            <Route path="/DoctorRegistration" element={<DoctorRegistration />}/>
            <Route path="/PatientRegistration" element={<PatientRegistration />}/>
            <Route path="/DoctorUpdate" element={<DoctorUpdate />}/>
            <Route path="/SearchByNameAndOrSpeciality" element={<SearchByNameAndOrSpeciality />}/>
            <Route path="/FilterBySpecialityAndDate" element={<FilterBySpecialityAndDate/>}/>
            <Route path="/HealthPackageUpdate" element={<HealthPackageUpdate/>}/>
            <Route path="/AddHealthPackage" element={<AddHealthPackage/>}/>
            <Route path="/ViewDoctorsWithSessionPrice" element={<ViewDoctorsWithSessionPrice/>}/>
            <Route path="/ViewAndRemovePatients" element={<ViewAndRemovePatients/>}/>
            <Route path="/AddAdmin" element={<AddAdmin />}/>
            <Route path="/ShowAndRemoveAdmins" element={<ShowAndRemoveAdmins />}/>
            <Route path="/ViewAndRemoveDoctors" element={<ViewAndRemoveDoctors />}/>
            <Route path="/ViewPatientsOfDoctor" element={<ViewPatientsOfDoctor/>}/>
            <Route path="/FilterPatientsWithUpcomingAppointments" element={<FilterPatientsWithUpcomingAppointments/>}/>
            <Route path="/RegisterPatientWithDoctor" element={<RegisterPatientWithDoctor/>}/>
            <Route path="/RegisteredFamilyMembers" element={<RegisteredFamilyMembers/>}/>
            <Route path="/FilteredAppointments" element={<FilteredAppointments/>}/>
            <Route path='/AddFamilyMember' element={<AddFamilyMember/>}/>
            <Route path="/PrescriptionContainer" element={<PrescriptionContainer/>} />
            <Route path="/FilterPrescriptions"  element={<FilterPrescriptions/>}/>
            <Route path="/AddPrescription"  element={<AddPrescription/>}/>
            <Route path="/CreateAppointment"  element={<CreateAppointment/>}/>
            <Route path="/CreateDoctor"  element={<CreateDoctor/>}/>
            <Route path="/Login" element={check && (isLoggedIn ? <Navigate to="/Home" replace /> : <Login/>)}/>
            <Route exact path="/Home" element={<Home/>}/>
        </Routes>
       </div>
      </BrowserRouter>
    </div>
  );
};

export default App

