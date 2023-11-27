import { useState } from 'react'
import {useNavigate} from "react-router-dom";
import '../css/registration.css';

const PatientRegistrationForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [ecFullName, setEcFullName] = useState('')
  const [ecMobileNumber, setEcMobileNumber] = useState('')
  const navigate = useNavigate()

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

    if (!response.ok) {
        alert( await response.text())
    }
    if (response.ok) {
        const json = await response.json()
      setName('')
      setUsername('')
      setEmail('')
      setPassword('')
      //setGender('')
      setMobileNumber('')
      setEcFullName('')
      setEcMobileNumber('')
      alert('Registration successful.')
      console.log('new patient registered:', json)
      navigate('/Login')
      window.location.reload()
    }


  }

    return (
        <div class="patient-page">
        <div className="container">
       
            <div className="col-lg-8">

        <form className="create m-5" onSubmit={handleSubmit}>
            <h2>Patient Registration Form:</h2>

            <div className="row">
            <div className="col-md-5 mb-3">
            <label htmlFor="username" className="form-label"style={{ marginTop: '30px' }}>
                Username:
            </label>
            <input
                required={true}
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>

        <div className="col-md-5 mb-3">
            <label htmlFor="name" className="form-label"style={{ marginTop: '30px' }}>
                Name:
            </label>
            <input
                required={true}
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              
            />
        </div>
    </div>
    <div className="row">
    <div className="col-md-5 mb-3">
                <label htmlFor="email" className="form-label">
                    E-mail:
                </label>
                <input
                    required={true}
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='name@gmail.com'
                />
            </div>

            <div className="col-md-5 mb-3">
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input
                    required={true}
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   
                />
            </div>
            </div>
            <div className="row">
            <div className="col-md-5 mb-3">
                <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth:
                </label>
                <input
                    required={true}
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                 
                />
            </div>
           
            <div className="col-md-5 mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                    Mobile Number:
                </label>
                <input
                    required={true}
                    type="number"
                    className="form-control"
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
            </div>
            </div>
            <div className="row">
            <div className="col-md-5 mb-3">
                <label className="form-label">Gender:</label><br />
                <div className="form-check form-check-inline">
                    <input
                        required={true}
                        type="radio"
                        className="form-check-input"
                        id="MALE"
                        name="gender"
                        onChange={(e) => setGender(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="MALE">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        required={true}
                        type="radio"
                        className="form-check-input"
                        id="FEMALE"
                        name="gender"
                        onChange={(e) => setGender(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="FEMALE">Female</label>
                </div>
            </div>
            </div>

            
          
            <div className="col-md-5 mb-3">
                <label htmlFor="ecFullName" className="form-label">
                    Emergency Contact Full Name:
                </label>
                <input
                    required={true}
                    type="text"
                    className="form-control"
                    id="ecFullName"
                    value={ecFullName}
                    onChange={(e) => setEcFullName(e.target.value)}
                />
            </div>

            <div className="col-md-5 mb-3">
                <label htmlFor="ecMobileNumber" className="form-label">
                    Emergency Contact Mobile Number:
                </label>
                <input
                    required={true}
                    type="number"
                    className="form-control"
                    id="ecMobileNumber"
                    value={ecMobileNumber}
                    onChange={(e) => setEcMobileNumber(e.target.value)}
                />
            </div>

            <div>
          <button type="submit" button className="patient-btn">Register</button>
             </div>
        </form>
     </div>
            </div>
        </div>
     
    );
}

export default PatientRegistrationForm