import React, { useState, useEffect } from 'react';
import AppointmentsDetails from '../components/AppointmentsDetails';

const DoctorAppointments = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments()
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('/api/appointment/upcomingPastAppointmentsOfDoctor', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const results = await response.json();
                setUpcomingAppointments(results.upcoming)
                setPastAppointments(results.past)

            } else {
                const errorMessage = await response.text();
                alert(errorMessage)
            }
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <h2>Upcoming Appointments</h2>
            <div>
                {upcomingAppointments && upcomingAppointments.map((appointment) => (
                    <AppointmentsDetails key={appointment._id} filteredAppointment={appointment} />
                ))}
            </div>

            <h2>Past Appointments</h2>
            <div>
                {pastAppointments && pastAppointments.map((appointment) => (
                    <AppointmentsDetails key={appointment._id} filteredAppointment={appointment} />
                ))}
            </div>
        </div>
    );
};

export default DoctorAppointments;
