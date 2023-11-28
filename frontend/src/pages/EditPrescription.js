import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import PrescriptionDetails from "../components/PrescriptionDetails";

const EditPrescription = () => {
    const {id} = useParams()
    const [prescription, setPrescription] = useState(null);
    const [medicines, setMedicines] = useState([])
    const [dosage, setDosage] = useState(0);
    const [medicineName , setSelectedMedicineName] = useState('')

    useEffect(() => {
        // Assuming you have a function to fetch a prescription by ID
        const fetchPrescriptionById = async () => {
            try {
                const response = await fetch(`/api/prescription/getPrescriptionbyId/${id}`);

                if (response.ok) {
                    const data = await response.json();
                    setPrescription(data);
                } else {
                    alert(await response.text())
                }
            } catch (error) {
                alert(error.message)
            }
        };
        fetchPrescriptionById();
        fetchMedicines()
    }, [id]);

    const fetchMedicines = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/medicine/viewAvailableMedicines');
            const data = await response.json();
            setMedicines(data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };

    async function handleAddMedicine() {
        console.log("selected ",medicineName)
        const body = {
            name: medicineName,
            dosage: dosage,
            prescriptionId: id
        };
        try {
            const response = await fetch('/api/prescription/addMedicineToPrescription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert('Medicine added successfully');
                window.location.reload()
            } else {
                alert(await response.text());
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="container col-lg-6 align-content-lg-start">
            <h2>Edit Prescription</h2>

            <div className="form-group">
                <label htmlFor="medicine">Select Medicine</label>
                <select
                    id="medicine"
                    name="medicine"
                    value={medicineName}
                    onChange={(e) => setSelectedMedicineName(e.target.value)}
                    className="form-control"
                    required
                >
                    <option value="">Select a medicine</option>
                    {medicines &&
                        medicines.map((medicine) => (
                            <option key={medicine._id} value={medicine.name}>
                                {medicine.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="dosage">Dosage</label>
                <input
                    type="number"
                    id="dosage"
                    name="dosage"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <br/>
            <button className="btn btn-primary" onClick={handleAddMedicine}>
                Add Medicine
            </button>
            <div className="results mt-4">
                {prescription && (
                    <PrescriptionDetails prescription={prescription} showEditButton={false} />
                )}
            </div>
            <br/>
        </div>
    );
};

export default EditPrescription;
