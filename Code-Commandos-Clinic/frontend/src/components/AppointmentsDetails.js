import React from 'react';
import { Link } from 'react-router-dom';

const AppointmentsDetails = ({ filteredAppointment, reserve }) => {
    return (
        <div className="card box">
            <div className="card-body">
                <p className="card-text"><strong>Doctor Name: </strong>{filteredAppointment.doctorName}</p>
                <p className="card-text"><strong>Patient Name: </strong>{filteredAppointment.patientName}</p>
                <p className="card-text"><strong>Family Member Name: </strong>{filteredAppointment.familyMemberName}</p>
                <p className="card-text"><strong>Start Time: </strong>{filteredAppointment.startTime}</p>
                <p className="card-text"><strong>End Time: </strong>{filteredAppointment.endTime}</p>
                <p className="card-text"><strong>Status: </strong>{filteredAppointment.status}</p>
                <p className="card-text"><strong>Type: </strong>{filteredAppointment.type}</p>

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
