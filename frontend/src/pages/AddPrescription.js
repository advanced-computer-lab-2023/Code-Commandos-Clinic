import React, { useState, useEffect } from 'react';

const AddPrescription = () => {
    const [patientId, setPatientId] = useState('');
    const [patients, setPatients] = useState([]);
    const [medicines, setMedicines] = useState([])

    const fetchPatients = async () => {
        try {
            const response = await fetch('/api/patient/getPatients');
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const fetchMedicines = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/medicine/viewAvailableMedicines');
            const data = await response.json();
            setMedicines(data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    useEffect(() => {
        fetchPatients();
        fetchMedicines();
    }, []);

    const handlePatientChange = (event) => {
        setPatientId(event.target.value);
    };



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
                throw new Error(errorMessage)
            }
        }
        catch (error){
            alert(error.message)
        }
    };

    function handleMedicineChange() {

    }

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
                        {patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="medicine">Select Medicine</label>
                    <select
                        id="medicine"
                        name="medicine"
                        onChange={handleMedicineChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select a medicine</option>
                        {medicines && medicines.map((medicine) => (
                            <option key={medicine._id} value={medicine._id}>
                                {medicine.name}
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
