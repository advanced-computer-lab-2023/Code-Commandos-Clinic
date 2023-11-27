import React, { useEffect, useState } from "react";
import ContractDetails from "../components/ContractDetails";

const DoctorContract = () => {
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const fetchContract = async () => {
            const response = await fetch('/api/employmentContract/getDoctorContract', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const json = await response.json();
                console.log("contract is ",contract)
                setContract(json);
            }
            else {
                alert(await response.text());
            }
        };

        fetchContract();
    }, []);

    const handleAccept = async () => {
        try {
            const response = await fetch('/api/employmentContract/acceptContract', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Contract accepted successfully!');
            } else {
                alert('Failed to accept contract. Please try again.');
            }
        } catch (error) {
            console.error('Error accepting contract:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch('/api/employmentContract/rejectContract', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Contract rejected successfully!');
            } else {
                alert('Failed to reject contract. Please try again.');
            }
        } catch (error) {
            console.error('Error rejecting contract:', error);
        }
    };

    return (
        <div className="contractDetails m-5">
            {contract && <ContractDetails contract={contract}/>}
            <div className="mt-3">
                <button className="btn btn-success mr-2" onClick={handleAccept}>Accept</button>
                <button className="btn btn-danger" onClick={handleReject}>Reject</button>
            </div>
        </div>
    );
};

export default DoctorContract;
