import { useState } from 'react';
import Swal from 'sweetalert2';
import DoctorDetails from '../components/DoctorDetails';

const SearchByNameAndOrSpeciality = () => {
  const [name, setName] = useState(null);
  const [speciality, setSpeciality] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const fetchResults = async () => {
    try {
        if (!name && !speciality) {
            Swal.fire({
              icon: 'warning',
              title: 'Missing Information',
              text: 'Please enter either a name or select a speciality to perform the search.',
            });
            return;
          }
          
      let url = '/api/doctor/searchByNameAndOrSpeciality';
      if (!name) {
        url += '/none';
      } else {
        url += `/${name}`;
      }
      if (!speciality) {
        url += '/none';
      } else {
        url += `/${speciality}`;
      }
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
        setSelectedDoctor(null);
      } else {
        const errorMessage = await response.text();
        // Replace alert with SweetAlert error message
        Swal.fire({
          icon: 'info',
          title: 'No Doctors Found',
          text:'Sorry, no doctors match your search criteria.',
        });
        setSearchResults([]); // Reset searchResults to an empty array
        throw new Error(errorMessage);
      }
    } catch (error) {
      setSelectedDoctor(null);
    }
  };

  return (
    <div className="container m-5">
      <h2 className="mb-4"> <hr className="linearound"></hr> Search by Name and Speciality <hr className="linearound"></hr></h2>
      <div className="col-md-2 mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name !== null ? name : ''}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="col-md-2 mb-3">
        <label htmlFor="specialty" className="form-label">
          Speciality:
        </label>
        <select
          id="speciality"
          name="speciality"
          className="form-select"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
        >
 <option value="">Select a specialty</option>
                    <option value="ALLERGISTS/IMMUNOLOGISTS">Allergists/Immunologists</option>
                    <option value="ANESTHESIOLOGISTS">Anesthesiologists</option>
                    <option value="CARDIOLOGISTS">Cardiologists</option>
                    <option value="COLON AND RECTAL SURGEONS">Colon and Rectal Surgeons</option>
                    <option value="CRITICAL CARE MEDICINE SPECIALISTS">Critical Care Medicine Specialists</option>
                    <option value="DERMATOLOGISTS">Dermatologists</option>
                    <option value="ENDOCRINOLOGISTS">Endocrinologists</option>
                    <option value="EMERGENCY MEDICINE SPECIALISTS">Emergency Medicine Specialists</option>
                    <option value="FAMILY PHYSICIANS">Family Physicians</option>
                    <option value="GASTROENTEROLOGISTS">Gastroenterologists</option>
                    <option value="GERIATRIC MEDICINE SPECIALISTS">Geriatric Medicine Specialists</option>
                    <option value="HEMATOLOGISTS">Hematologists</option>
                    <option value="HOSPICE AND PALLIATIVE MEDICINE SPECIALISTS">Hospice and Palliative Medicine Specialists</option>
                    <option value="INFECTIOUS DISEASE SPECIALISTS">Infectious Disease Specialists</option>
                    <option value="INTERNISTS">Internists</option>
                    <option value="MEDICAL GENETICISTS">Medical Geneticists</option>
                    <option value="NEPHROLOGISTS">Nephrologists</option>
                    <option value="NEUROLOGISTS">Neurologists</option>
                    <option value="OBSTETRICIANS AND GYNECOLOGISTS">Obstetricians and Gynecologists</option>
                    <option value="ONCOLOGISTS">Oncologists</option>
                    <option value="OPHTHALMOLOGISTS">Ophthalmologists</option>
                    <option value="OSTEOPATHS">Osteopaths</option>
                    <option value="OTOLARYNGOLOGISTS">Otolaryngologists</option>
                    <option value="PATHOLOGISTS">Pathologists</option>
                    <option value="PEDIATRICIANS">Pediatricians</option>
                    <option value="PHYSIATRISTS">Physiatrists</option>
                    <option value="PLASTIC SURGEONS">Plastic Surgeons</option>
                    <option value="PODIATRISTS">Podiatrists</option>
                    <option value="PREVENTIVE MEDICINE SPECIALISTS">Preventive Medicine Specialists</option>
                    <option value="PSYCHIATRISTS">Psychiatrists</option>
                    <option value="PULMONOLOGISTS">Pulmonologists</option>
                    <option value="RADIOLOGISTS">Radiologists</option>
                    <option value="RHEUMATOLOGISTS">Rheumatologists</option>
                    <option value="SLEEP MEDICINE SPECIALISTS">Sleep Medicine Specialists</option>
                    <option value="SPORTS MEDICINE SPECIALISTS">Sports Medicine Specialists</option>
                    <option value="GENERAL SURGEONS">General Surgeons</option>
                    <option value="UROLOGISTS">Urologists</option>
                    <option value="DENTIST">Dentist</option>        </select>
      </div>
      <button className="custom-btn wider-button" onClick={fetchResults}>
        Search
      </button>

      <div className="results mt-4 col-md-3">
        {searchResults &&
          searchResults.map((doctor) => (
            <button
              key={doctor._id}
              className="btn "
              onClick={() => setSelectedDoctor(doctor)} style={{ fontSize: "20px", color:'#1B3236', marginInlineEnd:'5px' }}
            >
              {doctor.name}
              <br />
            </button>
          ))}
      </div>
      <div className="col-md-5">
        {selectedDoctor && <DoctorDetails key={selectedDoctor._id} doctor={selectedDoctor} />}
      </div>
    </div>
  );
};

export default SearchByNameAndOrSpeciality;