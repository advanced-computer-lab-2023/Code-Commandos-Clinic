import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthRecordUpload = () => {
  const [healthRecord, setHealthRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthRecord = async () => {
      try {
        const response = await axios.get("/api/healthRecord/getHealthRecordOfPatient");
        setHealthRecord(response.data);
      } catch (error) {
        if ((error.response && error.response.status === 401 )   ||( error.response && error.response.status === 403)) {
          // Handle unauthorized access, e.g., redirect to login
          alert('Unauthorized access. ');
        } else {
          alert('Error fetching health record:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHealthRecord();
  }, []); // Empty dependency array to run only once

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : healthRecord ? (
        <div>
          <h1>Your Health Record</h1>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <iframe
              title="Health Record"
              src={healthRecord.urlName}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      ) : (
        <p>Error loading health record.</p>
      )}
    </div>
  );
};

export default HealthRecordUpload;