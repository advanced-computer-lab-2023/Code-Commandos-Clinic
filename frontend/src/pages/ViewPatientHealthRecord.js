import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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
                const errorMessage = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "No health record found",
                });
            }
        }
        fetchHealthRecord()
    },[])

    

    return (
        <div className="container justify-content-center col-md-7 ">
            <h2 className="mb-4"> <hr className="linearound"></hr> Your HealthRecord <hr className="linearound"></hr> </h2>
            {healthRecord && <HealthRecordDetails healthRecord={healthRecord} />}
        </div>
    );
}

export default ViewpatientHealthRecord;