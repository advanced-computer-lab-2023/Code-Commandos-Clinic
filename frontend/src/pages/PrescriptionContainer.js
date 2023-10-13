import React, { useState, useEffect } from 'react';
import PrescriptionDetails from "../components/PrescriptionDetails";

const PrescriptionContainer = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription,setSelectedPrescription] = useState(null)

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('/api/prescription/getPrescriptionsbyPatient/6526cce90cd9ec95a0c24b93',{
          method: 'GET',
          headers: {
            'Content-Type':'application/json',
          },
        });
        if (response.ok){
          setPrescriptions(response.data);
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

  
  return (
      <div className="container mt-4">
        <h1 className="mb-4">Your prescriptions</h1>
        <ul className="list-group">
          {prescriptions.map((prescription) => (
              <li key={prescription._id} className="list-group-item">
                <button
                    className="btn btn-link btn-lg"
                    onClick={() => selectedPrescription(prescription)}
                    style={{ textDecoration: "none" }}
                >
                  {`Prescription by doctor ${prescription.doctor}`}
                </button>
              </li>
          ))}
        </ul>
        {selectedPrescription && <PrescriptionDetails prescription={selectedPrescription} />}
      </div>
  );
};

export default PrescriptionContainer;
