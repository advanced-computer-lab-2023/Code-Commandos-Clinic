import { useState } from "react";
import Swal from 'sweetalert2';
import AppointmentsDetails from '../components/AppointmentsDetails';

const FilterAppointmentsByDateOrStatus = () => {
    const [date, setDate] = useState(null);
    const [status, setStatus] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    const fetchFilteredAppointments = async () => {
        try {
            let url = 'api/appointment/filterAppointmentsByDateOrStatus';
            if (!date) {
                url += "/none";
            } else {
                url += `/${date}`;
            }
            if (!status) {
                url += "/none";
            } else {
                url += `/${status}`;
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const results = await response.json();
                setSearchResults(results);
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
            <h1 className="mb-4 text-center red-text">Filter Appointment</h1>
            <div className="mb-3 red-text">
                <label htmlFor="Date" className="form-label">
                    Appointment Date
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

            <div className="mb-3 d-flex justify-content-center">
                <button className="btn btn-danger" onClick={fetchFilteredAppointments}>
                    Filter
                </button>
            </div>

            <div className="results mt-4">
                {searchResults &&
                    searchResults.map((filteredAppointment) => (
                        <AppointmentsDetails key={filteredAppointment._id} filteredAppointment={filteredAppointment} reserve={false} />
                    ))}
            </div>
        </div>
    );
};

export default FilterAppointmentsByDateOrStatus;
