import React from 'react';
import { Link } from 'react-router-dom';

const PrescriptionList = ({ prescriptions, loading }) => {
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Prescription</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Medication</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={prescription._id} style={{ border: '1px solid black', textAlign: 'center' }}>
                <td>{index + 1}</td>
                <td>{prescription.patient.name}</td>
                <td>{prescription.doctor.name}</td>
                <td>{prescription.medication.name}</td>
                <td>
                  <Link to={`/api/prescription/${prescription._id}`}>
                    view details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PrescriptionList;
