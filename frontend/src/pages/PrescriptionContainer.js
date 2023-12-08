import React, { useState, useEffect } from 'react';
import PrescriptionDetails from "../components/PrescriptionDetails";

import appointt from "../images/presc.mp4" 

import FilterPrescriptions from './FilterPrescriptions';

const PrescriptionContainer = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription,setSelectedPrescription] = useState(null)


  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);


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
          

          setFilteredPrescriptions(result);

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
        
        
          {selectedPrescription !== null && (
          <FilterPrescriptions prescriptions={prescriptions} applyFilters={applyFilters} />
      
        )}
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

        
        {selectedPrescription && <PrescriptionDetails prescription={selectedPrescription} />}
       
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

export default PrescriptionContainer;

// import React, { useState, useEffect } from 'react';
// import PrescriptionDetails from '../components/PrescriptionDetails';
// import drugs from '../images/drugs.jpg';
// import FilterPrescriptions from './FilterPrescriptions';

// const PrescriptionContainer = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
//   const [selectedPrescription, setSelectedPrescription] = useState(null);

//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         const response = await fetch('/api/prescription/getPrescriptionsbyPatient', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         if (response.ok) {
//           const result = await response.json();
//           setPrescriptions(result);
//           setFilteredPrescriptions(result); // Set default filteredPrescriptions
//           console.log(result);
//         } else {
//           alert(await response.text());
//         }
//       } catch (error) {
//         alert(error.message);
//       }
//     };

//     fetchPrescriptions();
//   }, []);

//   const applyFilters = (filtered) => {
//     setFilteredPrescriptions(filtered);
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">
//         <hr className="lineAround"></hr>Your prescriptions<hr className="lineAround"></hr>
//       </h2>
//       {/* <div className="row"> */}
//         <div className="col-md-8">



//           {/* Prescription Container */}
//           <ul className="list-group">
//             {filteredPrescriptions &&
//               filteredPrescriptions.map((prescription) => (
//                 <li key={prescription._id} className="list-group-item">
//                   <button
//                     className="btn btn-link btn-lg"
//                     onClick={() => setSelectedPrescription(prescription)}
//                     style={{ textDecoration: 'none' }}
//                   >
//                     {`Click to view prescription by ${prescription.doctorName}`}
//                   </button>
//                 </li>
//               ))}
//           </ul>
//           <div className="image" id="pres">
//             {' '}
//             <img src={drugs} alt="Your Image" />
//           </div>
//         </div>
//         <div className="col-md-4">
//           {/* Filter Prescriptions */}
//           <FilterPrescriptions prescriptions={prescriptions} applyFilters={applyFilters} />
//         </div>
//       {/* </div> */}
//       {selectedPrescription && <PrescriptionDetails prescription={selectedPrescription} />}
//     </div>
//   );
// };

// export default PrescriptionContainer;

