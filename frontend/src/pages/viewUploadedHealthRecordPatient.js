import React, { useState, useEffect } from 'react';
import record from '../images/healthrecord.jpg';
import "../css/viewUploadedHealthRecordPatient.css";
import Swal from "sweetalert2"

const HealthRecordUpload = () => {
  const [healthRecord, setHealthRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthRecord = async () => {
      const response = await fetch("/api/healthRecord/getHealthRecordOfPatient");
      if (response.ok) {
        const json = await response.json();
        setLoading(false);
        setHealthRecord(json);
      } else {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: await response.text(),
        });
      }
    };

    fetchHealthRecord();
  }, []); // Empty dependency array to run only once

  return (
<div className="recordbody">
    <h1 className="headd">Your Health Record</h1>

    <div className="recordcon">

        {loading ? (
            <p>Loading...</p>
        ) : (
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
                    {Array.isArray(healthRecord) && healthRecord.length > 0 ? (
                        healthRecord.map((recordd) => (
                            <tr key={recordd._id}>
                                <td>{recordd.name}</td>
                                <td>{recordd.email}</td>
                                <td>{recordd.affiliation}</td>
                                <td>{recordd.educationalBackground}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No health records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )}

        <img src={record} className="record" alt="record" />
    </div>
</div>
);
};

export default HealthRecordUpload;