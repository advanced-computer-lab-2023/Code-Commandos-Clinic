import React from 'react';

const AppointmentsDetails = ({ filteredAppointment }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title" style={{ color: '#1aac83' }}>{filteredAppointment.patient}</h3>
                <p className="card-text">Doctor: {filteredAppointment.doctor}</p>
                <p className="card-text">Doctor Name: {filteredAppointment.doctorName}</p>
                <p className="card-text">Patient Name: {filteredAppointment.patientName}</p>
                <p className="card-text">Family Member Name: {filteredAppointment.familyMemberName}</p>
                <p className="card-text">Start Time: {filteredAppointment.startTime}</p>
                <p className="card-text">End Time: {filteredAppointment.endTime}</p>
                <p className="card-text">Status: {filteredAppointment.status}</p>
            </div>
        </div>
    );
};

export default AppointmentsDetails;
