import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthRecordUpload = () => {
  const [healthRecord, setHealthRecord] = useState(null);

  useEffect(() => {
    const fetchHealthRecord = async () => {
      try {
        const response = await axios.get("/api/healthRecord/getHealthRecordOfPatient");
        setHealthRecord(response.data);
      } catch (error) {
        console.error('Error fetching health record:', error.message);
      }
    };

    fetchHealthRecord();
  }, );

  return (
    <div>
      {healthRecord&& healthRecord  (
        <div>
          <h1>Your Health Record</h1>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <img
              src={healthRecord.urlName}
              alt="Health Record"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>

        </div>
      ) }
    </div>
  );
};

export default HealthRecordUpload;
