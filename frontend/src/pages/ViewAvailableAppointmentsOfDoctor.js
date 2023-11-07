import React, { useState, useEffect } from 'react';
import AppointmentsDetails from "../components/AppointmentsDetails";
import axios from "axios";

const ViewAvailableAppointmentsOfDoctor = () => {
    const [doctorId, setDoctorId] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [appointments,setAppointments] = useState([])

    useEffect(() => {
        fetchDoctors()
    }, []);

    const handleDoctorChange = (event) => {
        setDoctorId(event.target.value);
    };

    const fetchDoctors = async () =>{
        const response = await fetch('/api/doctor/getPatientDoctors')
        if(response.ok){
            const result = await response.json()
            setDoctors(result)
        }
        else {
            alert(await response.text())
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("in handle submit")
        try{
            const response = await axios.get('api/appointment/viewAvailableAppointmentsOfDoctor/'+doctorId)
            if(response.status === 200){
                const result = response.data
                console.log(result)
                console.log(doctorId)
                setAppointments(result)
            }
            else {
                alert(response.data)
            }
        }
        catch (error){
            alert(error.message)
        }
    };

    return (
        <div className="container">
            <h2>The available appointments of a doctor</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="doctor">Select Doctor</label>
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
                <br/>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    View
                </button>
                <br/>
                <br/>
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
