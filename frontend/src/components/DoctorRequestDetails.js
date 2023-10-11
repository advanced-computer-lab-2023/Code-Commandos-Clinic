import React from 'react';

const DoctorRequestDetails = ({ doctorRequest }) => {
    return (
        <div className="doctor-request-details card" style={{ margin: '20px', backgroundColor: '#f1f1f1', borderRadius: '4px' }}>
            <div className="card-body">
                <h3 className="card-title" style={{ color: '#1aac83' }}>{doctorRequest.name}</h3>
                <h5 className="card-title">{doctorRequest.name}</h5>
                <p className="card-text">
                    <strong>Username:</strong> {doctorRequest.username}
                </p>
                <p className="card-text">
                    <strong>E-mail:</strong> {doctorRequest.email}
                </p>
                <p className="card-text">
                    <strong>Password:</strong> {doctorRequest.password}
                </p>
                <p className="card-text">
                    <strong>Date of Birth:</strong> {doctorRequest.dateOfBirth}
                </p>
                <p className="card-text">
                    <strong>Hourly Rate:</strong> ${doctorRequest.hourlyRate}/hr
                </p>
                <p className="card-text">
                    <strong>Affiliation:</strong> {doctorRequest.affiliation}
                </p>
                <p className="card-text">
                    <strong>Educational Background:</strong> {doctorRequest.educationalBackground}
                </p>
                <p className="card-text">
                    <strong>Speciality:</strong> {doctorRequest.speciality}
                </p>
                <p className="card-text">
                    <strong>Request Status:</strong> {doctorRequest.status}
                </p>
                <p className="card-text">
                    <strong>Created At:</strong> {doctorRequest.createdAt}
                </p>
                <button className="btn btn-success">Accept</button>
                <button className="btn btn-danger">Reject</button>
            </div>
        </div>
    );
};

export default DoctorRequestDetails;
