import React, { useState, useEffect } from 'react';
import AppointmentsDetails from "../components/AppointmentsDetails";

const ViewAvailableAppointmentsOfDoctor = () => {
    const [doctorId, setDoctorId] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [appointments,setAppointments] = useState([])

    useEffect(() => {
        fetch('/api/doctor/getPatientDoctors')
            .then((response) => response.json())
            .then((data) => setDoctors(data));
    }, []);

    const handleDoctorChange = (event) => {
        setDoctorId(event.target.value);
    };

    const handleSubmit = async () => {
        try{
            console.log(doctorId)
            const response = await fetch('api/appointment/viewAvailableAppointmentsOfDoctor/'+doctorId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(response.ok){
                const result = await response.json()
                setAppointments(result)
                console.log(appointments)
            }
            else if(!response.ok) {
                const errorMessage = await response.text();
                alert(errorMessage)
            }
        }
        catch (error){
            alert(error.message)
        }
    };

    return (
        <div>
            <h2>Select the doctor with whom you are registered</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="doctor">Select Doctor</label>
                    <select
                        id="doctor"
                        name="doctor"
                        value={doctorId}
                        onChange={(e) => {
                            setDoctorId(e.target.value)
                        }}
                        className="form-control"
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
                <button type="submit" className="btn btn-primary">
                    View
                </button>
            </form>
            <div>
                {appointments && appointments.map((app) => (
                    <AppointmentsDetails filteredAppointment={app}/>
                ))}
            </div>
        </div>

    );
};

export default ViewAvailableAppointmentsOfDoctor;
