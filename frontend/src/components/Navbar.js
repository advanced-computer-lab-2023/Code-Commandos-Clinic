import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../css/navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


const Navbar = () => {
    const navigate = useNavigate();
 
    const handleLogout = async () =>{
        try {
            const response = await fetch('api/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const message = await response.json()
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: message,
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
                });
            }
        }
        catch (error){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
        window.localStorage.removeItem("logged");
        window.localStorage.removeItem("role");
        window.localStorage.removeItem("username")
        window.localStorage.removeItem("id")
        navigate('/Login')
        window.location.reload()
    }

    const handleLogoClick = () => {
        // Navigate to the home page
        navigate('/');
        // Reload the home page
        window.location.href = '/home';
      };

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-light fixed-top">
                <div className="container">
                    <Link to ="/" className="navbar-brand col-4" onClick={handleLogoClick}>
                        <img src={logo} class="logo" alt="Logo"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse items-nav col-8" id="navbarCollapse">
                            <ul class="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Services</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Services
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="servicesDropdown">

                                        <li>
                                            <Link to="/DoctorRegistrationRequests" className="dropdown-item">Doctor Registration Requests</Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewFollowUpRequests" className="dropdown-item">FollowUp Requests</Link>
                                        </li>
                                        <li>
                                            <Link to="/DoctorRegistration" className="dropdown-item">Doctor Registration</Link>
                                        </li>
                                        <li>
                                            <Link to="/DoctorUpdate" className="dropdown-item">Doctor Update</Link>
                                        </li>
                                        <li>
                                            <Link to="/PatientRegistration" className="dropdown-item">Patient Registration</Link>
                                        </li>
                                        <li>
                                            <Link to="/SearchByNameAndOrSpeciality" className="dropdown-item">Search By Name And Or Speciality</Link>
                                        </li>
                                        <li>
                                            <Link to="/FilterBySpecialityAndDate" className="dropdown-item">Filter By Speciality And Date</Link>
                                        </li>
                                        <li>
                                            <Link to="/HealthPackageUpdate" className="dropdown-item">Health Package Update</Link>
                                        </li>
                                        <li>
                                            <Link to="/AddHealthPackage" className="dropdown-item">Add Health Package</Link>
                                        </li>
                                        <li>
                                            <Link to="/HealthPackages" className="dropdown-item">View Health Packages</Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewDoctorsWithSessionPrice" className="dropdown-item">View Doctors With Session Price</Link>
                                        </li>
                                        <li>
                                            <Link to="/AddAdmin" className="dropdown-item">Add Admin</Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewAvailableAppointmentsOfDoctor" className="dropdown-item">View Available Appointments</Link>
                                        </li>
                                        <li>
                                            <Link to="/DoctorUpcomingPastAppointments" className="dropdown-item">Doctor Upcoming And Past Appointments</Link>
                                        </li>
                                        <li>
                                            <Link to="/PatientUpcomingPastAppointments" className="dropdown-item">Patient Upcoming And Past Appointments</Link>
                                        </li>
                                        <li>
                                            <Link to="/FilterAppointmentsByDateOrStatus" className="dropdown-item">Filter Appointments By Date Or Status</Link>
                                        </li>
                                        <li>
                                            <Link to="/DoctorContract" className="dropdown-item">My contract</Link>
                                        </li>
                                        <li>
                                            <Link to="/CreateContract" className="dropdown-item">Create contract</Link>
                                        </li>
                                        <li>
                                            <Link to="/LinkFamilyMember" className="dropdown-item">Link Family Member</Link>
                                        </li>
                                        
                                            {/* <Link to="/CreateFollowUp" className="dropdown-item">Create Follow-Up</Link>
                                        </li> */}
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Virtual Clinic
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                                        <li>
                                            <Link to="/ViewAndRemovePatients" className="dropdown-item">View And Remove Patients</Link>
                                        </li>
                                        <li>
                                            <Link to="/ShowAndRemoveAdmins" className="dropdown-item">View And Remove Admins</Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewpatientHealthRecord" className="dropdown-item">View Health Record</Link>
                                        </li>
                                        <li>
                                            <Link to="/viewUploadedHealthRecordPatient" className="dropdown-item">View uploaded Health Record</Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewUploadedHealthRecordPatientsOfDoctor" className="dropdown-item">uploaded helthrecord of patients (you are the doctor) </Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewAndRemoveDoctors" className="dropdown-item">View And Remove Doctors</Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewMyWalletAsPatient" className="dropdown-item">View My Wallet patient</Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewMyWalletAsDoctor" className="dropdown-item">View My Wallet doctor</Link>
                                        </li>
                                        <li>
                                            <Link to="/UploadDocument" className="dropdown-item">upload a document</Link>
                                        </li>
                                        <li>
                                            <Link to="/RemoveDocument" className="dropdown-item">remove a document</Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewPatientsOfDoctor" className="dropdown-item">Your Patients</Link>
                                        </li>
                                        <li>
                                            <Link to="/FilterPatientsWithUpcomingAppointments" className="dropdown-item">Patients whom you have upcoming appointments with</Link>
                                        </li>
                                        <li>
                                            <Link to="/RegisterPatientWithDoctor" className="dropdown-item">Register Patient With Doctor</Link>
                                        </li>
                                        <li>
                                            <Link to="/AddFamilyMember" className="dropdown-item">Add Family Member</Link>
                                        </li>
                                        <li>
                                            <Link to="/RegisteredFamilyMembers" className="dropdown-item">Registered Family Members</Link>
                                        </li>
                                        <li>
                                            <Link to="/FilterAppointmentsByDateAndStatus" className="dropdown-item">Filter Appointments By Date & Status</Link>
                                        </li>
                                        <li>
                                            <Link to="/PrescriptionContainer" className="dropdown-item">Your Prescriptions</Link>
                                        </li>
                                        <li>
                                            <Link to="/FilterPrescriptions" className="dropdown-item">Filter Prescriptions</Link>
                                        </li>
                                        <li>
                                            <Link to="/AddPrescription" className="dropdown-item">Add Prescription</Link>
                                        </li>
                                        <li>
                                            <Link to="/CreateAppointment" className="dropdown-item">Create Appointment</Link>
                                        </li>
                                        <li>
                                            <Link to="/CreateDoctor" className="dropdown-item">Create Doctor</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul class="navbar-nav">
                                <li>
                                    <button onClick={handleLogout} className="buttonNav logout">Log out</button>
                                </li>
                                <li>
                                    <button className="buttonNav">Sign Up</button>
                                </li>



                            </ul>
                        <div className="nav-settings">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-gear" viewBox="0 0 16 16">
                                <path
                                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path
                                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="settingsDrop" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Settings
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="settingsDrop">
                                    <li>
                                        <Link to="/ChangePassword" className="dropdown-item">Change Password</Link>
                                    </li>
                                </ul>
                            </div>
                    
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Navbar