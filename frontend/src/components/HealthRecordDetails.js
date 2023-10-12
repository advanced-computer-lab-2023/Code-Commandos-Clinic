import React from 'react';

const HealthRecordDetails = ({ healthRecord }) => {
    
    
    
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text">AllergicHistory: {healthRecord.AllergicHistory}</p>
                <p className="card-text">Main Complaint: {healthRecord.MainComplaint}</p>
                <p className="card-text">Blood Type: {healthRecord.BloodType}</p>
            </div>
        </div>
    );
};

export default HealthRecordDetails;