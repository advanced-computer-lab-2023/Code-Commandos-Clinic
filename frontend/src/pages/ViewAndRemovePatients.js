import {useState,useEffect} from "react";
import PatientDetails from "../components/PatientDetails";
import Swal from 'sweetalert2';


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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Could not fetch results. Please try again later.',
                });
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
                setSelectedPatient(null);
                fetchResults();
                setSelectedPatient(null);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'The patient has been removed successfully.',
                });
            } else {
                const errorMessage = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className= "red-header"> System patients</h2>
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
                    <button className="custom-btn" style={{ marginTop: '5px'}} onClick={() => handleRemovePatient(selectedPatient._id)}>Remove</button>
                </>
            )}
        </div>
    );
};

export default ViewAndRemovePatients