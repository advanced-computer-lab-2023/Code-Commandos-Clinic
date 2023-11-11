import React from 'react';

const DoctorRequestDetails = ({ doctorRequest }) => {

    const handleAccept = async () => {
        try {
            const response = await fetch('/api/doctorRegistration/acceptDoctorRequests/'+doctorRequest._id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Doctor request accepted successfully!');
            } else {
                alert(await response.text());
            }
        } catch (error) {
            console.error('Error accepting doctor request:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch(`/api/doctorRegistration/rejectDoctorRequests/${doctorRequest._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Doctor request rejected successfully!');
            } else {
                alert(await response.text());
            }
        } catch (error) {
            console.error('Error rejecting doctor request:', error);
        }
    };

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
                <button className="btn btn-success" onClick={handleAccept}>Accept</button>
                <button className="btn btn-danger" onClick={handleReject}>Reject</button>
            </div>
        </div>
    );
};

export default DoctorRequestDetails;