import { useState } from "react";
import AppointmentsDetails from '../components/AppointmentsDetails';

const FilteredAppointments = () =>{
    const [date, setDate] = useState(null);
    const [status,setStatus]=useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [selectedAppointment,setSelectedAppointment] = useState(null)

        const fetchFilteredAppointments = async () => {

            try {
                let url='api/appointment/getAppointment'
                url += `/${date}:00.000+00:00/${status}`
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
                    type="text"
                    id="date"
                    className="form-control"
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
             <input 
                type="radio"
                id="PENDING"
                name="status" 
                onChange={(e) => setStatus(e.target.id)} 
            />
            <label>Pending</label><br />
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
                            <br/>
                        </button>
                    ))}
            </div>
            {selectedAppointment && <AppointmentsDetails key={selectedAppointment._id} filteredAppointment={selectedAppointment} />}
        </div>
    )
}

export default FilteredAppointments