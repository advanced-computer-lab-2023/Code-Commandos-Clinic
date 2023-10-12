import React from 'react';

const PatientDetails = ({ patient }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{patient.name}</h5>
                <p className="card-text">Username: {patient.username}</p>
                <p className="card-text">Email: {patient.email}</p>
                <p className="card-text">Date of Birth: {patient.dateOfBirth}</p>
                <p className="card-text">Gender: {patient.gender}</p>
                <p className="card-text">Mobile Number: {patient.mobileNumber}</p>
                <p className="card-text">Emergency Contact: {patient.emergencyContact.fullName}</p>
            </div>
        </div>
    )
}

export default PatientDetails;

