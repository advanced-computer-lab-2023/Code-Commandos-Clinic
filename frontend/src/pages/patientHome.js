import { useNavigate } from 'react-router-dom';
import React from "react";
import hrtImage from '../images/hrt.jpeg'; // Import the image

const PatientHome = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/Login');
    };
    return(

       
        <div className="container">
        <div className="row">
      
            <div className="col-6">
            
                <h2 className="margin-edit">
                <h2 className="welcomeHeader">Welcome To Our Clinic </h2>
                                
                    <p> Experience seamless care </p>
                    <p>  at our Virtual Clinic </p>
                    <p> consult with experts from </p>
                    <p> anywhere,anytime, </p>
                    <p>  with just a click</p>
                    <button className="patient-btn" onClick={handleBack}>
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
      
    )
}
export default PatientHome;