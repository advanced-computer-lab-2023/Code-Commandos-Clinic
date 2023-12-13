import { useState } from "react";
import AppointmentsDetails from '../components/AppointmentsDetails';

const FilterAppointmentsByDateOrStatus = () =>{
    const [date, setDate] = useState(null);
    const [status,setStatus]=useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const role = window.localStorage.getItem("role")
    const fetchFilteredAppointments = async () => {

        try {
            let url='api/appointment/filterAppointmentsByDateOrStatus'
            if (!date) {
                url += "/none";
            }
            else {
                url += `/${date}`
            }
            if (!status) {
                url += "/none";
            }
            else {
                url += `/${status}`
            }
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const results = await response.json();
                setSearchResults(results)
            } else {
                const errorMessage = await response.text();
                alert(errorMessage)
            }
        }
        catch (error) {
            alert(error.message)
        }

        console.log(searchResults)
    }


    return(
        <div className="container mt-4">
            <h1 className="mb-4">Filter By Date or Status:</h1>
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
            {role === "DOCTOR" && (
                <div>
                    <input
                        required={true}
                        type="radio"
                        id="FREE"
                        name="status"
                        onChange={(e) => setStatus(e.target.id)}
                    />
                    <label>Free</label>
                    <br />
                </div>
            )}
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
                        <AppointmentsDetails  filteredAppointment={filteredAppointment} reserve={false} follow_up={false} cancel={false} />
                    ))}
            </div>

        </div>
    )
}

export default FilterAppointmentsByDateOrStatus