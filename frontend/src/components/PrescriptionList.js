import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PrescriptionList = ({ prescriptions }) => {
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      // Check if prescriptions is not null or undefined
      if (!prescriptions) {
        return;
      }

      const details = await Promise.all(
        prescriptions.map(async (prescription) => {
          try {
            // Fetch details for patient, medication, and doctor using Axios
            const patientResponse = await axios.get(`http://localhost:5000/api/patient/${prescription.patient}`);
            const medicationResponse = await axios.get(`http://localhost:5000/api/medication/${prescription.medication}`);
            const doctorResponse = await axios.get(`http://localhost:5000/api/doctor/${prescription.doctor}`);

            if (!patientResponse || !medicationResponse || !doctorResponse) {
              // Handle error if any of the requests fail
              console.error('Error fetching details for prescription');
              return null;
            }

            const patient = patientResponse.data;
            const medication = medicationResponse.data;
            const doctor = doctorResponse.data;

            return {
              ...prescription,
              patient: patient,      // Assuming patient is an object
              medication: medication, // Assuming medication is an object
              doctor: doctor,        // Assuming doctor is an object
            };
          } catch (error) {
            console.error('Error fetching details for prescription:', error.message);
            return null;
          }
        })
      );

      setPrescriptionDetails(details.filter(Boolean)); // Filter out null values from failed requests
    };

    fetchDetails();
  }, [prescriptions]);

  return (
    <div>
      <h2>Prescription List</h2>
      <ul>
        {prescriptionDetails.map((prescription) => (
          <li key={prescription.id}>
            <Link to={`/api/prescription/${prescription.id}`}>
              {prescription.patient.name} - {prescription.doctor.name} - {prescription.medication.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionList;
