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
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const doctorRequest = {username: username, name: name, email: email, password: password, dateOfBirth: dateOfBirth, hourlyRate: hourlyRate, affiliation: affiliation, educationalBackground: educationalBackground}
    
    const response = await fetch('/api/doctorRegistration/doctorRegistrationRequest', {
      method: 'POST',
      body: JSON.stringify(doctorRequest),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
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
    <form className="create" onSubmit={handleSubmit}> 
      <h2>Apply as a doctor to join the platform:</h2>

      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username}
      /> <br />

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
      /> <br />

      <label>E-mail:</label>
      <input 
        type="text" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      /> <br />

      <label>Password:</label>
      <input 
        type="text" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      /> <br />

      <label>Date of Birth:</label>
      <input 
        type="text" 
        onChange={(e) => setDateOfBirth(e.target.value)} 
        value={dateOfBirth} 
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

      <label>Educational Background:</label>
      <input 
        type="text" 
        onChange={(e) => setEducationalBackground(e.target.value)} 
        value={educationalBackground} 
      /> <br />

      <button>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default DoctorRegistrationForm