import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
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
import AddFamilyMember from "./pages/addFamilyMember";
import PrescriptionContainer from "./pages/PrescriptionContainer";
import FilterPrescriptions from "./pages/FilterPrescriptions";
import AddPrescription from "./pages/AddPrescription";
import CreateAppointment from "./pages/CreateAppointment";
import ViewMyWalletAsPatient from "./pages/ViewMyWalletAsPatient";
import ViewMyWalletAsDoctor from "./pages/ViewMyWalletAsDoctor";
import CreateDoctor from "./pages/CreateDoctor";
import ViewAvailableAppointmentsOfDoctor from "./pages/ViewAvailableAppointmentsOfDoctor";
import DoctorUpcomingPastAppointments from "./pages/DoctorUpcomingPastAppointments";
import PatientUpcomingPastAppointments from "./pages/PatientUpcomingPastAppointments";
import FilterAppointmentsByDateAndStatus from "./pages/FilterAppointmentsByDateAndStatus";
import FilterAppointmentsByDateOrStatus from "./pages/FilterAppointmentsByDateOrStatus";
import ReserveAppointment from "./components/ReserveAppointment";
import EnterEmailReset from "./components/EnterEmailReset";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import DoctorContract from "./pages/DoctorContract";
import LinkFamilyMember from "./pages/linkFamilyMember";
import CreateFollowUp from "./pages/CreateFollowUp";
import HealthPackages from './pages/ViewHealthPackages';
import SubscribeToPackage from './pages/SubscribeToPackage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import UploadDocument from "./pages/UploadDocument";
import RemoveDocument from './pages/RemoveDocument';
import ViewpatientHealthRecord from './pages/ViewPatientHealthRecord';
import AddHealthRecord  from './components/AddHealthRecord';
import HealthRecordUpload from './pages/viewUploadedHealthRecordPatient';
import HealthRecordUploadPatientsDoctor from './pages/ViewUploadedHealthRecordPatientsOfDoctor';
import AppointmentSuccess from './pages/AppointmentSuccess'
import AppointmentFailure from './pages/AppointmentFailure';
import CreateContract from "./pages/CreateContract";
import Register from "./pages/Register";
import EditPrescription from "./pages/EditPrescription";

const App = () => {
    const logged = window.localStorage.getItem("logged");


  return (
    <div className="App">
      <BrowserRouter>
          {logged ? <Home/> : null}
       <div className="pages">
        <Routes>
            <Route path="/" element={logged ? <Home /> : <Navigate to="/login"/>}/>
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
            <Route path="/ViewPatientHealthRecord" element={<ViewpatientHealthRecord />}/>

            <Route path="/AddHealthRecord/:id" element={<AddHealthRecord />}/>
            <Route path="/viewUploadedHealthRecordPatient" element={<HealthRecordUpload />}/>
            <Route path="/ViewUploadedHealthRecordPatientsOfDoctor" element={<HealthRecordUploadPatientsDoctor />}/>
            <Route path="/ShowAndRemoveAdmins" element={<ShowAndRemoveAdmins />}/>
            <Route path="/ViewAndRemoveDoctors" element={<ViewAndRemoveDoctors />}/>
            <Route path="/ViewPatientsOfDoctor" element={<ViewPatientsOfDoctor/>}/>
            <Route path="/ViewMyWalletAsPatient" element={<ViewMyWalletAsPatient/>}/>
            <Route path="/ViewMyWalletAsDoctor" element={<ViewMyWalletAsDoctor/>}/>
            <Route path="/UploadDocument" element={<UploadDocument/>}/>

            <Route path="/RemoveDocument" element={<RemoveDocument/>}/>
            <Route path="/FilterPatientsWithUpcomingAppointments" element={<FilterPatientsWithUpcomingAppointments/>}/>
            <Route path="/RegisterPatientWithDoctor" element={<RegisterPatientWithDoctor/>}/>
            <Route path="/RegisteredFamilyMembers" element={<RegisteredFamilyMembers/>}/>
            <Route path="/FilterAppointmentsByDateAndStatus" element={<FilterAppointmentsByDateAndStatus/>}/>
            <Route path='/AddFamilyMember' element={<AddFamilyMember/>}/>
            <Route path="/PrescriptionContainer" element={<PrescriptionContainer/>} />
            <Route path="/FilterPrescriptions"  element={<FilterPrescriptions/>}/>
            <Route path="/AddPrescription"  element={<AddPrescription/>}/>
            <Route path="/CreateAppointment"  element={<CreateAppointment/>}/>

            <Route path="/CreateDoctor"  element={<CreateDoctor/>}/>
            <Route path="/ViewAvailableAppointmentsOfDoctor"  element={<ViewAvailableAppointmentsOfDoctor/>}/>
            <Route path="/DoctorUpcomingPastAppointments"  element={<DoctorUpcomingPastAppointments/>}/>
            <Route path="/PatientUpcomingPastAppointments"  element={<PatientUpcomingPastAppointments/>}/>
            <Route path="/FilterAppointmentsByDateOrStatus"  element={<FilterAppointmentsByDateOrStatus/>}/>
            <Route path="/ReserveAppointment/:id/"  element={<ReserveAppointment/>}/>
            <Route path="/EnterEmailReset"  element={<EnterEmailReset/>}/>
            <Route path="/ResetPassword/:email"  element={<ResetPassword/>}/>
            <Route path="/ChangePassword"  element={<ChangePassword/>}/>
            <Route path="/DoctorContract" element={<DoctorContract/>}/>
            <Route path="/LinkFamilyMember" element={<LinkFamilyMember/>}/>
            <Route path="/CreateFollowUp" element={<CreateFollowUp/>}/>

            <Route path="/HealthPackages" element={<HealthPackages/>}/>
            <Route path="/HealthPackages/Subscribe" element={<SubscribeToPackage/>}/>
            <Route path="/HealthPackages/Subscribe/Success" element={<PaymentSuccess/>}/>
            <Route path="/HealthPackages/Subscribe/Cancel" element={<PaymentCancel/>}/>
            <Route path="/AppointmentSuccess" element={<AppointmentSuccess/>}/>
            <Route path="/AppointmentFailure" element={<AppointmentFailure/>}/>
            <Route path="/CreateContract" element={<CreateContract/>}/>
            <Route path="/EditPrescription/:id" element={<EditPrescription/>}/>

            <Route path="/Register" element={<Register/>}/>
            <Route path="/Login" element={logged ? <Navigate to="/Home" replace /> : <Login/> }/>
            <Route path="/Home" element={<Home/>}/>
        </Routes>
       </div>
      </BrowserRouter>
    </div>
  );
};

export default App

