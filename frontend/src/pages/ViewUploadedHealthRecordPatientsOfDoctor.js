import React, { useState, useEffect } from 'react';
import axios from 'axios';
import record from '../images/healthrecord.jpg';
import "../css/ViewUploadedHealthRecordPatientsOfDoctor.css"
import swal from 'sweetalert';
const HealthRecordUploadPatientsDoctor = () => {
  const [healthRecord, setHealthRecord] = useState(null);

  useEffect(() => {
    const fetchHealthRecord = async () => {
      try {
        const response = await fetch('/api/healthRecord/getHealthRecordOfPatients');

        if (response.ok) {
          const json = await response.json();
          setHealthRecord(json);
        } else {
          swal(await response.text());
        }
      } catch (error) {
        console.error('Error fetching health record:', error);
      }
    };

    fetchHealthRecord();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div className="recordbody">
      <h1 className="headd">Your Health Record</h1>

      <div className="recordcon">
        {healthRecord ? (
          <>
            <table className="sss">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Affiliation</th>
                  <th>Educational Background</th>
                </tr>
              </thead>
              <tbody>
                {healthRecord.map((recordd) => (
                  <tr key={recordd._id}>
                    <td>{recordd.name}</td>
                    <td>{recordd.email}</td>
                    <td>{recordd.affiliation}</td>
                    <td>{recordd.educationalBackground}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          
          </>
        ) : (
          <p class ="loadd">Loading health record...</p>
        )}
          <img src={record} className="record" alt="record" />
      </div>
    </div>
  );
};

export default HealthRecordUploadPatientsDoctor;