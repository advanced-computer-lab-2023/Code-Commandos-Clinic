import { useNavigate } from 'react-router-dom';
import React from "react";


const PatientHome = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/Login');
    };
    return(

        <body className="my-patient-background">
      
        <div className="row">
        <div class="welcome-page">
            <div className="col-4">
            
                <h2 className="margin-edit">
                <h2 className="welcomeHeader">Welcome To Our Clinic </h2>
                                
                    
                    <p> Experience seamless care </p>
                    <p>  at our Virtual Clinic </p>
                    <p> consult with experts from anywhere,</p>
                    <p> anytime, with just a click</p>
                    <button className="patient-btn" onClick={handleBack}>
                        Reserve an Appointment
                    </button>

                </h2>

            </div>
          
            </div>
            </div>

        </body>
    )
}
export default PatientHome;