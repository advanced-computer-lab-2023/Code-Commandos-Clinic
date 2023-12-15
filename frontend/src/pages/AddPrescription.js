import React, { useState, useEffect } from 'react';
import AppointmentsDetails from "../components/AppointmentsDetails";
import PrescriptionDetails from "../components/PrescriptionDetails";
import Swal from "sweetalert2"
const AddPrescription = () => {
    const [patientId, setPatientId] = useState('');
    const [patients, setPatients] = useState([]);
    const [addedPrescription, setAddedPrescription] = useState(null);
    const [prescriptions,setPrescriptions] = useState([])

    const fetchPatients = async () => {
        try {
            const response = await fetch('/api/patient/getPatients');
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
            });
        }
    };



    useEffect(() => {
        fetchPatients();
    }, []);

    const handlePatientChange = async (event) => {
        const id = event.target.value
        setPatientId(id);
        fetchPrescriptionsOfPatient(id)
    };

    const fetchPrescriptionsOfPatient = async (id) => {
        try {
            const response = await fetch('api/prescription/getPrescriptionsOfPatient/'+id);
            if(response.ok){
                const data = await response.json();
                setPrescriptions(data)
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: await response.text(),
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
            });
        }
    }

    const handleSubmit = async () => {
        try{
            const response = await fetch('/api/prescription/addPrescription',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({patient: patientId})
            });
            if(! response.ok) {
                const errorMessage = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: errorMessage,
                });
            }
            else if(response.ok){
                const addedPrescriptionDetails = await response.json();
                setAddedPrescription(addedPrescriptionDetails);
            }
        }
        catch (error){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
            });
        }
    };


    return (
        <div className="container col-lg-6">
            <h2 className="mb-4"><hr className="lineAround"></hr>Add Prescription <hr className="lineAround"></hr></h2>
            <form onSubmit={handleSubmit}>
            <div className="box">
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
                        {patients && patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name}
                            </option>
                        ))}
                    </select>
                </div>
                <br/>
                <button id='button'type="submit" className="btn btn-primary">
                    Add Prescription
                </button>
            </div>
            </form>
            <br/>
            <div className="results mt-4">
                {prescriptions &&
                    prescriptions.map((prescription) => (
                        <PrescriptionDetails  prescription={prescription} showActions={false}/>
                    ))}
                {addedPrescription && (
                    <PrescriptionDetails prescription={addedPrescription} showActions={false} />
                )}
            </div>

        </div>
    );
};

export default AddPrescription;
