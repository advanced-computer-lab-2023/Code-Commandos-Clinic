import React from 'react';

const HealthRecordDetails = ({ HealthRecord }) => {
    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text">AllergicHistory: {HealthRecord.BloodType}</p>
                <p className="card-text">Main Complaint: </p>
                <p className="card-text">Blood Type: </p>
            </div>
        </div>
    );
};

export default HealthRecordDetails;