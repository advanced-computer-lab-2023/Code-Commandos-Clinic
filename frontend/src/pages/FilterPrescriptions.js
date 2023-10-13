import React, { useState, useEffect } from 'react';
import PrescriptionDetails from "../components/PrescriptionDetails";

const FilterPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
    const [date, setDate] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        const response = await fetch('/api/prescriptions/getPrescriptionsbyPatient/6526cce90cd9ec95a0c24b93');
        if (response.ok){
            const data = await response.json();
            setPrescriptions(data);
        }
        else {
            alert(await response.text())
        }
    };

    const filterPrescriptions = () => {
        let filtered = [...prescriptions];

        // Apply filters
        if (date) {
            filtered = filtered.filter((prescription) => prescription.createdAt === date);
        }
        if (doctorId) {
            filtered = filtered.filter((prescription) => prescription.doctor._id === doctorId);
        }
        if (status) {
            filtered = filtered.filter((prescription) => prescription.status === status);
        }

        setFilteredPrescriptions(filtered);
    };

    return (
        <div>
            <h2>Prescription Filter Page</h2>
            <div>
                <label>Date:</label>
                <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
                <label>Doctor:</label>
                <input type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} />
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All</option>
                    <option value="FILLED">FILLED</option>
                    <option value="UNFILLED">UNFILLED</option>
                </select>
            </div>
            <button onClick={filterPrescriptions}>Apply Filters</button>

            <div>
                {filteredPrescriptions.map((prescription) => (
                    <PrescriptionDetails key={prescription._id} prescription={prescription} />
                ))}
            </div>
        </div>
    );
};

export default FilterPrescriptions;
