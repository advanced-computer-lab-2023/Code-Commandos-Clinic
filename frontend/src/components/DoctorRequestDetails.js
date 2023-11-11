import React from 'react';

const DoctorRequestDetails = ({ doctorRequest }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title" style={{ color: '#1aac83' }}>{doctorRequest.name}</h5>
                <p className="card-text">Username: {doctorRequest.username}</p>
                <p className="card-text">Email: {doctorRequest.email}</p>
                <p className="card-text">Date of Birth: {doctorRequest.dateOfBirth}</p>
                <p className="card-text">Hourly Rate: ${doctorRequest.hourlyRate}/hr</p>
                <p className="card-text">Affiliation: {doctorRequest.affiliation}</p>
                <p className="card-text">Educational Background: {doctorRequest.educationalBackground}</p>
                <p className="card-text">Speciality: {doctorRequest.speciality}</p>
                <p className="card-text">Request Status: {doctorRequest.status}</p>
                <p className="card-text">Created At: {doctorRequest.createdAt}</p>
                <button className="btn btn-success">Accept</button>
                <button className="btn btn-danger">Reject</button>
            </div>
        </div>
    );
};

export default DoctorRequestDetails;
