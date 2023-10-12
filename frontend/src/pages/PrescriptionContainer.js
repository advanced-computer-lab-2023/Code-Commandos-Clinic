import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PrescriptionList from '../components/PrescriptionList';
import axios from 'axios';

const PrescriptionContainer = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get("/api/prescription/prescriptionList/6526cce90cd9ec95a0c24b93");
        if (response.ok){
          setPrescriptions(response.data);
          setLoading(false);
        }
        else{
          alert("Something went wrong")
        }
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        alert(error)
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  
  return (
    <div>
      <h1>Prescriptions list</h1>
      <PrescriptionList prescriptions={prescriptions} loading={loading} />
    </div>
  );
};

export default PrescriptionContainer;
