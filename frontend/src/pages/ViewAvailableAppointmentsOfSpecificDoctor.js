import React, { useState, useEffect } from 'react';
import AppointmentsDetails from "../components/AppointmentsDetails";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2"; // Assuming you're using React Router for routing

const ViewAvailableAppointmentsOfSpecificDoctor = () => {
    const { doctorId } = useParams();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch appointments for the specific doctor using the doctorId parameter
        fetchAppointments();
    }, [doctorId]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`/api/appointment/viewAvailableAppointmentsOfDoctor/${doctorId}`);
            if (response.status === 200) {
                const result = response.data;
                setAppointments(result);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: response.data,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
            });
        }
    };

    return (
        <div className="container">
             <hr></hr>
            <h2>Available Appointments for your Doctor </h2>

            <div>
                {appointments && appointments.map((app) => (
                    <AppointmentsDetails key={app._id} filteredAppointment={app} reserve={false} follow_up={false} issue={true} />
                ))}
            </div>
        </div>
    );
};

export default ViewAvailableAppointmentsOfSpecificDoctor;
