import React, { useEffect, useState } from "react";

const ContractDetails = () => {
    const [contracts, setContracts] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const [rejected, setRejected] = useState(false);

    useEffect(() => {
        const fetchContracts = async () => {
            const response = await fetch('/api/employmentContract/getContracts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const res = response.clone();
            const json = await response.json();

            if (response.ok) {
                setContracts(json);
            } else if (!response.ok) {
                alert(await res.text());
            }
        };

        fetchContracts();
    }, []);

    const handleAccept = (contractId) => {
        setAccepted(true);
        setContracts((prevContracts) => prevContracts.filter((contract) => contract._id !== contractId));
    };

    const handleReject = (contractId) => {
        setRejected(true);
        setContracts((prevContracts) => prevContracts.filter((contract) => contract._id !== contractId));
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
        <div className="contractDetails m-5">
            <h2>Contract Details:</h2>
            <div>
                {contracts && contracts.map((contract, index) => (
                    <div key={contract._id}>
                        <div className="contract-separator">
                            {index > 0 && <hr />}
                        </div>
                        <h3>Contract ID: {contract._id}</h3>
                        <p>Monthly Salary: {contract.monthlySalary}</p>
                        <p>Start Date: {contract.startDate}</p>
                        <p>End Date: {contract.endDate}</p>
                        <p>Responsibilities: {contract.responsibilities}</p>
                        <p>Note: This contract includes a markup added by the system to support the clinic's profit (5% of the session price)</p>

                        <div className="contract-buttons">
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handleAccept(contract._id)}>Accept</button>
                            <button className="btn btn-danger" onClick={() => handleReject(contract._id)}>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
            {rejected && (
                <div className="overlay">
                    <p>The contract has been rejected, and access to the system is denied.</p>
                </div>
            )}
            {accepted && (
                <div className="overlay">
                    <p>You have accepted the contract. You can now use the system.</p>
                </div>
            )}
        </div>
    );
};

export default ContractDetails;
