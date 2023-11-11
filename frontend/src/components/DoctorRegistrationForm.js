import { useState } from 'react'

const DoctorRegistrationForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [educationalBackground, setEducationalBackground] = useState('')
    const [sessionPrice, setSessionPrice] = useState('')
    const [speciality, setSpeciality] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const doctorRequest = {username: username, name: name, email: email, password: password, dateOfBirth: dateOfBirth, hourlyRate: hourlyRate, affiliation: affiliation, educationalBackground: educationalBackground,speciality:speciality,sessionPrice:sessionPrice}
    const response = await fetch('/api/doctorRegistration/doctorRegistrationRequest', {
      method: 'POST',
      body: JSON.stringify(doctorRequest),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage);
    }
    if (response.ok) {
        const json = await response.json()
        setName('')
      setUsername('')
      setEmail('')
      setPassword('')
      setHourlyRate('')
      setAffiliation('')
      setSessionPrice('')
      setEducationalBackground('')
      alert('Request to register successful.')
      console.log('new doctor registration request added:', json)
    }

  }

    return (
        <form className="create m-5" onSubmit={handleSubmit}>
            <h2>Apply as a doctor to join the platform:</h2>

            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Username:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
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

            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth:
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </div>

            <div className="mb-3">
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
            <div className="mb-3">
                <label htmlFor="sessionPrice" className="form-label">
                    Session Price:
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="sessionPrice"
                    value={sessionPrice}
                    onChange={(e) => setSessionPrice(e.target.value)}
                />
            </div>
            <div className="mb-3">
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

            <div className="mb-3">
                <label htmlFor="educationalBackground" className="form-label">
                    Educational Background:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="educationalBackground"
                    value={educationalBackground}
                    onChange={(e) => setEducationalBackground(e.target.value)}
                />
            </div>

            <div className="mb-3">
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
                    <option value="DENTIST">Dentist</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary" >
                Register
            </button>
        </form>
    );
}

export default DoctorRegistrationForm