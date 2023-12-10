// DoctorPage.js
import React from 'react';
import Navbar from '../components/Navbar'; // Import the original Navbar component
import { Link, useNavigate} from 'react-router-dom';
import logo from '../images/logo.png'
import Swal from 'sweetalert2';
import heart from '../images/heart.jpeg'


const DoctorPage = () => {
    const navigate = useNavigate();

    const handleLogout = async () =>{
        console.log("in handle logout")
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
                    title: 'Logout Successful!',
                    text: message,
                  })
                  .then(() => {
                    window.localStorage.removeItem("logged");
                    navigate('/Login')
                    window.location.reload()
                });
            }
            else {
                const errorMessage = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Failed!',
                    text: 'You are not logged in',
                  })
                  .then(() => {
                    window.localStorage.removeItem("logged");
                    navigate('/Login')
                    window.location.reload()
                });
            }
        }
        catch (error){
            alert(error.message)
        }
        // window.localStorage.removeItem("logged");
        // navigate('/Login')
        // window.location.reload()
    }

    const handleLogoClick = () => {
        // Navigate to the home page
        navigate('/');
        // Reload the home page
        window.location.href = '/home';
      };
  return (
    <div>
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
                            <ul className="navbar-nav">
                                {/* Doctor Links */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="doctorDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Appointment
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="doctorDropdown">
                                        <li>
                                            <Link to="/FilterPatientsWithUpcomingAppointments" className="dropdown-item">Filter Upcoming Appointments</Link>
                                        </li>
                                        <li>
                                            <Link to="/FilterAppointmentsByDateAndStatus" className="dropdown-item">Filter Appointments</Link>
                                        </li>
                                        <li>
                                            <Link to="/CreateAppointment" className="dropdown-item">Create Appointment</Link>
                                        </li>
                                        <li>
                                            <Link to="/DoctorUpcomingPastAppointments" className="dropdown-item">View Appointments</Link>
                                        </li>
                                        {/* Add more doctor-related links here */}
                                    </ul>
                                </li>

                                {/* Patient Links */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="patientDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Your Patients
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="patientDropdown">
                                        <li>
                                            <Link to="/ViewUploadedHealthRecordPatientsOfDoctor" className="dropdown-item">View Patients Health Record </Link>
                                        </li>
                                        <li>
                                            <Link to="/AddPrescription" className="dropdown-item">Add Prescription</Link>
                                        </li>
                                        <li>
                                            <Link to="/CreateFollowUp" className="dropdown-item">Follow Up</Link>
                                        </li>
                                        {/* Add more patient-related links here */}
                                    </ul>
                                </li>

                                {/* Manage account Links */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="accountDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Manage account
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                                        <li>
                                            <Link to="/ChangePassword" className="dropdown-item">Change Password</Link>
                                        </li>
                                        <li>
                                            <Link to="/ResetPassword" className="dropdown-item">Reset Password</Link>
                                        </li>
                                        <li>
                                            <Link to="/DoctorContract" className="dropdown-item">View Contracts</Link>
                                        </li>
                                        <li>
                                            <Link to="/DoctorUpdate" className="dropdown-item">Update Info</Link>
                                        </li>
                                        <li>
                                            <Link to="/DoctorRegistration" className="dropdown-item">Registration</Link>
                                        </li>
                                        <li>
                                            <Link to="/EnterEmailReset" className="dropdown-item">Reset Email</Link>
                                        </li>
                                        {/* Add more account-related links here */}
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
  
      <h2 className='red-header' style={{ marginLeft: '20px' ,  marginTop: '110px' }} >Welcome Doctor!</h2>
      {/* Add content specific to the doctor page */}
      <img className='col-4' src={heart} style={{ marginLeft: '600px', marginTop: '10px'}} />
    </div>
  );
};

export default DoctorPage;
