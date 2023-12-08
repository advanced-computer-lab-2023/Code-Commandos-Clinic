import React, { useState, useEffect } from 'react';
import AppointmentsDetails from "../components/AppointmentsDetails";
import axios from "axios";
import Swal from 'sweetalert2';

const ViewAvailableAppointmentsOfDoctor = () => {
    const [doctorId, setDoctorId] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetchDoctors()
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('/api/doctor/getPatientDoctors')
            if (response.ok) {
                const result = await response.json()
                setDoctors(result)
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('api/appointment/viewAvailableAppointmentsOfDoctor/' + doctorId)
            if (response.status === 200) {
                const result = response.data
                setAppointments(result)
            } else {
                throw new Error(response.data);
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
<h2 className="mb-4"><hr className="lineAround"></hr>Doctor Available Appointments<hr className="lineAround"></hr></h2>
 {/* Display the image from the public folder */}

            <form>
                <div className="form-group">
                    <label htmlFor="doctor"></label>
                    <select
                        id="doctor"
                        name="doctor"
                        value={doctorId}
                        onChange={(e) => {
                            setDoctorId(e.target.value)
                        }}
                        className="form-control input-danger"
                        required
                    >
                        <option value="">Select a doctor</option>
                        {doctors && doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <button type="button" className="btn btn-danger" onClick={handleSubmit}>
                    View
                </button>
                <br />
                <br />
                 <div>
                                {appointments && appointments.map((app) => (
                                    <AppointmentsDetails key={app._id} filteredAppointment={app} reserve={true} />
                                ))}
                            </div>
            </form>



             <img
             src={process.env.PUBLIC_URL + `/ddoctor.gif`}
             style={{
             maxWidth: '700px',   // Adjust the maximum width as needed
             height: '',
             position: 'fixed',   // Fixed position
             top: '300px',         // Adjust the top position as needed
             right: '200px',       // Adjust the right position as needed
             zIndex: '1',
             }}
             />
        </div>
    );
};

export default ViewAvailableAppointmentsOfDoctor;