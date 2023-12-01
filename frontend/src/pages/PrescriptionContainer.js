import React, { useState, useEffect } from 'react';
import PrescriptionDetails from "../components/PrescriptionDetails";

const PrescriptionContainer = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription,setSelectedPrescription] = useState(null)
  const username = window.localStorage.getItem("username")
  if(!username){
    alert("username not found , try to logout and login again")
  }
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('/api/prescription/getPrescriptionsbyPatient/'+username,{
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
  }, [username]);

  
  return (
      <div className="container mt-4">
        <h1 className="mb-4">Your prescriptions</h1>
        <ul className="list-group">
          {prescriptions && prescriptions.map((prescription) => (
              <li key={prescription._id} className="list-group-item">
                <button
                    className="btn btn-link btn-lg"
                    onClick={() => setSelectedPrescription(prescription)}
                    style={{ textDecoration: "none" }}
                >
                  {`Prescription by doctor ${prescription.doctorName}`}
                </button>
              </li>
          ))}
        </ul>
        {selectedPrescription && <PrescriptionDetails prescription={selectedPrescription} showEditButton={false} showActions={false}/>}
      </div>
  );
};

export default PrescriptionContainer;
