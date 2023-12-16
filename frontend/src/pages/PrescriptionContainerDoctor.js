import React, { useState, useEffect } from 'react';
import PrescriptionDetails from "../components/PrescriptionDetails";
import Swal from "sweetalert2"
import appointt from "../images/presc.mp4" 

import FilterPrescriptions from './FilterPrescriptions';

const PrescriptionContainerDoctor = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription,setSelectedPrescription] = useState(null)

  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);


  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('/api/prescription/getPrescriptionsbyDoctor',{
          method: 'GET',
          headers: {
            'Content-Type':'application/json',
          },
        });
        if (response.ok){
          const result = await response.json()
          setPrescriptions(result)
          setFilteredPrescriptions(result);
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: await response.text(),
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.message,
        });
      }
    };

    fetchPrescriptions();
  }, []);


  const applyFilters = (filtered) => {
    setFilteredPrescriptions(filtered);
    // setIsFilterApplied(true);
    setSelectedPrescription(null);
  };

  const videoStyle = {
    width: '60%', 
    height: 'auto',
    position:'fixed' ,
    right:0,
    top:150
  };
  return (
      <div className="container mt-4">
        <h2 className="mb-4"><hr className="lineAround"></hr>Your prescriptions<hr className="lineAround"></hr></h2>

        <br></br>
        <div className="box-with-image"> 
        
        <ul className="list-group">
          
          {(isFilterApplied ? filteredPrescriptions : prescriptions).map((prescription) => (
              
              <li key={prescription._id} className="list-group-item">
                 <button id="click"
                    className="btn btn-link btn-lg"
                    onClick={() => setSelectedPrescription(prescription)}
                     style={{ textDecoration: "none" }}
                >
                  {` ${prescription.doctorName}`}
                </button> 
              </li>
              
          ))}
        </ul>
        {selectedPrescription && <PrescriptionDetails prescription={selectedPrescription} showEditButton={true} showActions={false}/>}
        {selectedPrescription ? null : (
        <div>
        <video style={videoStyle}  autoPlay muted playsInline controls={false} loop={true}>
        <source src={appointt} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
      )}
      </div>
      <p></p><p></p><p></p><p></p><p></p>
      </div>
  );
};

export default PrescriptionContainerDoctor;