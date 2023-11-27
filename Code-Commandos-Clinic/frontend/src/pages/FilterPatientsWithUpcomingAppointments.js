import { useEffect, useState } from "react";
import PatientDetails from "../components/PatientDetails";
const FilterPatientsWithUpcomingAppointments = () => {
    const [results, setResults] = useState([])

    useEffect(() => {
        const fetchUpcomingPatients = async () => {
            const response = await fetch('api/appointment/getUpcomingPatientsOfDoctor')
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
                    <PatientDetails  patient={patient}/>
                ))}
            </div>
        </div>
    )
}

export default FilterPatientsWithUpcomingAppointments;