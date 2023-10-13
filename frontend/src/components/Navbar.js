import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../css/navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-light fixed-top">
                <div className="container">
                    <a className="navbar-brand col-4" href="#">
                        <img src={logo} class="logo" alt="Logo"/>
                    </a>
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
                                            <Link to="/ViewDoctorsWithSessionPrice" className="dropdown-item">View Doctors With Session Price</Link>
                                        </li>
                                        <li>
                                            <Link to="/AddAdmin" className="dropdown-item">Add Admin</Link>
                                        </li>
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
                                            <Link to="/ViewAndRemoveDoctors" className="dropdown-item">View And Remove Doctors</Link>
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
                                            <Link to="/FilteredAppointments" className="dropdown-item">Filtered Appointments</Link>
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
                                    </ul>
                                </li>
                            </ul>

                            <ul class="navbar-nav">
                                <li>
                                    <a href="" className="nav-link font">Log in</a>
                                </li>
                                <li>
                                    <button className="buttonNav">Sign Up</button>
                                </li>
                            </ul>

                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Navbar