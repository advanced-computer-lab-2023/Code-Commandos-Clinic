// PrescriptionDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const PrescriptionDetails = ({ prescriptions }) => {
  const { id } = useParams();
  const prescription = prescriptions.find((p) => p.id === parseInt(id));

  if (!prescription) {
    return <div>Prescription not found</div>;
  }

  return (
    <div>
      <h2>Prescription Details</h2>
      <p>Patient: {prescription.patient}</p>
      <p>Doctor: {prescription.doctor}</p>
      <p>Medication: {prescription.medication}</p>
      {/* Include other fields as needed */}
    </div>
  );
};

export default PrescriptionDetails;
