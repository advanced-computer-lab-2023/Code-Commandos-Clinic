import {useState,useEffect} from "react";
import DoctorDetails from "../components/DoctorDetails";

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
                    <li key={doctor._id} className="list-group-item">
                        <button
                            className="btn btn-link btn-lg"
                            onClick={() => setSelectedDoctor(doctor)}
                            style={{ textDecoration: "none" }}
                        >
                            {doctor.name}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedDoctor &&(
                <>
                    <DoctorDetails doctor={selectedDoctor} />
                    <button className="btn btn-danger" onClick={() => handleRemoveDoctor(selectedDoctor._id)}>Remove</button>
                </>
            )}
        </div>
    );
};

export default ViewAndRemoveDoctors