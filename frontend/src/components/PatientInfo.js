import React from 'react';

const PatientInfo = ({ patientInfos }) => {
    
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text">email: {patientInfos.email.toString()}</p>
                <p className="card-text">gender: {patientInfos.gender.toString()}</p>
                <p className="card-text">mobileNumber: {patientInfos.mobileNumber.toString()}</p>
                <p className="card-text">dateOfBirth: {patientInfos.dateOfBirth.toString()}</p>
                <p className="card-text">emergencyContact: {patientInfos.emergencyContact.toString()}</p>

            </div>
        </div>
    );
};

export default PatientInfo;