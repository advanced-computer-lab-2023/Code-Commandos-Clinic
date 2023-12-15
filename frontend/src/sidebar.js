// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/DoctorRegistrationRequests" >Doctor Registration Requests</Link>
      <Link to="/DoctorUpdate" >Doctor Update</Link>

 <Link to="/HealthPackageUpdate" >Health Package Update</Link>

 <Link to="/AddHealthPackage" >Add Health Package</Link>
    </div>
  );
};

export default Sidebar;
