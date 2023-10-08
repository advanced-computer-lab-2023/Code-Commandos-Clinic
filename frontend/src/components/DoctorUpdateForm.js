import { useState } from 'react'

const DoctorUpdateForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [error, setError] = useState(null)

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
    const json = await response.json()

    if (!response.ok) {
      setError(json.message)
    }
    if (response.ok) {
      setError(null)
      setEmail('')
      setHourlyRate('')
      setAffiliation('')
      console.log('a doctor\'s profile has been updated:', json)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h2>Update your information:</h2>

      <label>Confirm your username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username}
      /> <br />

      <label>E-mail:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      /> <br />

      <label>Hourly Rate:</label>
      <input 
        type="number" 
        onChange={(e) => setHourlyRate(e.target.value)} 
        value={hourlyRate} 
      /> <br />

      <label>Affiliation:</label>
      <input 
        type="text" 
        onChange={(e) => setAffiliation(e.target.value)} 
        value={affiliation} 
      /> <br />

      <button>Edit</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default DoctorUpdateForm