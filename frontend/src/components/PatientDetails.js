import React, { useState } from 'react';
import HealthRecordDetails from '../components/HealthRecordDetails';
import DoctorDetails from "./DoctorDetails";
const PatientDetails = ({ patient }) => {
    const id=patient.patient;
    const[healthRecord,setHealthRecord] = useState(null);
    const[patientInfos,setPatientInfos] = useState(null);
    const fetchResults = async () => {
    try{
        let url = 'api/patient/getInfoHealthPatient/'
       url+=`${id}`
        const response = await fetch (url,{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        },
    })
    if (response.ok){
        const results = await response.json();
        setHealthRecord(results)
        
    }
    else {
        const errorMessage = await response.text();
        alert(errorMessage)
        throw new Error(errorMessage)
    }
    }
    catch (error){
        console.log(error)
    }
}
fetchResults()
    return (
        <div className="patientInfo">
            <div>
                {healthRecord && <HealthRecordDetails  healthRecord={healthRecord} />}
            </div>
        </div>
    );
};

export default PatientDetails;