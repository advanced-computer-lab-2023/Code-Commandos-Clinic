import React from 'react';
import { Link } from 'react-router-dom';


const AppointmentsDetails = ({ filteredAppointment, reserve , follow_up , issue,cancel }) => {
    const handleMakeRequest = async () => {
        try {
          const appointmentId = filteredAppointment._id; 
          const response = await fetch(`/api/appointment/updateStatusToPending/${appointmentId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            //const data = await response.json();
            alert('Your request has been sent successfully');
            window.location.reload();
          } else {
            alert('Failed to update status');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred');
        }
      };

    const handleCancel = async () => {
        try {
            const response = await fetch(`/api/appointment/cancelAppointment/${filteredAppointment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Appointment cancelled successfully!');
                window.location.reload();
            } else {
                alert(await response.text());
            }
        } catch (error) {
            console.error('Error cancelling appointment', error);
        }
    }

    return (
        <div className="card box">
            <div className="card-body">
                <p className="card-text"><strong>Doctor Name: </strong>{filteredAppointment.doctorName}</p>
                <p className="card-text"><strong>Patient Name: </strong>{filteredAppointment.patientName}</p>
                <p className="card-text"><strong>Family Member Name: </strong>{filteredAppointment.familyMemberName}</p>
                <p className="card-text"><strong>Start Time: </strong>{filteredAppointment.startTime}</p>
                <p className="card-text"><strong>End Time: </strong>{filteredAppointment.endTime}</p>
                <p className="card-text"><strong>Status: </strong>{filteredAppointment.status}</p>
                <p className="card-text"><strong>Type: </strong>{filteredAppointment.type}</p>

            </div>


            {issue && (
                <button  className="btn btn-primary" onClick={handleMakeRequest}>Make the request</button>
            )}

            {follow_up && (

                <Link to={`/ViewAvailableAppointmentsOfSpecificDoctor/${filteredAppointment.doctor}`}>
                    <button
                        className="btn btn-primary"
                    >
                        Request Follow-Up
                    </button>
                </Link>  
            )}


            {reserve && (
                <Link to={`/ReserveAppointment/${filteredAppointment._id}`}>
                    <button
                        className="btn btn-success"
                        style={{
                            position: 'absolute',
                            top: 10,
                            bottom: 10,
                            right: 10,
                        }}
                    >
                        Reserve
                    </button>
                </Link>
            )}
            {cancel && (
                <button
                    className="btn btn-danger"
                    style={{
                        position: 'absolute',
                        top: 10,
                        bottom: 10,
                        right: 10,
                    }}
                    onClick={()=>handleCancel()}
                >
                    Cancel
                </button>
            )}
        </div>
    );
};

export default AppointmentsDetails;
