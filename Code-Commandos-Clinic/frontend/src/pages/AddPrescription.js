import React, { useState, useEffect } from 'react';

const AddPrescription = () => {
    const [patientId, setPatientId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('/api/patient/getPatients')
            .then((response) => response.json())
            .then((data) => setPatients(data));

        fetch('/api/doctor/getDoctors')
            .then((response) => response.json())
            .then((data) => setDoctors(data));
    }, []);

    const handlePatientChange = (event) => {
        setPatientId(event.target.value);
    };

    const handleDoctorChange = (event) => {
        setDoctorId(event.target.value);
    };

    const handleSubmit = async () => {
        try{
            const response = await fetch('/api/prescription/addPrescription',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({patient: patientId,doctor: doctorId})
            });
            if(! response.ok) {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error){
            alert(error.message)
        }
    };

    return (
        <div>
            <h2>Add Prescription</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="patient">Select Patient</label>
                    <select
                        id="patient"
                        name="patient"
                        value={patientId}
                        onChange={handlePatientChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select a patient</option>
                        {patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="doctor">Select Doctor</label>
                    <select
                        id="doctor"
                        name="doctor"
                        value={doctorId}
                        onChange={handleDoctorChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select a doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Prescription
                </button>
            </form>
        </div>
    );
};

export default AddPrescription;
