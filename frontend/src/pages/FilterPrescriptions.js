import React, { useState, useEffect } from 'react';
import PrescriptionDetails from "../components/PrescriptionDetails";

const FilterPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
    const [date, setDate] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [status, setStatus] = useState('');


    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch('/api/prescription/getPrescriptionsbyPatient',{
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                    },
                });
                if (response.ok){
                    const result = await response.json()
                    setPrescriptions(result)
                    console.log(result)
                }
                else{
                    alert(await response.text())
                }
            } catch (error) {
                alert(error.message)
            }
        };

        fetchPrescriptions();
    }, []);

    const filterPrescriptions = () => {
        let filtered = [...prescriptions];

        if (date) {
            const selectedDateISO = new Date(date).toISOString();
            filtered = filtered.filter((prescription) => {
                return prescription.createdAt.split('T')[0] === selectedDateISO.split('T')[0];
            });
        }
        if (doctorId) {
            filtered = filtered.filter((prescription) => prescription.doctor === doctorId);
        }
        if (status) {
            filtered = filtered.filter((prescription) => prescription.status === status);
        }

        setFilteredPrescriptions(filtered);
    };

    return (
        <div className="container mt-4">
            <h2>Prescription Filter Page</h2>
            <div className="row">
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <label htmlFor="doctor">Doctor:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="doctor"
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            className="form-control"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="FILLED">FILLED</option>
                            <option value="UNFILLED">UNFILLED</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <button className="btn btn-primary" onClick={filterPrescriptions}>
                        Apply Filters
                    </button>
                </div>
            </div>

            <div className="row">
                {filteredPrescriptions && filteredPrescriptions.map((prescription) => (
                    <PrescriptionDetails key={prescription._id} prescription={prescription} />
                ))}
            </div>
        </div>
    );

};

export default FilterPrescriptions;
