import React, { useEffect, useState } from "react";
import ContractDetails from "../components/ContractDetails";
import Swal from "sweetalert2";

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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
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
                    text: "Contract accepted successfully",
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "An error occured",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "An error occured",
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
                    text: "Contract rejected successfully",
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Failed to reject contract",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Failed to reject contract",
            });
        }
    };

    return (
        <div className="contractDetails m-5">
            {contract && <ContractDetails contract={contract}/>}
            <div className="mt-3 m-lg-5">
                <button className="btn btn-success m-lg-3" onClick={handleAccept}>Accept</button>
                <button className="btn btn-danger" onClick={handleReject}>Reject</button>
            </div>
        </div>
    );
};

export default DoctorContract;
