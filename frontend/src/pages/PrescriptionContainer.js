import React, { useState, useEffect } from 'react';
import PrescriptionList from '../components/PrescriptionList';

const PrescriptionContainer = () => {
  const [prescriptions, setPrescriptions] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  const [filterDoctor, setFilterDoctor] = useState(null);
  const [filterFilled, setFilterFilled] = useState(null);
  const [applyFilters, setApplyFilters] = useState(false);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const res = await fetch('/api/prescription/prescriptionList');
      const data = await res.json();

      if (res.ok) {
        setPrescriptions(data.data);
      }
    };

    fetchPrescriptions();
  }, []);

  const handleApplyFilters = () => {
    setApplyFilters(true);
  };

  const handleClearFilters = () => {
    setFilterDate(null);
    setFilterDoctor(null);
    setFilterFilled(null);
    setApplyFilters(false);
  };

  return (
    <div>
      <h1>Prescriptions list</h1>
      <div>
        <label>Date:</label>
        <input type="date" onChange={(e) => setFilterDate(e.target.value)} />
        <label>Doctor:</label>
        <input type="text" onChange={(e) => setFilterDoctor(e.target.value)} />
        <label>Filled:</label>
        <select onChange={(e) => setFilterFilled(e.target.value)}>
          <option value="true">Filled</option>
          <option value="false">Unfilled</option>
        </select>
        <button onClick={handleApplyFilters}>Apply Filters</button>
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
      <PrescriptionList
        prescriptions={prescriptions}
        filterDate={filterDate}
        filterDoctor={filterDoctor}
        filterFilled={filterFilled}
        applyFilters={applyFilters}
      />
    </div>
  );
};

export default PrescriptionContainer;
