import React, { useState, useEffect } from 'react';
import AppointmentsDetails from '../components/AppointmentsDetails';
import Swal from 'sweetalert2';

const PatientAppointments = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('/api/appointment/upcomingPastAppointmentsOfPatient', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const results = await response.json();
                setUpcomingAppointments(results.upcoming);
                setPastAppointments(results.past);
            } else {
                const errorMessage = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    };

    return (
        <div className="container">
            {/* Upcoming Appointments Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th colSpan="4">
                            <h2 style={{ color: 'red' }}>Upcoming Appointments</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {upcomingAppointments && upcomingAppointments.map((appointment) => (
                        <AppointmentsDetails key={appointment._id} filteredAppointment={appointment} reserve={false} />
                    ))}
                </tbody>
            </table>

            {/* Past Appointments Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th colSpan="4">
                            <h2 style={{ color: 'red' }}>Past Appointments</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pastAppointments && pastAppointments.map((appointment) => (
                        <AppointmentsDetails key={appointment._id} filteredAppointment={appointment} reserve={false} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientAppointments;
