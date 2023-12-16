import { useNavigate } from 'react-router-dom';
import React from "react";
import PatientNavbar from "../components/patientNavbar";
import "../css/login.css"
import DoctorNavbar from "../components/DoctorNavbar";
const DoctorHome = () => {

    const navigate = useNavigate();

    const handleAppointment = () => {
        navigate('/DoctorUpcomingPastAppointments');
    };
    return(

        <body className="my-patient-background">
        {<DoctorNavbar />}
        <div className="container">
        <div className="row" style={{marginTop:50}}>
      
            <div className="col-6">
            
                <h2 className="margin-edit">
                <h2 className="welcomeHeader">Welcome To Our Clinic </h2>
                                
                    <p> Experience seamless care </p>
                    <p>  at our Virtual Clinic </p>
                    <p> consult with experts from </p>
                    <p> anywhere,anytime, </p>
                    <p>  with just a click</p>
                    <button className="home-btn" onClick={handleAppointment}>
                        Your appointments
                    </button>

                </h2>

            </div>
           
            <div className="col-6">
            <h2 className="margin-edit">
           <img className=''src={require('../images/doctor.png')}/>
           </h2>
            </div>
            </div>
            </div>
            </body>
    )
}
export default DoctorHome;