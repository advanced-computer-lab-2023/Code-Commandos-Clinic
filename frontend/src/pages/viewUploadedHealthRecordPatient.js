import React, { useState, useEffect } from 'react';
import axios from 'axios';
import record from '../images/healthrecord.jpg';
import "../css/viewUploadedHealthRecordPatient.css";

const HealthRecordUpload = () => {
  const [healthRecord, setHealthRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthRecord = async () => {
      const response = await fetch("/api/healthRecord/getHealthRecordOfPatient");
      if (response.ok) {
        const json = await response.json();
        setLoading(false);
        console.log(json);
        setHealthRecord(json);
      } else {
        setLoading(false);
        // alert(await response.text())
      }
    };

    fetchHealthRecord();
  }, []); // Empty dependency array to run only once

  return (
    <div className="recordbody">
      <h1 className="headd">Your Health Record</h1>

      <div className="recordcon">
        
        <table class ="sss">
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
        <img src={record} className="record" alt="record" />
      </div>
    </div>
  );
};

export default HealthRecordUpload;