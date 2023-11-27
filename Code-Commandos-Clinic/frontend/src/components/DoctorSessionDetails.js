import React from 'react';

const DoctorSessionDetails = ({ doctor }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text">Speciality: {doctor.speciality}</p>
                <p className="card-text">Session Price: {doctor.sessionPrice}</p>
            </div>
        </div>
    );
};

export default DoctorSessionDetails;