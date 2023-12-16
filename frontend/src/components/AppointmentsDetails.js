import React from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2"

const AppointmentsDetails = ({ filteredAppointment, reserve , follow_up , issue,cancel }) => {
    const navigate = useNavigate();
    const handleMakeRequest = async () => {
        try {
          const appointmentId = filteredAppointment._id;
          const memberId = filteredAppointment.familyMember
            let url;
            if(memberId){
                url = `/api/appointment/updateStatusToPending/${appointmentId}/${memberId}`
            }
            else {
                url = `/api/appointment/updateStatusToPending/${appointmentId}/none`
            }
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            //const data = await response.json();
              Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: "Your request has been sent successfully",
              });
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: await response.text(),
              });
          }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: "An error occurred",
            });
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
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: "Appointment cancelled successfully",
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: await response.text(),
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: "Appointment cancelled successfully",
            });
        }
    }

    function handleReschedule() {
        navigate(`/Reschedule/${filteredAppointment._id}`)
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
                {reserve && (
                    <Link to={`/ReserveAppointment/${filteredAppointment._id}`}>
                        <button
                            className="btn btn-success"
                        >
                            Reserve
                        </button>
                    </Link>
                )}
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



            {cancel && (
                <div>
                <button
                    className="btn btn-primary"
                    onClick={()=>handleReschedule()}
                >
                    Reschedule
                </button>
                <button
                    className="btn btn-danger m-lg-3"

                    onClick={()=>handleCancel()}
                >
                    Cancel
                </button>
                </div>
            )}
        </div>
    );
};

export default AppointmentsDetails;
