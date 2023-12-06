import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function CreateFollowUp() {
    const [selectedStartTime, setSelectedStartTime] = useState(null);
    const [selectedEndTime, setSelectedEndTime] = useState(null);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch('/api/patient/getPatientsOfADoctor');
            if (response.ok) {
                const data = await response.json();
                setPatients(data);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const appointment = {
                patient: selectedPatient,
                startTime: selectedStartTime + ':00.000+00:00',
                endTime: selectedEndTime + ':00.000+00:00',
            };

            const response = await fetch('/api/appointment/scheduleFollowUp/' + selectedPatient, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            });

            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Follow-Up created successfully',
                    text: data.message, // If there's a specific success message from the server
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error creating Follow-Up',
                text: error.message,
            });
        }
    };

    return (
        <div className="container mt-5">
<h2 className="mb-4"><hr className="lineAround"></hr>Patient Follow-UP Check<hr className="lineAround"></hr></h2>              <img
                     src={process.env.PUBLIC_URL + `/ffollow.gif`}
                      style={{
                      maxWidth: '500px',   // Adjust the maximum width as needed
                      height: '',
                      float: 'right',      // Float the image to the right
                     marginRight: '-40px',  // Adjust the right margin as needed
                     marginTop: '-80px'

                     }}
               />


             <form onSubmit={handleSubmit}>
                        <div style={{ border: '2px solid red', borderRadius: '8px', padding: '40px', backgroundColor: 'white', width: '800px', marginRight: '100px', marginBottom:'20px' }}>

                   <div className="mb-3">

                        <label htmlFor="patient" className="form-label">Patient:</label>
                        <select
                            id="patient"
                            name="patient"
                            value={selectedPatient}
                            onChange={(e) => setSelectedPatient(e.target.value)}
                            className="form-select"
                            required
                        >
                            <option value="">Select a patient</option>
                            {patients && patients.map((patient) => (
                                <option key={patient._id} value={patient._id}>
                                    {patient.name}
                                </option>
                            ))}
                        </select>
                    </div>
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


                </div>
                 <button type="submit" className="btn btn-danger">Create</button>
                                     </form>
                </div>


    )
}
export default CreateFollowUp;