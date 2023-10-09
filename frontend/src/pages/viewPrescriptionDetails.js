// viewPrescriptionDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PrescriptionDetails from '../components/PrescriptionDetails';

const ViewPrescriptionDetails = () => {
  const { id } = useParams();
  console.log(id) 

  return (
    <div>
      <PrescriptionDetails prescriptionId={id} />
    </div>
  );
};

export default ViewPrescriptionDetails;

