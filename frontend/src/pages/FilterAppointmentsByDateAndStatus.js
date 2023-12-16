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
                if(!date || !status){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: "Please select both date and status",
                    });
                    return
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


    return (
        <div className="container mt-4">
            <h2 className="mb-4"><hr className="lineAround"></hr>Filter appointments by date and status<hr className="lineAround"></hr></h2>
            <div className="row">
                <div className="col-md-5">
                    <img
                        src={process.env.PUBLIC_URL + `/filters.gif`}
                        style={{
                            maxWidth: '100%',   // Adjusted the maximum width
                            height: 'auto',     // Allow height to adjust accordingly
                            marginBottom: '-30px',
                            marginRight:'100px'
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <div style={{ border: '2px solid red', padding: '30px', marginTop: '20px', width: '400xp', marginBottom:'30px' }}>
                        <label htmlFor="Date" className="form-label">
                            Appointment Date:
                        </label>
                        <input
                            required={true}
                            type="date"
                            id="date"
                            className="form-control"
                            onChange={(e) => setDate(e.target.value)}
                        />

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
                    <div className="mb-3">
                        <button className="btn btn-danger" onClick={fetchFilteredAppointments}>
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            <div className="results mt-4">
                {searchResults &&
                    searchResults.map((filteredAppointment) => (
                        <AppointmentsDetails key={filteredAppointment._id} filteredAppointment={filteredAppointment} reserve={false} />
                    ))}
            </div>
        </div>
    );
}

export default FilteredAppointments