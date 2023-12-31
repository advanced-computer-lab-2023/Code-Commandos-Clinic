import {useState,useEffect} from "react";
import DoctorDetails from "../components/DoctorDetails";
import "../css/viewandremovedoctors.css"
import bin from '../images/bin.jpg';
import Swal from 'sweetalert2';

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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
                setSelectedDoctor(null)
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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    };


    return (
<div className="container mt-4">
            <div className="row">
                <h2 className="mb-4"><hr className="lineAround"></hr>Doctor admins<hr className="lineAround"></hr></h2>
             <div className="col-md-5">
               <ul className="list-group">
               {doctors.map((doctor)=> (
                     <li key={doctor._id} className="list-group-item red-border">
                         <button
                             className="btn btn-link btn-lg"
                             onClick={() => setSelectedDoctor(doctor)}
                             style={{ textDecoration: "none", color:'#000000' }}
                         >
                             <span>{doctor.username}</span>
                        </button>
                    </li>
                ))}
              </ul>
            </div>
            <div className="col-md-5">
               {selectedDoctor && (
                        <>
                            <div style={{ marginLeft: '10px' }}> {/* Add margin to the bottom */}
                            <DoctorDetails doctor={selectedDoctor} />
        
                           </div>
                            <button
                                className="btn btn-danger"
                                style={{ marginLeft: '30px', marginTop:'5px', width:'150px' }}
                                onClick={() => handleRemoveDoctor(selectedDoctor._id)}
                                
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
                        </>
            )}
        </div>
      </div>
    </div>
    );
};

export default ViewAndRemoveDoctors