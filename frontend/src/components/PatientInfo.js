import React, {useEffect, useState} from 'react';
import HealthRecordDetails from './HealthRecordDetails';

const PatientInfo = ({ patient }) => {
    const [healthRecord, setHealthRecord] = useState(null);

    useEffect(() => {
        // Fetch health record when the component mounts
        fetchHealthRecord();
    }, []);

    const fetchHealthRecord = async () => {
        const response = await fetch(`/api/patient/getInfoHealthPatient/${patient._id}`);
        const healthRecord = await response.text(); // Make sure to await the response text
        setHealthRecord(healthRecord);
        console.log(healthRecord)
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
        </div>
    );
};

export default PatientInfo;
