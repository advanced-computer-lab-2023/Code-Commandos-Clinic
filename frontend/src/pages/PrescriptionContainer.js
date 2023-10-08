// pages/PrescriptionContainer.js
import React, { useState, useEffect } from 'react';
import PrescriptionList from '../components/PrescriptionList';

const PrescriptionContainer = () => {
  const [prescriptions, setPrescriptions] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {

        const res = await fetch('/api/prescription/prescriptionList');
        const data = await res.json();

        if (res.ok) {
         setPrescriptions(data.data); 
        }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div>
      <h1>Prescription Container Page</h1>
      <PrescriptionList prescriptions={prescriptions} />
    </div>
  );
};

export default PrescriptionContainer;
