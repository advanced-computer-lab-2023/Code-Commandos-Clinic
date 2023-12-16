import { useEffect, useState } from "react";
import PatientDetails from "../components/PatientDetails";
import appointt from "../images/appointment.mp4" 
import Swal from "sweetalert2"
const FilterPatientsWithUpcomingAppointments = () => {
    const [results, setResults] = useState([])
    
    const [selectedPatient, setSelectedPatient] = useState(null);

    
    useEffect(() => {
        const fetchUpcomingPatients = async () => {
            const response = await fetch('api/appointment/getUpcomingPatientsOfDoctor')
            if(response.ok){
                const json = await response.json()
                setResults(json)
            }
            else if(!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: await response.text(),
                });
            }
        }
        fetchUpcomingPatients()
    }, [])

    const handlePatientClick = (patient) => {
        // Toggle the selectedPatient state
        setSelectedPatient(selectedPatient === patient ? null : patient);
      };
      const videoStyle = {
        width: '40%', 
        height: 'auto',
        position:'fixed' ,
        right:0,
        top:200
      };
    

    return (
        <div className="UpcomingAppointments">
            <h2 className="mb-4"><hr className="lineAround"></hr>Patients whom you have upcoming appointments with<hr className="lineAround"></hr></h2>
            {/* <div>
                {results && results.map((patient) => (
                    <PatientDetails  patient={patient}/>
                ))}
            </div> */}



<div className="box-with-image">
        {results &&
          results.map((patient) => (
            <div key={patient.id}  className="patientContainer" >
                <p></p>
              {/* Display only the name and appointment date initially */}
              <div className="AppointmentCard" onClick={() => handlePatientClick(patient)}>
                <button id="button" className="btn btn-success">click to view {patient.name} details</button>
              </div>

            </div>
            
          ))}
         
         <video style={videoStyle}  autoPlay muted playsInline controls={false} loop={false}>
        <source src={appointt} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
      <div >{selectedPatient && (
          <div className="PatientDetailsContainer" key={selectedPatient.id}>
            <PatientDetails patient={selectedPatient} />
          </div>
          
         
        )}

</div>
        </div>
    )
}

export default FilterPatientsWithUpcomingAppointments;