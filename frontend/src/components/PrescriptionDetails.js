import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const PrescriptionDetails = ({ prescription, showEditButton = true, showActions = true }) => {
    const [dosageDescription, setDosageDescription] = useState('');

    const navigate = useNavigate()
    const handleDelete = async () => {
        try {
            const response = await fetch(`api/prescription/deletePrescriptionById/${prescription._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: "Prescription deleted successfully",
                });
                window.location.reload()
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert(error.message)
        }
    };

    function handleEdit() {
        navigate(`/EditPrescription/${prescription._id}`)
    }

    const handleDeleteMedicine = async (medicineName) => {
        try {
            const response = await fetch('/api/prescription/deleteMedicineFromPrescription', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: medicineName,
                    prescriptionId: prescription._id,
                }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Medicine deleted successfully',
                });
                window.location.reload()
            } else {
                alert(await response.text());
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDecrementDosage = async (name) => {
        try {
            const prescriptionId = prescription._id;
            const currentDosage = prescription.medicines.find((medicine) => medicine.name === name)?.dosage;
            if (currentDosage > 0) {
                const response = await fetch('/api/prescription/updateMedicineDosage', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prescriptionId,
                        name,
                        newDosage: currentDosage - 1,
                    }),
                });

                if (response.ok) {
                    window.location.reload()
                } else {
                    alert('Failed to update dosage');
                }
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleIncrementDosage = async (name) => {
        try {
            const prescriptionId = prescription._id;
            const currentDosage = prescription.medicines.find((medicine) => medicine.name === name)?.dosage;
            const response = await fetch('/api/prescription/updateMedicineDosage', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prescriptionId,
                    name,
                    newDosage: currentDosage + 1,
                }),
            });

            if (response.ok) {
                window.location.reload()
            } else {
                alert('Failed to update dosage');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDosageDescription = async (name) => {
        try {
            const prescriptionId = prescription._id;
            const response = await fetch('/api/prescription/updateDosageDescription', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prescriptionId,
                    name,
                    newDosage: dosageDescription,
                }),
            });

            if (response.ok) {
                window.location.reload()
            } else {
                alert(await response.text());
            }
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title fontBig">Prescription for {prescription.patientName}</h5>
                <p className="card-text fontMed">Doctor: {prescription.doctorName}</p>
                <p className="card-text fontMed">Status: {prescription.status}</p>
                <br/>
                <h5>Medicines</h5>
                {prescription.medicines.map((medicine, index) => (
                    <div key={index} className="fontMed">
                        <div>
                            {showActions && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-trash ml-2 text-danger"
                                    viewBox="0 0 16 16"
                                    style={{cursor: 'pointer'}}
                                    onClick={() => handleDeleteMedicine(medicine.name)}
                                >
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                    />
                                    <path
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                    />
                                </svg>
                            )}
                            {medicine.name}
                            <br/>
                            Dosage description : {medicine.dosageDescription}
                            <br/>
                            Dosage: {medicine.dosage}
                        </div>
                        {showActions && (
                            <div className="justify-content-end align-items-center">

                                <button
                                    className="btn btn-outline-secondary m-lg-2"
                                    onClick={() => handleIncrementDosage(medicine.name)}
                                >
                                    +
                                </button>
                                <button
                                    className="btn btn-outline-secondary ml-2"
                                    onClick={() => handleDecrementDosage(medicine.name)}
                                >
                                    -
                                </button>
                                <div className="dosage-description">
                                    <input
                                        type="text"
                                        id="dosageDescription"
                                        name="dosageDescription"
                                        value={dosageDescription}
                                        placeholder="Update dosage description"
                                        defaultValue={medicine.dosageDescription}
                                        onChange={(e) => setDosageDescription(e.target.value)}
                                        className="form-control"
                                    />
                                    <button onClick={() => handleDosageDescription(medicine.name)}
                                            className="btn btn-primary">Save
                                    </button>
                                </div>
                            </div>
                        )}
                        <br/>
                    </div>
                ))}

                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete Prescription
                </button>


                <button className="btn btn-secondary">
                    <div
                        onClick={() => window.open(`http://localhost:4000/api/prescription/generatePdf/${prescription._id}`, '_blank')}>
                        Download as pdf
                    </div>
                </button>

                {showEditButton && (
                    <button className="btn btn-primary" onClick={handleEdit}>
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
}
export default PrescriptionDetails;
