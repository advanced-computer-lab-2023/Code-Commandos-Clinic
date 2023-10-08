import { useState } from 'react'

const PatientRegistrationForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  //const [emergencyContact, setEmergencyContact] = useState('')
  const [ecFullName, setEcFullName] = useState('')
  const [ecMobileNumber, setEcMobileNumber] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const patient = {username: username, name: name, email: email, password: password, dateOfBirth: dateOfBirth, gender: gender, mobileNumber: mobileNumber, emergencyContact: {fullName: ecFullName, mobileNumber: ecMobileNumber}}
    
    const response = await fetch('/api/patient/registerPatient', {
      method: 'POST',
      body: JSON.stringify(patient),
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
      setName('')
      setUsername('')
      setEmail('')
      setPassword('')
      setGender('')
      setMobileNumber('')
      setEcFullName('')
      setEcMobileNumber('')
      
      console.log('new patient registered:', json)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h2>Registration:</h2>

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
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      /> <br />

      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      /> <br />

      <label>Date of Birth:</label>
      <input 
        type="date" 
        onChange={(e) => setDateOfBirth(e.target.value)} 
        value={dateOfBirth} 
      /> <br />

      <label>Gender:</label><br />
      <input 
        type="radio"
        id="MALE"
        name="gender" 
        onChange={(e) => setGender(e.target.id)} 
        //value={} 
      /> 
      <label>Male</label><br />
      <input 
        type="radio"
        id="FEMALE"
        name="gender"  
        onChange={(e) => setGender(e.target.id)} 
        //value={false} 
      /> 
      <label>Female</label><br />

      <label>Mobile Number:</label>
      <input 
        type="text" 
        onChange={(e) => setMobileNumber(e.target.value)} 
        value={mobileNumber} 
      /> <br />

      <label>Emergency Contact Full Name:</label>
      <input 
        type="text" 
        onChange={(e) => setEcFullName(e.target.value)} 
        value={ecFullName} 
      /> <br />

      <label>Emergency Contact Mobile Number:</label>
      <input 
        type="text" 
        onChange={(e) => setEcMobileNumber(e.target.value)} 
        value={ecMobileNumber} 
      /> <br />

      <button>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default PatientRegistrationForm