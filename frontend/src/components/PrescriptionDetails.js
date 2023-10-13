import React from 'react';

const PrescriptionDetails = ({ prescription }) => {
  return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Prescription for {prescription.patientName}</h5>
          <p className="card-text">Doctor: {prescription.doctorName}</p>
          <p className="card-text">Status: {prescription.status}</p>
        </div>
      </div>
  );
};

export default PrescriptionDetails;
