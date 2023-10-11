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
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Blog</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Virtual Clinic
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