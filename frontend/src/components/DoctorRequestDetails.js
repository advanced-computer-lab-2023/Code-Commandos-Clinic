import React, { useState } from 'react';
// import Doctor from '../../../backend/model/Doctor';

const DoctorRequestDetails = ({ doctorRequest }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () =>{
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
    };

    const handleRejectClick = () => {
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
              alert('Rejected');
              console.log('Record has been removed:', data);
              // Handle success response, if needed
            })
            .catch(function(error) {
              console.error('An error occurred:', error);
              // Handle error, if needed
            });
        setIsVisible(false);
    };

    const handleAcceptClick = async () => {
      const doctor = {
        username: doctorRequest.username,
        name: doctorRequest.name,
        email: doctorRequest.email,
        password: doctorRequest.password,
        dateOfBirth: doctorRequest.dateOfBirth,
        hourlyRate: doctorRequest.hourlyRate,
        affiliation: doctorRequest.affiliation,
        educationalBackground: doctorRequest.educationalBackground,
        speciality: doctorRequest.speciality,
        sessionPrice: doctorRequest.sessionPrice
      };
      
      try {
        const response = await fetch('/api/doctor/createDoctor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(doctor),
        });
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
        
        if (!response.ok) {
          throw new Error('Doctor could not be added');
        }
        
        console.log('Doctor has been added:', data);
        // Handle success response, if needed
        
        alert('Accepted');
        setIsVisible(false);
        handleClick();
    
      } catch (error) {
        console.error('An error occurred:', error);
        alert('Cant');
        // Handle error, if needed
      }
    
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
                    <button className="btn btn-success"  style={{ marginRight: '5px' }} onClick={handleAcceptClick}>Accept</button>
                    <button className="btn btn-danger" onClick={handleRejectClick}>Reject</button>
                </div>
            </div>
        ) : null
    );
};

export default DoctorRequestDetails;
