import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthRecordUploadPatientsDoctor = () => {
  const [healthRecord, setHealthRecord] = useState(null);

  useEffect(() => {
    const fetchHealthRecord = async () => {
      try {
        const response = await axios.get("/api/healthRecord/getHealthRecordOfPatients");
        console.log(response)
        setHealthRecord(response.data);
      } catch (error) {
        console.error('Error fetching health record:', error.message);
      }
    };

    fetchHealthRecord();
  }, );

  return (
    <div>
      <h1>Health Records List</h1>
      {healthRecord &&healthRecord.length > 0 ? (
        <ul>
          {healthRecord.map((record) => (
            <li key={record._id}>
              <h2>{record.patient}</h2>
              {/* Display other health record details as needed */}
              <img
                src={record.urlName}
                alt={`Health Record of ${record.patient}`}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No health records found for your patients.</p>
      )}
    </div>
  );
};

export default HealthRecordUploadPatientsDoctor