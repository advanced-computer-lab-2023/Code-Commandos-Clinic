import React from 'react';

const DoctorDetails = ({ doctor }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text">Username: {doctor.username}</p>
                <p className="card-text">Email: {doctor.email}</p>
                <p className="card-text">Date of Birth: {doctor.dateOfBirth}</p>
                <p className="card-text">Hourly Rate: ${doctor.hourlyRate}/hr</p>
                <p className="card-text">Affiliation: {doctor.affiliation}</p>
                <p className="card-text">Educational Background: {doctor.educationalBackground}</p>
                <p className="card-text">Speciality: {doctor.speciality}</p>
            </div>
        </div>
    );
};

export default DoctorDetails;