import { useEffect, useState } from "react";

import ShowPatients from '../components/ShowAllPatients'

const ShowAllPatients = () => {
    const [patient, setPatient] = useState('')
    //const [value, setValue] = useState('');

    useEffect(() => {
        const fetchPatint = async () => 
        {
            const response = await fetch('/api/patient/getPatients/')
            const json = await response.json()

            if(response.ok){
                setPatient(json)
                console.log(json)
            }
        }

        fetchPatint()
    }, [])

    return (
        <div className="ShowAllPatients">
            <h2>All Patients:</h2>
            <div>
            
                {patient && patient.map((patient) => (
                    //<p key={doctorRequest._id}>{doctorRequest.name}</p>
                    <ShowPatients key={patient._id} patient={patient}/>
                   
                ))}
            </div>
        </div>
    )
}

export default ShowAllPatients;