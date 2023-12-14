import React from 'react';
import { Link } from 'react-router-dom';


const HealthRecordDetails = ({ healthRecord }) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text">AllergicHistory: {healthRecord.AllergicHistory}</p>
                <p className="card-text">Main Complaint: {healthRecord.MainComplaint}</p>
                <p className="card-text">Blood Type: {healthRecord.BloodType}</p>
                <p className="card-text">
                    Uplaoded File: <Link to={healthRecord.urlName} style= {{color : '#A84545' ,textDecoration: 'none'}}>Click To view</Link>
                </p>

            </div>
        </div>
    );
};

export default HealthRecordDetails;