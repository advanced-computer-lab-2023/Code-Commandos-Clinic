import React, { useState } from "react";
import PrescriptionList from "../components/PrescriptionList"; // Adjust the path accordingly

const FilterByDoctor = () => {
  const [doctorName, setDoctorName] = useState("");
  const [doctorPrescriptions, setDoctorPrescriptions] = useState(null);

  const fetchResults = async () => {
    try {
      const res = await fetch(`/api/prescription/filterByDoctor/${doctorName}`);
      const data = await res.json();

      if (res.ok) {
        setDoctorPrescriptions(data.data);
      }
    } catch (error) {
      console.error('Error fetching doctor prescriptions:', error.message);
    }
  };

  const handleInputChange = (event) => {
    setDoctorName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchResults();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Doctor Name:
          <input type="text" value={doctorName} onChange={handleInputChange} />
        </label>
        <button type="submit">Filter</button>
      </form>

      {doctorPrescriptions !== null && (
        <PrescriptionList prescriptions={doctorPrescriptions} />
      )}
    </div>
  );
};

export default FilterByDoctor;
