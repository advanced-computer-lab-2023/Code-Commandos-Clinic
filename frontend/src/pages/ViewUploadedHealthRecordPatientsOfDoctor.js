import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthRecordUploadPatientsDoctor = () => {
  const [healthRecord, setHealthRecord] = useState(null);

  useEffect(() => {
    const fetchHealthRecord = async () => {
      try {
        // Fetch the access token from your authentication service
        
        const response = await axios.get('/api/healthRecord/getHealthRecordOfPatients')

        if (response.status === 200) {
          setHealthRecord(response.data);
        } 
      } catch (error) {
        if ((error.response && error.response.status === 401 )   ||( error.response && error.response.status === 403)) {
          // Handle unauthorized access, e.g., redirect to login
          alert('Unauthorized access. ');
        } else {
          alert('Error fetching health record:', error.message);
        }
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