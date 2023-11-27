import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthRecordUpload = () => {
  const [healthRecord, setHealthRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthRecord = async () => {
      const response = await fetch("/api/healthRecord/getHealthRecordOfPatient");
      if (response.ok) {
        const json = await response.json()
        setLoading(false)
        console.log(json)
        setHealthRecord(json);
      }
      else{
        setLoading(false);
        alert(await response.text())
      }/*
      try {
        const response = await fetch("/api/healthRecord/getHealthRecordOfPatient");
        const json= await response.json()
        setHealthRecord(json);
      } catch (error) {
        if ((error.response && error.response.status === 401 )   ||( error.response && error.response.status === 403)) {
          // Handle unauthorized access, e.g., redirect to login
          alert('Unauthorized access. ');
        } else {
          alert('Error fetching health record:', error.message);
        }
      } finally {
        setLoading(false);
      }*/
    };

    fetchHealthRecord();
  }, []); // Empty dependency array to run only once

  return (
      <div className="container">
        {loading ? (
            <p>Loading...</p>
        ) : healthRecord ? (
            <div>
              <h1>Your Health Record</h1>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
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