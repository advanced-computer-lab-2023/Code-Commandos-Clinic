import { useEffect, useState } from "react";
import PatientInfo from "../components/PatientInfo";
import swal from 'sweetalert';
import '../css/ViewPatientsOfDoctor.css'

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
                swal(await response.text())
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
                swal(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error) {
           swal(error)
        }
        
    }

    return (
<div className="container mt-4">
<h2 className="mb-4">List of Your Patients</h2>
<div className="ss">
                <input
                    type="text"
                    id="name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                    placeholder="Search by name"
                />
                
                <button onClick={handleSearch} className="searchh">
                    Search
                </button>
            </div>
            <div className="roww">
             <div className="col-md-5 see">
               <ul className="list-group">
                  {patients.map((patient) => (
                     <li key={patient._id} className="list-group-item ">
                         <button
                             className="btn btn-link btn-lg"
                             onClick={() => setSelectedPatient(patient)}
                             style={{ textDecoration: "none", color:'#000000' }}
                         >
                             <span>{patient.name}</span>
                        </button>
                    </li>
                ))}
              </ul>
            </div>
            <div className="col-md-5 mt-55">
               {selectedPatient && (
                        <>
                            <div > {/* Add margin to the bottom */}
                            <PatientInfo patient={selectedPatient} />
        
                           </div>

                        </>
            )}
        </div>
      </div>
    </div>
    );
};

export default ViewPatientsOfDoctor;