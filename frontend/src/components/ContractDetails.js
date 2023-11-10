import React from 'react';

const ContractDetails = ({ contract }) => {
    console.log("contract from comp ",contract)
    return (
        <div className="contractDetails m-5">
            <h2>Contract Details:</h2>
            <div className="card box">
                <div className="card-body">
                    <h5 className="card-title">Contract Details</h5>
                    <p className="card-text"><strong>Monthly Salary:</strong> {contract.monthlySalary}</p>
                    <p className="card-text"><strong>Start Date:</strong> {contract.startDate}</p>
                    <p className="card-text"><strong>End Date:</strong> {contract.endDate}</p>
                    <p className="card-text"><strong>Responsibilities:</strong> {contract.responsibilities}</p>
                    <p className="card-text"><strong>Terms and Conditions:</strong> {contract.termsAndConditions}</p>
                    <p className="card-text"><strong>Status:</strong> {contract.status}</p>
                    <p className="card-text"><strong>Markup:</strong> {contract.markup}</p>
                </div>
            </div>
        </div>
    );
};

export default ContractDetails;