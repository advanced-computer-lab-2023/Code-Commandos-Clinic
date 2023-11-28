import React from 'react';
import {useNavigate} from "react-router-dom";

const PrescriptionDetails = ({ prescription, showEditButton = true }) => {
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
                alert("Prescription deleted successfully")
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
                alert('Medicine deleted successfully');
                window.location.reload()
            } else {
                alert(await response.text());
            }
        } catch (error) {
            alert(error.message);
        }
    };

    function handleDecrementDosage(name) {
        
    }

    function handleIncrementDosage(name) {
        
    }

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Prescription for {prescription.patientName}</h5>
          <p className="card-text">Doctor: {prescription.doctorName}</p>
          <p className="card-text">Status: {prescription.status}</p>
            <br/>
            {prescription.medicines.length > 0 && (
                <div>
                    <h5>Medicines:</h5>
                    <div style={{ marginLeft: '20px' }}>
                        {prescription.medicines.map((medicine, index) => (
                            <div key={index}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-trash ml-2 text-danger"
                                    viewBox="0 0 16 16"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDeleteMedicine(medicine.name)}
                                >
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                    />
                                    <path
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                    />
                                </svg>
                                {medicine.name} - Dosage: {medicine.dosage}
                                <div className="input-group justify-content-end align-items-center">
                                    <button
                                        className="button-minus border rounded-circle icon-shape icon-sm mx-1"
                                        onClick={() => handleDecrementDosage(medicine.name)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        step="1"
                                        max="10"
                                        value={medicine.dosage}
                                        name="dosage"
                                        className="quantity-field border-0 text-center w-25"
                                        readOnly
                                    />
                                    <button
                                        className="button-plus border rounded-circle icon-shape icon-sm"
                                        onClick={() => handleIncrementDosage(medicine.name)}
                                    >
                                        +
                                    </button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-trash ml-2 text-danger"
                                        viewBox="0 0 16 16"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeleteMedicine(medicine.name)}
                                    >
                                        {/* ...SVG paths */}
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <br/>
            <button className="btn btn-danger" onClick={handleDelete}>
                Delete Prescription
            </button>
            {showEditButton && (
                <button className="btn btn-primary" onClick={handleEdit}>
                    Edit
                </button>
            )}
        </div>
      </div>
    );
};

export default PrescriptionDetails;
