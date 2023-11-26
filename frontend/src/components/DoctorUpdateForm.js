import { useState } from 'react';
import Swal from 'sweetalert2';

const DoctorUpdateForm = () => {
  const [email, setEmail] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [affiliation, setAffiliation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    if (!hourlyRate || isNaN(hourlyRate) || hourlyRate < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please enter a valid hourly rate.',
      });
      return;
    }

    if (!affiliation) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please enter an affiliation.',
      });
      return;
    }

    let doctor = {};

    if (email.length !== 0) {
      doctor.email = email;
    }
    if (hourlyRate.length !== 0) {
      doctor.hourlyRate = hourlyRate;
    }
    if (affiliation.length !== 0) {
      doctor.affiliation = affiliation;
    }

    const response = await fetch('/api/doctor/updateDoctor', {
      method: 'PUT',
      body: JSON.stringify(doctor),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: await response.text(),
      });
    }

    if (response.ok) {
      const json = await response.json();
      setEmail('');
      setHourlyRate('');
      setAffiliation('');

      Swal.fire({
        icon: 'success',
        title: 'Update Successful!',
        showConfirmButton: true,
        confirmButtonText: 'OK',

      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          // Handle additional actions if needed
          console.log("A doctor's profile has been updated:", json);
        }
      });
    }
  };

  return (
    <form className="create m-5" onSubmit={handleSubmit}>
      <h2 className="red-header"> Update your information</h2>

      <div className="col-md-2 mb-3">
        <label htmlFor="email" className="form-label">
          E-mail:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="col-md-2 mb-3">
        <label htmlFor="hourlyRate" className="form-label">
          Hourly Rate:
        </label>
        <input
          type="number"
          className="form-control"
          id="hourlyRate"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
        />
      </div>

      <div className="col-md-2 mb-3">
        <label htmlFor="affiliation" className="form-label">
          Affiliation:
        </label>
        <input
          type="text"
          className="form-control"
          id="affiliation"
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
        />
      </div>

      <button type="submit" className="custom-btn">
        Edit
      </button>
    </form>
  );
};

export default DoctorUpdateForm;
