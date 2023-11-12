import { useEffect, useState } from "react";
import PatientInfo from "../components/PatientInfo";

const ViewPatientsOfDoctor = () =>{
    const [patients , setPatients] = useState([])
    const [selectedPatient,setSelectedPatient] = useState(null)
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const fetchPatients = async () =>{
            const response = await fetch('api/patient/getPatientsOfADoctor')
            if(response.ok){
                const json = await response.json()
                console.log("patients are ",json)
                setPatients(json)
            }
            else {
                alert(await response.text())
            }
        }
        fetchPatients()
    },[])

    const handleSearch=async()=>{
        let url = '/api/patient/searchByName';
        if (!searchQuery) {
            url += "/none";
        }
        else {
            url += `/${searchQuery}`
        }
        url+='/651ef3b26c21aee2d43e6b9b'
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const results = await response.json();
                console.log(results)
                setPatients(results)
            } else {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error) {
           alert(error)
        }
        
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">List of Your Patients</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    id="name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                    placeholder="Search by name"
                />
                <button onClick={handleSearch} className="btn btn-primary">
                    Search
                </button>
            </div>

            <div className="list-group">
                {patients &&
                    patients.map((patient) => (
                        <button
                            key={patient._id}
                            className="list-group-item list-group-item-action"
                            onClick={() => setSelectedPatient(patient)}
                        >
                            {patient.name}
                        </button>
                    ))}
            </div>
            {selectedPatient && <PatientInfo patient={selectedPatient} />}
        </div>
    );
}

export default ViewPatientsOfDoctor;

