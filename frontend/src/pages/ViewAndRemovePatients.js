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
                    title: 'Error!',
                    text: await response.text(),
                });
                setSelectedPatient(null)
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
            <div className="row">
                    <h2 className="mb-4"> <hr className="linearound"></hr> System patients <hr className="linearound"></hr> </h2>
                <div className="col-md-5">
                    <ul className="list-group">
                        {patients.map((patient) => (
                            <li key={patient._id} className="list-group-item red-border">
                                <button
                                    className="btn btn-link btn-lg"
                                    onClick={() => setSelectedPatient(patient)}
                                    style={{ textDecoration: "none", color:'#1B3236' }}
                                >
                                    {patient.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-5">
                    {selectedPatient && (
                        <>
                            <div style={{ marginLeft: '10px' }}> {/* Add margin to the bottom */}
                                <PatientDetails patient={selectedPatient} />
                            </div>
                            <button className="custom-btn wider-button" style={{ marginLeft: '30px', marginTop:'5px', width:'150px' }} onClick={() => handleRemovePatient(selectedPatient._id)}>Remove</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewAndRemovePatients