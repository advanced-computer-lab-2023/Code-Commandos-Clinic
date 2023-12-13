import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";

function RescheduleAppointment() {
    const [selectedStartTime,setSelectedStartTime] = useState(null)
    const [selectedEndTime,setSelectedEndTime] = useState(null)
    const {appointmentId} = useParams()
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const appointment = {
                startTime: selectedStartTime+':00.000+00:00',
                endTime: selectedEndTime+':00.000+00:00'
            }
            console.log(appointment)
            const response = await fetch('/api/appointment/rescheduleAppointment/'+appointmentId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            });
            if (response.ok) {
                const data = await response.json();
                alert("Appointment Reschedule")
                navigate('/PatientUpcomingPastAppointments')
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Error rescheduling the appointment: ', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Reschedule an Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="startTime" className="form-label">Start Time:</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={selectedStartTime}
                        onChange={(e) => setSelectedStartTime(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="endTime" className="form-label">End Time:</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        name="endTime"
                        value={selectedEndTime}
                        onChange={(e) => setSelectedEndTime(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Reschedule</button>
            </form>
        </div>
    );
}

export default RescheduleAppointment;
