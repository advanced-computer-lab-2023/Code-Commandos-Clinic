import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthRecordUploadPatientsDoctor = () => {
  const [healthRecord, setHealthRecord] = useState(null);

  useEffect(() => {
    const fetchHealthRecord = async () => {

      // Fetch the access token from your authentication service

      const response = await fetch('/api/healthRecord/getHealthRecordOfPatients')

      if (response.ok) {
        const json = await response.json()
        setHealthRecord(json);
      }
      else{
        alert(await response.text())
      }

    };

    fetchHealthRecord();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
      <div>
        <h1>Health Records List</h1>
        {healthRecord && healthRecord.length > 0 ? (
            <ul>
              {healthRecord.map((record) => (
                  <li key={record._id}>
                    <h2>{record.patient}</h2>
                    {/* Display other health record details as needed */}

                    <a href={record.urlName} target="_blank" rel="noopener noreferrer">Open PDF</a>

                  </li>
              ))}
            </ul>
        ) : (
            <p>No health records found for your patients.</p>
        )}
      </div>
  );
};

export default HealthRecordUploadPatientsDoctor;