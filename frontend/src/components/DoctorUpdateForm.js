import { useState } from 'react'

const DoctorUpdateForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [affiliation, setAffiliation] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    let doctor = {}
    if(username.length !== 0){
      doctor.username = username;
    }
    if(email.length !== 0){
      doctor.email = email;
    }
    if(hourlyRate.length !== 0){
      doctor.hourlyRate = hourlyRate;
    }
    if(affiliation.length !== 0){
      doctor.affiliation = affiliation;
    }
    
    const response = await fetch('/api/doctor/updateDoctor', {
      method: 'PUT',
      body: JSON.stringify(doctor),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
        alert(await response.text())
    }
    if (response.ok) {
        const json = await response.json()
      setEmail('')
      setHourlyRate('')
      setAffiliation('')
      alert('Update successful.')
      console.log('a doctor\'s profile has been updated:', json)
    }

  }

    return (
        <form className="create m-5" onSubmit={handleSubmit}>
            <h2>Update your information:</h2>

            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Confirm your username:
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

            <button type="submit" className="btn btn-primary">
                Edit
            </button>
        </form>
    );
}

export default DoctorUpdateForm