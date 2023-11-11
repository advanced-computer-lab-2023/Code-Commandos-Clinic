import {useState,useEffect} from "react";
import PatientDetails from "../components/PatientDetails";

const ViewAndRemovePatients = ()=> {
    const [patients, setPatients] = useState([]);
    const [selectedPatient,setSelectedPatient] = useState(null)
    console.log("in method")

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try{
            const response = await fetch('api/patient/getPatients',{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const results = await response.json();
                setPatients(results)
                console.log(patients)
            }
            else {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error){
            setSelectedPatient(null)
        }
    };

    const handleRemovePatient = async (patientId) => {
        try {
            const response = await fetch(`/api/patient/deletePatient/${patientId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchResults();
                setSelectedPatient(null)
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="container mt-4">
            <h1 className="mb-4">System patients</h1>
            <ul className="list-group">
                {patients.map((patient) => (
                    <li key={patient._id} className="list-group-item">
                        <button
                            className="btn btn-link btn-lg"
                            onClick={() => setSelectedPatient(patient)}
                            style={{ textDecoration: "none" }}
                        >
                            {patient.name}
                        </button>
                    </li>

                ))}
            </ul>
            {selectedPatient &&(
                <>
                    <PatientDetails patient={selectedPatient} />
                    <button className="btn btn-danger" onClick={() => handleRemovePatient(selectedPatient._id)}>Remove</button>
                </>
            )}
        </div>
    );
};

export default ViewAndRemovePatients