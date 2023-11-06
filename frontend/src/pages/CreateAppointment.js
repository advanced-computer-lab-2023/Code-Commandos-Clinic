import React, { useState, useEffect } from 'react';

function CreateAppointment() {
    const [selectedStartTime,setSelectedStartTime] = useState(null)
    const [selectedEndTime,setSelectedEndTime] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const appointment = {
                startTime: selectedStartTime+':00.000+00:00',
                endTime: selectedEndTime+':00.000+00:00'
            }
            console.log(appointment)
            const response = await fetch('/api/appointment/createAppointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            });
            if (response.ok) {
                const data = await response.json();
                alert("Appointment created",data)
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Error creating appointment: ', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Create an Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="startTime" className="form-label">Start Time:</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={selectedStartTime}
                        onChange={(e) => setSelectedStartTime(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="endTime" className="form-label">End Time:</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        name="endTime"
                        value={selectedEndTime}
                        onChange={(e) => setSelectedEndTime(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    );
}

export default CreateAppointment;
