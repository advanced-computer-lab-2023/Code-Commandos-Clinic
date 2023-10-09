import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const PrescriptionList = ({ prescriptions, filterDate, filterDoctor, filterFilled,applyFilters }) => {
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      if (!prescriptions) {
        setLoading(false);
        return;
      }

      try {
        const details = await Promise.all(
          prescriptions.map(async (prescription) => {
            const patientResponse = await axios.get(`http://localhost:5000/api/patient/${prescription.patient}`);
            const medicationResponse = await axios.get(`http://localhost:5000/api/medication/${prescription.medication}`);
            const doctorResponse = await axios.get(`http://localhost:5000/api/doctor/${prescription.doctor}`);

            if (!patientResponse || !medicationResponse || !doctorResponse) {
              console.error('Error fetching details for prescription');
              return null;
            }

            const patient = patientResponse.data;
            const medication = medicationResponse.data;
            const doctor = doctorResponse.data;

            return {
              ...prescription,
              patient: patient,
              medication: medication,
              doctor: doctor,
            };
          })
        );


         // Apply filters only if applyFilters is true
         const filteredDetails = applyFilters
         ? details.filter((prescription) => {
             // Filter logic based on date, doctor, and filled
             const isDateMatch = !filterDate || prescription.issueDate.includes(filterDate);
             const isDoctorMatch =
               !filterDoctor || prescription.doctor.name.toLowerCase().includes(filterDoctor.toLowerCase());
             
             // Check if filterFilled is not null and not 'All' or is 'All'
             const isFilledMatch =
             filterFilled !== null
               ? (prescription.filled && filterFilled === 'true') || (!prescription.filled && filterFilled === 'false')
               : true;

                 return isDateMatch && isDoctorMatch && isFilledMatch;
               })
             : details;

        setPrescriptionDetails(filteredDetails);
      } catch (error) {
        console.error('Error fetching details for prescription:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [prescriptions, filterDate, filterDoctor, filterFilled,applyFilters]);



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
            {prescriptionDetails.map((prescription, index) => (
              <tr key={prescription.id} style={{ border: '1px solid black', textAlign: 'center' }}>
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
