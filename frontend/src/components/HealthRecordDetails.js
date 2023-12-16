import React from 'react';
import { Link } from 'react-router-dom';
import record from '../images/healthrecord.jpg';
import "../css/viewUploadedHealthRecordPatient.css";

const HealthRecordDetails = ({ healthRecord }) => {
    return (
        <div className="box" style={{display:"flex",flexDirection:"row"}}>
            <div className="card-body">
                <p >AllergicHistory: {healthRecord.AllergicHistory}</p>
                <p >Main Complaint: {healthRecord.MainComplaint}</p>
                <p >Blood Type: {healthRecord.BloodType}</p>
                <p >
                    Uplaoded File: <Link to={healthRecord.urlName} style= {{textDecoration: 'none'}}>Click To view</Link>
                </p>

            </div>
            <div>
                <img src={record} className="record" alt="record" />
            </div>
        </div>
    );
};

export default HealthRecordDetails;