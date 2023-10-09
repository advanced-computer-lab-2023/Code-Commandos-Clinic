import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PrescriptionList from '../components/PrescriptionList';
import axios from 'axios';

const PrescriptionContainer = () => {
  const { patient } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/prescription/prescriptionList/${patient}`);
        setPrescriptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [patient]);

  
  return (
    <div>
      <h1>Prescriptions list</h1>
      <PrescriptionList prescriptions={prescriptions} loading={loading} />
    </div>
  );
};

export default PrescriptionContainer;
