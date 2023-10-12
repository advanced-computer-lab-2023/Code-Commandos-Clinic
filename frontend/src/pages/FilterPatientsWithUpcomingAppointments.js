import { useEffect, useState } from "react";
import PatientInfo from "../components/PatientInfo";
const FilterPatientsWithUpcomingAppointments = () => {
    const [results, setResults] = useState([])

    useEffect(() => {
        const fetchUpcomingPatients = async () => {
            const response = await fetch('api/appointment/getUpcomingPatientsOfDoctor/651ef3b26c21aee2d43e6b9b')
            const json = await response.json()
            if(response.ok){
                setResults(json)
                console.log(json)
            }
        }
        fetchUpcomingPatients()
    }, [])
    

    return (
        <div className="UpcomingAppointments">
            <h2>Patients whom you have upcoming appointments with</h2>
            <div>
                {results && results.map((patient) => (
                    <PatientInfo key={patient._id} patientInfos={patient}/>
                ))}
            </div>
        </div>
    )
}

export default FilterPatientsWithUpcomingAppointments;