import { useState } from "react";
import AppointmentsDetails from '../components/AppointmentsDetails';

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
                    console.log(searchResults)
                } else {
                    const errorMessage = await response.text();
                    alert(errorMessage)
                    setSearchResults(null)
                    throw new Error(errorMessage)
                }
            }
            catch (error) {
                setSelectedAppointment(null)
            }
    
            console.log(searchResults)
        }
        

    return(
        <div className="container mt-4">
             <h1 className="mb-4">Filter By Date and Status:</h1>
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
                required={true}
                type="radio"
                id="FREE"
                name="status"
                onChange={(e) => setStatus(e.target.id)}
            />
            <label>Free</label><br />
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
            <button className="btn btn-primary" onClick={fetchFilteredAppointments}>
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
            {selectedAppointment && <AppointmentsDetails key={selectedAppointment._id} filteredAppointment={selectedAppointment} reserve={false} cancel={false}/>}
        </div>
    )
}

export default FilteredAppointments