import { useEffect, useState } from "react";
import HealthRecordDetails from "../components/HealthRecordDetails"; 


const ViewpatientHealthRecord = () =>{
    const [healthRecord , setHealthRecord] = useState(null)
    useEffect(() => {
        const fetchHealthRecord = async () =>{
            const response = await fetch('api/healthRecord/getHealthRecordOfPatient')
            if(response.ok){
                const json = await response.json()
                console.log("patients are ",json)
                setHealthRecord(json)
            }
            else {
                alert(await response.text())
            }
        }
        fetchHealthRecord()
    },[])

    

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Your HealthRecord</h2>
            {healthRecord && <HealthRecordDetails healthRecord={healthRecord} />}
        </div>
    );
}

export default ViewpatientHealthRecord;