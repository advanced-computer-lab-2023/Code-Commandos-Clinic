import React, { useState, useEffect } from 'react';
import AppointmentsDetails from '../components/AppointmentsDetails';
import Swal from 'sweetalert2';

const PatientAppointments = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);
    const [showAppointments, setShowAppointments] = useState(null);

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

    const handleButtonClick = (appointments) => {
        setShowAppointments(appointments);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 mb-3">
                <div style={{ marginTop:'30px' }}>
                    <button
                        className="btn btn-danger btn-block rounded-pill"
                        onClick={() => handleButtonClick(upcomingAppointments)}
                    >
                        Show Upcoming Appointments
                    </button>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                <div style={{ marginTop:'30px' }}>

                    {/* Image column */}
                    <img
                        src={process.env.PUBLIC_URL + `/leftright.png`}
                        style={{
                            maxWidth: '50px',
                            height: '',
                            margin: '0 auto', // Center the image horizontally
                            display: 'block', // Make the image a block element
                        }}
                    />
                 </div>
                </div>
                <div className="col-md-4 mb-3 custom-right-align">
                <div style={{ marginTop:'30px' }}>

                    <button
                        className="btn btn-danger btn-block rounded-pill"
                        onClick={() => handleButtonClick(pastAppointments)}
                    >
                        Show Past Appointments
                    </button>
                </div>
              </div>
            </div>

            {/* Display Appointments on the side */}
            {showAppointments && (
                <div className="row mt-3">
                    <div className="col-md-12">
<h2 className="mb-4"><hr className="lineAround"></hr>Appointments<hr className="lineAround"></hr></h2>

                                    <tbody>
                                        {showAppointments.map((appointment) => (
                                            <AppointmentsDetails key={appointment._id} filteredAppointment={appointment} reserve={false} />
                                        ))}

                                    </tbody>


                    </div>

                </div>
            )}
             <img
                             src={process.env.PUBLIC_URL + `/patientapp1.png`}
                             style={{
                                 maxWidth: '700px',   // Adjust the maximum width as needed
                                 height: '',
                                 position: 'fixed',   // Fixed position
                                 top: '300px',         // Adjust the top position as needed
                                 right: '200px',       // Adjust the right position as needed
                                 zIndex: '1',         // Ensure the image stays on top
                             }}
                         />
        </div>

    );
};

export default PatientAppointments;
