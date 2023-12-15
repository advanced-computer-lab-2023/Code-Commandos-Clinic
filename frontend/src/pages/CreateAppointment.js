import React, { useState, useEffect } from 'react';
import doc from '../images/doc22.jpg';
import Swal from 'sweetalert2';

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
                showSuccessNotification("Appointment created",data)
            } else if(!response.ok) {
                showErrorDialog(await response.text())
            }
        } catch (error) {
            showErrorDialog('Error creating appointment: ', error);
        }
    };

    const showErrorDialog = async (message) => {
        const result = await Swal.fire({
            title: message,
            icon: 'error',
            showCancelButton: true,
            showConfirmButton:false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Try again',
        });
        return result.isConfirmed;
      };
      const showSuccessNotification = (message) => {
        Swal.fire({
          icon: 'success',
          title: message,
        });
      };
    const imge = {
        width: '20%', 
        height: 'auto',
        position:'fixed' ,
        right:40,
        top:150
      };

    return (
        <div className="container mt-5">
            <h2 className="mb-4"><hr className="lineAround"></hr>Add Appointment Solts <hr className="lineAround"></hr></h2>
            <div className="image"> <img src={doc} style={imge} alt="Your Image" /></div>
            <div className="box-with-image"> 
           
            <div className="box">
            
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

                <button type="submit" className="btn btn-primary buttons">Create</button>
            </form> 
        </div>
            </div>
        </div>
    );
}

export default CreateAppointment;
