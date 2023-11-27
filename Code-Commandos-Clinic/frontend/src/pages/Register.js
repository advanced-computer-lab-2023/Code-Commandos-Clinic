import React, { useState} from "react";
import "../css/style.css"
import {useNavigate} from "react-router-dom";

const Register = () => {

    const navigate = useNavigate()

    const handlePatientChoice = ()=>{
        navigate('/PatientRegistration')
        window.location.reload()
    }
    const handleDoctorChoice = ()=>{
        navigate('/DoctorRegistration')
        window.location.reload()
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5 border-danger box">
                        <h1 className="text-center">Register</h1>
                        <div className="card-body">
                            <div>
                                <p>
                                    <a href="#" onClick={handlePatientChoice}>Register as a patient</a>
                                </p>
                                <p>
                                    <a href="#" onClick={handleDoctorChoice}>Submit a request to register as a doctor</a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
