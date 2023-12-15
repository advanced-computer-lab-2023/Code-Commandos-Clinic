import { useNavigate } from 'react-router-dom';
import React from "react";
import PatientNavbar from "../components/patientNavbar";
import "../css/login.css"
const PatientHome = () => {

    const navigate = useNavigate();

    const handleAppointment = () => {
        navigate('/ViewAvailableAppointmentsOfDoctor');
    };
    return(

        <body className="my-patient-background">
        {<PatientNavbar />}
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
                        Reserve an Appointment
                    </button>

                </h2>

            </div>
           
            <div className="col-6">
            <h2 className="margin-edit">
           <img className=''src={require('../images/hrt.jpeg')}/>
           </h2>
            </div>
            </div>
            </div>
            </body>
    )
}
export default PatientHome;