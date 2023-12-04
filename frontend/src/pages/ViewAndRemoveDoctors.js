import {useState,useEffect} from "react";
import DoctorDetails from "../components/DoctorDetails";
import "../css/viewandremovedoctors.css"
import bin from '../images/bin.jpg';
const ViewAndRemoveDoctors = ()=> {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor,setSelectedDoctor] = useState(null)

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try{
            const response = await fetch('api/doctor/getDoctors',{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                },
            });
            if (response.ok){
                const results = await response.json();
                setDoctors(results)
            }
            else {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error){
            setSelectedDoctor(null)
        }
    };

    const handleRemoveDoctor = async (doctorId) => {
        try {
            const response = await fetch(`/api/doctor/removeDoctor/${doctorId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchResults();
                setSelectedDoctor(null)
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert(error.message)
        }
    };


    return (
        <div className="container mt-4">
        <h1 className="mb-4">System Doctors</h1>
      

        <ul className="list-group">
            {doctors.map((doctor) => (
                <li key={doctor._id} className="list-group-item red-border">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{doctor.name}</h5>
                            <p>Email: {doctor.email}</p>
                            <p>Affiliation: {doctor.affiliation}</p>
                            <p>Educational Background: {doctor.educationalBackground}</p>
                           
                        </div>
                        <div>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleRemoveDoctor(doctor._id)}
                                style={{ backgroundColor: '#d21312' }}
                            >
                                Remove{" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-trash"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M1.5 2.5a.5.5 0 0 1 1 0V13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5a.5.5 0 0 1 1 0V13a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V2.5zM0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1H0V1z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        {selectedDoctor && (
            <>
                <DoctorDetails doctor={selectedDoctor} />
            </>
        )}
    </div>
    );
};

export default ViewAndRemoveDoctors