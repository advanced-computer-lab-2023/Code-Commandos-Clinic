import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../PrescriptionDetails.css'; // Import a CSS file for styling

const PrescriptionDetails = ({ prescriptionId }) => {
  const [prescriptionDetails, setPrescriptionDetails] = useState({});
  const [loadingPrescription, setLoadingPrescription] = useState(true);

  const [patientDetails, setPatientDetails] = useState({});
  const [loadingPatient, setLoadingPatient] = useState(true);

  const [doctorDetails, setDoctorDetails] = useState({});
  const [loadingDoctor, setLoadingDoctor] = useState(true);

  const [medicationDetails, setMedicationDetails] = useState({});
  const [loadingMedication, setLoadingMedication] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch Prescription Details
        setLoadingPrescription(true);
        const prescriptionResponse = await axios.get(`http://localhost:5000/api/prescription/${prescriptionId}`);
        const { patient, doctor, medication, ...restPrescriptionDetails } = prescriptionResponse.data;
        setPrescriptionDetails(restPrescriptionDetails);
        setLoadingPrescription(false);

        // Fetch Patient Details
        setLoadingPatient(true);
        const patientResponse = await axios.get(`http://localhost:5000/api/patient/${patient}`);
        setPatientDetails(patientResponse.data);
        setLoadingPatient(false);

        // Fetch Doctor Details
        setLoadingDoctor(true);
        const doctorResponse = await axios.get(`http://localhost:5000/api/doctor/${doctor}`);
        setDoctorDetails(doctorResponse.data);
        setLoadingDoctor(false);

        // Fetch Medication Details
        setLoadingMedication(true);
        const medicationResponse = await axios.get(`http://localhost:5000/api/medication/${medication}`);
        setMedicationDetails(medicationResponse.data);
        setLoadingMedication(false);
      } catch (error) {
        console.error('Error fetching details:', error.message);
      }
    };

    fetchDetails();
  }, [prescriptionId]);

  // Check if any section is still loading
  const isLoading = loadingPrescription || loadingPatient || loadingDoctor || loadingMedication;

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="details-container">
          {/* Medication Details */}
          <div className="details-box">
            <h2>Medication Details</h2>
            <p><strong>Name:</strong> {medicationDetails.name}</p>
            <p><strong>Dosage:</strong> {medicationDetails.dosage}</p>
            <p><strong>Frequency:</strong> {medicationDetails.frequency}</p>
            <p><strong>Duration:</strong> {medicationDetails.duration}</p>
            <p><strong>Route:</strong> {medicationDetails.route}</p>
          </div>

          {/* Prescription Details */}
          <div className="details-box">
            <h2>Prescription Details</h2>
            <p><strong>Filled:</strong> {prescriptionDetails.filled ? 'Yes' : 'No'}</p>
            <p><strong>Issue Date:</strong> {prescriptionDetails.issueDate}</p>
            <p><strong>Refill Info:</strong> {prescriptionDetails.refillInfo}</p>
            <p><strong>Diagnosis:</strong> {prescriptionDetails.diagnosis}</p>
            <p><strong>Special Instructions:</strong> {prescriptionDetails.specialInstructions}</p>
            <p><strong>Allergies:</strong> {prescriptionDetails.allergies}</p>
            <p><strong>Precautions:</strong> {prescriptionDetails.precautions}</p>
            <p><strong>Notes:</strong> {prescriptionDetails.notes}</p>
          </div>

          {/* Patient Details */}
          <div className="details-box">
            <h2>Patient Details</h2>
            <p><strong>Name:</strong> {patientDetails.name}</p>
            <p><strong>Email:</strong> {patientDetails.email}</p>
            <p><strong>Mobile Number:</strong> {patientDetails.mobileNumber}</p>
            <p><strong>Date of Birth:</strong> {patientDetails.dateOfBirth}</p>
          </div>

          {/* Doctor Details */}
          <div className="details-box">
            <h2>Doctor Details</h2>
            <p><strong>Name:</strong> {doctorDetails.name}</p>
            <p><strong>Email:</strong> {doctorDetails.email}</p>
            <p><strong>Date of Birth:</strong> {doctorDetails.dateOfBirth}</p>
            <p><strong>Affiliation:</strong> {doctorDetails.affiliation}</p>
            <p><strong>Educational Background:</strong> {doctorDetails.educationalBackground}</p>
            <p><strong>Speciality:</strong> {doctorDetails.speciality}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionDetails;
