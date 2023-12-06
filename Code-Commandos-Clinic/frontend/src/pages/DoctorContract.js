import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import ContractDetails from "../components/ContractDetails";

const DoctorContract = () => {
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const response = await fetch('/api/employmentContract/getDoctorContract', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const json = await response.json();
                    setContract(json);
                } else {
                    throw new Error(await response.text());
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                });
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
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Contract accepted successfully!',
                });
            } else {
                throw new Error('Failed to accept contract. Please try again.');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
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
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Contract rejected successfully!',
                });
            } else {
                throw new Error('Failed to reject contract. Please try again.');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    };

    return (
        <div className="contractDetails text-center red-text" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50xp' }}>
            <div style={{ border: '2px solid red', borderRadius: '50px', padding: '80px', backgroundColor: 'white', width: '650px',height:'50xp' }}>
                {contract && <ContractDetails contract={contract} />}
                <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button className="btn btn-success" onClick={handleAccept}>Accept</button>
                    <button className="btn btn-danger" onClick={handleReject}>Reject</button>
                </div>
            </div>
        </div>
    );
};

export default DoctorContract;
