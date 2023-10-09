import React, { useState } from 'react';
import HealthRecordDetails from '../components/HealthRecordDetails';
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
        
    }
}
fetchResults()
    return (
        <div className="patientInfo">
            <div>
                
                   <p >{healthRecord && healthRecord.AllergicType}</p>
                   
            </div>
        </div>
    );
};

export default PatientDetails;