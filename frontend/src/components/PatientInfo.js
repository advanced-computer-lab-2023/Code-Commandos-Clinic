import React, {useEffect, useState} from 'react';
import HealthRecordDetails from './HealthRecordDetails';
import { Link } from 'react-router-dom';
const PatientInfo = ({ patient }) => {
    const [healthRecord, setHealthRecord] = useState(null);
    useEffect(() => {
        fetchHealthRecord();
    }, []);

    const fetchHealthRecord = async () => {
        try {
            const response = await fetch(`/api/patient/getInfoHealthPatient/${patient._id}`);
            if (response.ok) {
                const hR = await response.json()
                setHealthRecord(hR);
            } else {
                alert(await response.text())
            }
        }
        catch (error){
            alert(error)
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{patient.name}</h5>
                <p className="card-text">Username: {patient.username}</p>
                <p className="card-text">Email: {patient.email}</p>
                <p className="card-text">Date of Birth: {patient.dateOfBirth}</p>
                <p className="card-text">Gender: {patient.gender}</p>
                <p className="card-text">Mobile Number: {patient.mobileNumber}</p>
                <p className="card-text">Emergency Contact: {patient.emergencyContact.fullName}</p>
            </div>
            {healthRecord && <HealthRecordDetails healthRecord={healthRecord} />}
            <Link to={`/AddHealthRecord/${patient._id}`}>
                    <button
                        className="btn btn-success"
                        style={{
                            position: 'absolute',
                            top: 10,
                            bottom: 10,
                            right: 10,
                        }}
                    >
                        Add health record
                    </button>
            </Link>
  
        </div>
    );
};

export default PatientInfo;
