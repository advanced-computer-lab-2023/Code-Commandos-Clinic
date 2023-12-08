import { useState } from "react";
import Swal from 'sweetalert2';
import AppointmentsDetails from '../components/AppointmentsDetails';

const FilteredAppointments = () => {
    const [date, setDate] = useState(null);
    const [status, setStatus] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const fetchFilteredAppointments = async () => {
        try {
            let url = 'api/appointment/getAppointmentsByDateAndStatus';
            url += `/${date}/${status}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const results = await response.json();
                setSearchResults(results);
                setSelectedAppointment(null);
                console.log(searchResults);
            } else {
                const errorMessage = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
                setSearchResults(null);
                throw new Error(errorMessage);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
            setSelectedAppointment(null);
        }
    };

    const showMessage = (message, type) => {
        Swal.fire({
            icon: type,
            title: type === 'success' ? 'Success' : 'Error',
            text: message,
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">
                <hr className="lineAround"></hr>Filter Appointment<hr className="lineAround"></hr>
            </h2>
            <div className="row">
                                        <div className="col-md-5">
                                            <img
                                                src={process.env.PUBLIC_URL + `/filter4.gif`}
                                                style={{
                                                    maxWidth: '500px',   // Adjusted the maximum width
                                                    height: 'auto',     // Allow height to adjust accordingly
                                                    marginBottom: '20px',
                                                    marginRight:'400px'
                                                }}
                                            />
                                        </div>
            <div className="col-md-6">

            <div style={{ border: '2px solid red', padding: '20px', marginTop: '20px', width: '200xp', marginBottom: '30px'}}>

                <div className="mb-3">
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


</div>
            <button className="btn btn-danger" onClick={() => fetchFilteredAppointments()}>
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
            {selectedAppointment && <AppointmentsDetails key={selectedAppointment._id} filteredAppointment={selectedAppointment} reserve={false} />}
        </div>
        </div>
                    </div>
    );
};

export default FilteredAppointments;
