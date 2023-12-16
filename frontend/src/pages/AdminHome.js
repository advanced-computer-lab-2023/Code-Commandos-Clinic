import { useNavigate } from 'react-router-dom';
import React from "react";
import PatientNavbar from "../components/patientNavbar";
import "../css/login.css"
import DoctorNavbar from "../components/DoctorNavbar";
import AdminNavbar from "../components/AdminNavbar";
const AdminHome = () => {

    const navigate = useNavigate();

    const handleAppointment = () => {
        navigate('/ViewAndRemovePatients');
    };
    return(

        <body className="my-patient-background">
        {<AdminNavbar />}
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
                        System Patients
                    </button>

                </h2>

            </div>
           
            <div className="col-6">
            <h2 className="margin-edit">
           <img className=''src={require('../images/admin.png')}/>
           </h2>
            </div>
            </div>
            </div>
            </body>
    )
}
export default AdminHome;