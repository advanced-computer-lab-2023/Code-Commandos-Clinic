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
    const [speciality, setSpeciality] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const doctorRequest = {username: username, name: name, email: email, password: password, dateOfBirth: dateOfBirth, hourlyRate: hourlyRate, affiliation: affiliation, educationalBackground: educationalBackground,speciality:speciality}
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
      setEducationalBackground('')
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
                <label htmlFor="speciality" className="form-label">
                    Speciality:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="speciality"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary" >
                Register
            </button>
        </form>
    );
}

export default DoctorRegistrationForm