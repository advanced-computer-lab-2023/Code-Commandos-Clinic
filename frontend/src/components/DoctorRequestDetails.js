import React, { useState } from 'react';

const DoctorRequestDetails = ({ doctorRequest }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleRejectClick = () => {
        alert('Rejected');
        const recordId = doctorRequest._id;
        fetch(`/api/doctorRegistration/doctorRegistrationRequestDelete/${recordId}`, {
            method: 'DELETE', // Use the appropriate HTTP method for your backend API
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(function(response) {
              if (!response.ok) {
                throw new Error('Record could not be removed');
              }
              return response.json();
            })
            .then(function(data) {
              console.log('Record has been removed:', data);
              // Handle success response, if needed
            })
            .catch(function(error) {
              console.error('An error occurred:', error);
              // Handle error, if needed
            });
        setIsVisible(false);
    };

    const handleAcceptClick = () => {
        alert('Accepted');
//         const name = doctorRequest.name;
//         const userName = doctorRequest.username;
//         const email = doctorRequest.email;
//         const dateOfBirth = doctorRequest.dateOfBirth;
//         const password = doctorRequest.password;
//         const affiliation = doctorRequest.affiliation;
//         const educationalBackground = doctorRequest.educationalBackground;
//         const speciality = doctorRequest.speciality;
//         const hourlyRate = doctorRequest.hourlyRate;

//   // Perform the addition process here
//   // Send a request to the backend to add the doctor

//   // Example using fetch:
//   fetch('/api/doctor/createDoctor', {
//     method: 'POST', // Use the appropriate HTTP method for your backend API
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ userName, name, email, password, dateOfBirth, hourlyRate, affiliation, educationalBackground, speciality }), // Send the doctor details in the request body
//   })
//     .then(function(response) {
//       if (!response.ok) {
//         throw new Error('Doctor could not be added');
//       }
//       return response.json();
//     })
//     .then(function(data) {
//       console.log('Doctor has been added:', data);
//       // Handle success response, if needed
//     })
//     .catch(function(error) {
//       console.error('An error occurred:', error);
//       // Handle error, if needed
//     });
        setIsVisible(false);
    };

    return (
        isVisible ? (
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
                    <button className="btn btn-success" onClick={handleAcceptClick} style={{ marginRight: '5px' }}>Accept</button>
                    <button className="btn btn-danger" onClick={handleRejectClick}>Reject</button>
                </div>
            </div>
        ) : null
    );
};

export default DoctorRequestDetails;
