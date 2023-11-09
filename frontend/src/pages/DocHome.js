import React, { useState } from 'react';

const DocHome = () => {
  // Dummy contract data
  const contractDetails = {
    monthlySalary: "$500",
    contractPeriod: "1 year",
    workingHours: "40 hours per week",
    startDate: "2023-11-01",
    endDate: "2024-10-31",
    benefits: [
      "Health insurance",
      "Paid time off",
      "Retirement plan"
    ],
    responsibilities: [
      "Provide medical consultations",
      "Diagnose and treat patients",
      "Maintain accurate medical records"
    ],
    termsAndConditions: [
      "1. Either party may terminate this Agreement with or without cause by providing written notice in accordance with the notice period outlined in the termination clause.",
      "2. The Employee shall not disclose any confidential or proprietary information of the Employer to any third party.",
      "3. This contract includes a markup added by the system to support the clinic's profit(5% of the session price)",
      "4. This Agreement constitutes the entire agreement between the Parties and supersedes all prior and contemporaneous agreements."
    ]
  };

  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);

  // Function to handle the acceptance action
  const handleAccept = () => {
    setAccepted(true);
  };

  // Function to handle the rejection action
  const handleReject = () => {
    setRejected(true);

// Add overlay element to make everything unclickable
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent black overlay
    overlay.style.zIndex = '9999'; // Place it above other content
    overlay.style.pointerEvents = 'auto'; // Prevent interactions with underlying content

    document.body.appendChild(overlay);
    };

  return (
    <div className="card">
      <div className="card-body">
        {rejected ? (
          <p>The contract has been rejected, and access to the system is denied.</p>
      
        ) : accepted ? (
          <p>You have accepted the contract. You can now use the system.</p>
        ) : (
          <>
            <h5 className="card-title">Employment Contract</h5>
            <p className="card-text">Monthly Salary: {contractDetails.monthlySalary}</p>
            <p className="card-text">Contract Period: {contractDetails.contractPeriod}</p>
            <p className="card-text">Working Hours: {contractDetails.workingHours}</p>
            <p className="card-text">Start Date: {contractDetails.startDate}</p>
            <p className="card-text">End Date: {contractDetails.endDate}</p>
            <h6 className="card-subtitle mb-2 text-muted">Benefits:</h6>
            <ul className="list-unstyled">
              {contractDetails.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <h6 className="card-subtitle mb-2 text-muted">Responsibilities:</h6>
            <ul className="list-unstyled">
              {contractDetails.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
            <h6 className="card-subtitle mb-2 text-muted">Terms And Conditions:</h6>
            <ul className="list-unstyled">
              {contractDetails.termsAndConditions.map((terms, index) => (
                <li key={index}>{terms}</li>
              ))}
              </ul>
            <button className="btn btn-primary mr-2" style={{ marginRight: '5px' }} onClick={handleAccept}>Accept</button>
            <button className="btn btn-danger" onClick={handleReject}>Reject</button>
          </>
        )}
      </div>
    </div>
  );
}

export default DocHome;
