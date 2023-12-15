import { useState } from "react";
import AppointmentsDetails from '../components/AppointmentsDetails';
import Swal from "sweetalert2"
const FilteredAppointments = () =>{
    const [date, setDate] = useState(null);
    const [status,setStatus]=useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [selectedAppointment,setSelectedAppointment] = useState(null)

        const fetchFilteredAppointments = async () => {

            try {
                let url='api/appointment/getAppointmentsByDateAndStatus'
                url += `/${date}/${status}`
                const response = await fetch(url,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const results = await response.json();
                    setSearchResults(results)
                    setSelectedAppointment(null)
                } else {
                    const errorMessage = await response.text();
                    setSearchResults(null)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: errorMessage,
                    });
                }
            }
            catch (error) {
                setSelectedAppointment(null)
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: error.message,
                });
            }
        }
        

    return(
        <div className="container mt-4">
             <h2 className="mb-4"><hr className="lineAround"></hr>Filter By Date and Status<hr className="lineAround"></hr></h2>
             <div className="box">
                 <div className="mb-3">
             
                <label htmlFor="Date" className="form-label">
                    Date:
                </label>
                <input
                    required={true}
                    type="date"
                    id="date"
                    className="form-control"
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
             <input
                required={true}
                type="radio"
                id="RESERVED"
                name="status" 
                onChange={(e) => setStatus(e.target.id)} 
            />
            <label>Reserved</label><br />

            <input 
              type="radio"
              id="COMPLETED"
              name="status"  
              onChange={(e) => setStatus(e.target.id)}  
            /> 
            <label>Completed</label><br />
            <input 
              type="radio"
              id="CANCELLED"
              name="status"  
              onChange={(e) => setStatus(e.target.id)}  
            /> 
            <label>Cancelled</label><br />
            </div>
            <button id="button" className="btn btn-primary" onClick={fetchFilteredAppointments}>
                Filter
            </button>

            <div className="results mt-4">
                {searchResults &&
                    searchResults.map((filteredAppointment) => (
                        <button 
                            key={filteredAppointment._id}
                            className="btn btn-link"
                            onClick={() => setSelectedAppointment(filteredAppointment)} style={{ fontSize: "20px" }}>
                            Appointment with Doctor {filteredAppointment.doctorName} 
                        </button>
                    ))}
            </div>
            {selectedAppointment && <AppointmentsDetails key={selectedAppointment._id} filteredAppointment={selectedAppointment} reserve={false} follow_up={false} cancel={false}/>}
        </div>
    )
}

export default FilteredAppointments