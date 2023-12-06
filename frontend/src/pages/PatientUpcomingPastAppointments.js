import React, { useState, useEffect } from 'react';
import AppointmentsDetails from '../components/AppointmentsDetails';

const PatientAppointments = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments()
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
        <div className="container">
            <h2>Upcoming Appointments</h2>
            <br/>
            <div>
                {upcomingAppointments && upcomingAppointments.map((appointment) => (
                    <AppointmentsDetails key={appointment._id} filteredAppointment={appointment} reserve={false} follow_up={false} />
                ))}
            </div>
            <br/>
            <h2>Past Appointments</h2>
            <br/>
            <div>
                {pastAppointments && pastAppointments.map((appointment) => (
                    <AppointmentsDetails key={appointment._id} filteredAppointment={appointment} reserve={false} follow_up={true}  />
                ))}
            </div>
        </div>
    );
};

export default PatientAppointments;
