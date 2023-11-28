import React, { useState, useEffect } from 'react';
import AppointmentsDetails from "../components/AppointmentsDetails";
import PrescriptionDetails from "../components/PrescriptionDetails";

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
            alert(error.message)
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
                alert(await response.text())
            }
        } catch (error) {
            alert(error.message)
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
                alert(errorMessage)
            }
            else if(response.ok){
                const addedPrescriptionDetails = await response.json();
                setAddedPrescription(addedPrescriptionDetails);
            }
        }
        catch (error){

        }
    };


    return (
        <div className="container">
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
                        {patients && patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Prescription
                </button>
            </form>
            <br/>
            <div className="results mt-4">
                {prescriptions &&
                    prescriptions.map((prescription) => (
                        <PrescriptionDetails  prescription={prescription}/>
                    ))}
                {addedPrescription && (
                    <PrescriptionDetails prescription={addedPrescription} />
                )}
            </div>

        </div>
    );
};

export default AddPrescription;
