import React from 'react';
import { Link } from 'react-router-dom';

const AppointmentsDetails = ({ filteredAppointment, reserve }) => {
    return (
        <div className="card box">
            <div className="card-body">
                <p className="card-text">Doctor Name: {filteredAppointment.doctorName}</p>
                <p className="card-text">Patient Name: {filteredAppointment.patientName}</p>
                <p className="card-text">Family Member Name: {filteredAppointment.familyMemberName}</p>
                <p className="card-text">Start Time: {filteredAppointment.startTime}</p>
                <p className="card-text">End Time: {filteredAppointment.endTime}</p>
                <p className="card-text">Status: {filteredAppointment.status}</p>
            </div>
            {reserve && (
                <Link to={`/ReserveAppointment/${filteredAppointment._id}`}>
                    <button
                        className="btn btn-success"
                        style={{
                            position: 'absolute',
                            top: 10,
                            bottom: 10,
                            right: 10,
                        }}
                    >
                        Reserve
                    </button>
                </Link>
            )}
        </div>
    );
};

export default AppointmentsDetails;
