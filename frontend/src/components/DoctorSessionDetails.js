import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DoctorSessionDetails = ({ doctor }) => {

    
  return (
    <div className="card">
      <div className="card-body" style={{width: 500}}>
        <h5 className="card-title" style={{ color: '#000000' }}>
          {doctor.name}
        </h5>
        <p className="card-text">Speciality: {doctor.speciality}</p>
        <p className="card-text">Affiliation: {doctor.affiliation}</p>
        <p className="card-text">Session Price: {doctor.sessionPrice}</p>

        
        {/* Add a clickable text for redirecting to upcoming appointments */}
        <p className="text-right">
        <Link to={`/ViewAvailableAppointmentsOfDoctor`} style={{ color: 'darkred', textDecoration: 'none' }}>View Upcoming Appointments </Link>
        </p>
      </div>
    </div>
  );
};

export default DoctorSessionDetails;
