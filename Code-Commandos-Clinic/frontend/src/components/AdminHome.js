// AdminHome.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    return (
        <div className="container mt-5">
             <div className="container mt-5">
             <div className="row">
             <div className="col-12">
             <div className="decorative-shape mt-4"></div>
             <div className="card-body">
             <h2 className="card-title glow-text">Welcome, Admin!</h2>
             </div>
             </div>
             </div>
              </div>

                    <div className="row mt-4">
                        <div className="col-md-4 mb-4">
                         <div className="card">

                            <div className="card shadow">
                                <div className="card-body">
                                    <Link to="/ViewAndRemovePatients" className="card-link">
                                        View And Remove Patients
                                    </Link>
                                </div>
                            </div>
                        </div>
                        </div>


                <div className="col-md-4 mb-4">
                    <div className="card">
                   <div className="card shadow">

                        <div className="card-body">
                            <Link to="/AddAdmin" className="card-link">
                                Add Admin
                            </Link>
                        </div>
                    </div>
                </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card">
                    <div className="card shadow">

                        <div className="card-body">
                            <Link to="/HealthPackages" className="card-link">
                                View Health Packages
                            </Link>
                        </div>
                    </div>
                </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card">
                   <div className="card shadow">

                        <div className="card-body">
                            <Link to="/HealthPackageUpdate" className="card-link">
                                Health Package Update
                            </Link>
                        </div>
                    </div>
                </div>
                </div>

                <div className="col-md-4 mb-4">
                <div className="card">
               <div className="card shadow">
              <div className="card-body">
             <Link to="/AddHealthPackage" className="card-link">
                       Add Health Package
                </Link>
                </div>
                </div>
                </div>
               </div>

                <div className="col-md-4 mb-4">
                    <div className="card">
                    <div className="card shadow">

                        <div className="card-body">
                            <Link to="/ViewAndRemovePatients" className="card-link">
                                    View And Remove Patients
                            </Link>
                        </div>
                    </div>
                </div>
                </div>


                 <div className="col-md-4 mb-4">
                   <div className="card">
                  <div className="card shadow">
                  <div className="card-body">
                  <Link to="/DoctorContract" className="card-link">
                               Doctor Contract
                   </Link>
                   </div>
                   </div>
                   </div>
                   </div>

                 <div className="col-md-4 mb-4">
                 <div className="card">
                 <div className="card shadow">
                  <div className="card-body">
                  <Link to="/ShowAndRemoveAdmins" className="card-link">
                             Show And Remove Admins
                  </Link>
                  </div>
                  </div>
                  </div>
                  </div>

                  <div className="col-md-4 mb-4">
                  <div className="card">
                  <div className="card shadow">
                  <div className="card-body">
                  <Link to="/viewDoctorRequests" className="card-link">
                            View Doctor Requests
                  </Link>
                  </div>
                  </div>
                  </div>
                  </div>

        <div className="col-md-4 mb-4">
          <div className="card">
          <div className="card shadow">
          <div className="card-body">
          <Link to="/ViewAndRemoveDoctor" className="card-link">
          View And Remove Doctor
          </Link>
          </div>
          </div>
          </div>
            </div>

            </div>
        </div>
    );
};

export default AdminHome;
