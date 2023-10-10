import React, { useState } from 'react';
import HealthRecordDetails from '../components/HealthRecordDetails';
import DoctorDetails from "./DoctorDetails";
import PreviousAppointments from './previousAppointments'
import PatientInfo from './PatientInfo'
const PatientDetails = ({ patient }) => {
    const id=patient.patient;
    const[healthRecord,setHealthRecord] = useState(null);
    const[appointment,setAppointment]= useState({patientid:id,doctorid:patient.doctor})
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
    let url2 = 'api/patient/'
    url2+=`${id}`
     const response2 = await fetch (url2,{
     method: 'GET',
     headers: {
         'Content-Type':'application/json',
     },
 })
    


    if (response.ok && response2.ok){
        const results = await response.json();
        const results2= await response2.json();
        setHealthRecord(results)
        setPatientInfos(results2)
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
               {patientInfos && <PatientInfo  patientInfos={patientInfos} />}
            
            </div>
        </div>
    );
};

export default PatientDetails;