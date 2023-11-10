import React from 'react';

const DoctorRequestDetails = ({ doctorRequest }) => {
    const handleAcceptDoctor = async (e) => {
        e.preventDefault()
        //const doctorRequest = {username: username, name: name, email: email, password: password, dateOfBirth: dateOfBirth, hourlyRate: hourlyRate, affiliation: affiliation, educationalBackground: educationalBackground,speciality:speciality,sessionPrice:sessionPrice}
        const id=doctorRequest._id
        const response = await fetch('/api/doctorRegistration/acceptDoctorRequests/'+id, {
          method: 'POST',
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
            alert(await response.text())
        }
        if (response.ok) {
            alert("doctor is accepted and added successfuly");
    
        }
      }
    
      const handleRejectDoctor = async (e) => {
        e.preventDefault()
        const id=doctorRequest._id
        const response = await fetch('/api/doctorRegistration/rejectDoctorRequests/'+id, {
          method: 'DELETE',
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
            alert(await response.text())
        }
        if (response.ok) {
            alert("doctor is rejected");
        }
      }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title" style={{ color: '#1aac83' }}>{doctorRequest.name}</h5>
                <p className="card-text">Username: {doctorRequest.username}</p>
                <p className="card-text">Email: {doctorRequest.email}</p>
                <p className="card-text">Date of Birth: {doctorRequest.dateOfBirth}</p>
                <p className="card-text">Hourly Rate: ${doctorRequest.hourlyRate}/hr</p>
                <p className="card-text">Affiliation: {doctorRequest.affiliation}</p>
                <p className="card-text">Educational Background: {doctorRequest.educationalBackground}</p>
                <p className="card-text">Speciality: {doctorRequest.speciality}</p>
                <p className="card-text">Request Status: {doctorRequest.status}</p>
                <p className="card-text">Created At: {doctorRequest.createdAt}</p>
                <button className="btn btn-success" onClick={handleAcceptDoctor}>Accept</button>
                <button className="btn btn-danger" onClick={handleRejectDoctor}>Reject</button>
            </div>
        </div>
    );
};

export default DoctorRequestDetails;
