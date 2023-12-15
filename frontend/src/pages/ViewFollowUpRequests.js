import React, { useState, useEffect } from 'react';
import AppointmentsDetails from "../components/AppointmentsDetails";
import axios from "axios";

const ViewFollowUpRequests = () => {
    const [appointments, setAppointments] = useState([]);
    const doctorId = window.localStorage.getItem("id")

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('/api/appointment/filterAppointmentsByDateOrStatus/none/PENDING');
            if (response.status === 200) {
                const allAppointments = response.data;

                // Filter appointments based on the doctorId
                const doctorAppointments = allAppointments.filter(appointment => appointment.doctor === doctorId);

                console.log(doctorAppointments);
                setAppointments(doctorAppointments);
            } else {
                alert(response.data);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAccept = async( appointmentId) => {
        try {
            const response = await axios.put(`/api/appointment/acceptFollowUp/${appointmentId}`);
            if (response.status === 200) {
               alert("Follow up request accepted successfully");
                window.location.reload();
            } 
             else{  
                alert(response.data);
            }
        } catch (error) {
            alert(error.message);
        }
    };


    const handleReject = async (appointmentId) => {
        try {
            const response = await axios.put(`/api/appointment/updateStatusToFree/${appointmentId}`);
            if (response.status === 200) {
                alert("Follow up request revoked successfully");
                window.location.reload();
            } else {
                alert(" Follow up request revocation failed");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container">
            <hr></hr>
            <h2>Follow Up Requests </h2>

            <div>
                {appointments && appointments.map((app) => (
                    <div key={app._id}>
                        <AppointmentsDetails filteredAppointment={app} reserve={false} follow_up={false} issue={false} />
                        <button className='btn btn-success' onClick={() => handleAccept(app._id)}>Accept</button>
                        <button className='btn btn-danger' onClick={() => handleReject(app._id)}>Revoke</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewFollowUpRequests;