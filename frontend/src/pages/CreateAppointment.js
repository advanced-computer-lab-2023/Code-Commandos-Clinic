import React, { useState, useEffect } from 'react';

function CreateAppointment() {
    const [selectedStartTime,setSelectedStartTime] = useState(null)
    const [selectedEndTime,setSelectedEndTime] = useState(null)
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDoctor,setSelectedDoctor] = useState('')
    const [selectedPatient,setSelectedPatient] = useState('')

    useEffect(() => {
        fetchDoctors();
        fetchPatients();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('/api/doctor/getDoctors'); // Replace with your API endpoint
            if(response.ok){
                const data = await response.json();
                setDoctors(data);
            }
            else {
                alert(await response.text())
            }
        } catch (error) {
            alert(error)
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await fetch('/api/patient/getPatients'); // Replace with your API endpoint
            if(response.ok){
                const data = await response.json();
                setPatients(data);
            }
            else {
                alert(await response.text())
            }
        } catch (error) {
            alert(error)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const appointment = {
                doctor: selectedDoctor,
                patient: selectedPatient,
                startTime: selectedStartTime+':00.000+00:00',
                endTime: selectedEndTime+':00.000+00:00'
            }
            console.log(appointment)
            const response = await fetch('/api/appointment/createAppointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            });
            if (response.ok) {
                const data = await response.json();
                alert("Appointment created",data)
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Error creating appointment: ', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create an Appointment</h2>
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
                <div className="mb-3">
                    <label htmlFor="doctor" className="form-label">Doctor:</label>
                    <select
                        id="doctor"
                        name="doctor"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        className="form-select"
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
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
}

export default CreateAppointment;
