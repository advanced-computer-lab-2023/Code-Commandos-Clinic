import { useState } from 'react'
import AdminDetails from "../components/AdminDetails";

const AddAdmin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [admin,setAdmin] = useState(null)

  const handleAddAdmin = async (e) => {
    e.preventDefault()
    const admin = {username: username, password: password,email:email}
    const response = await fetch('/api/admin/addAdmin', {
      method: 'POST',
      body: JSON.stringify(admin),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
        alert(await response.text())
    }
    if (response.ok) {
        const json = await response.json()
        setAdmin(json)
      setUsername('')
      setPassword('')
        setEmail('')
      console.log('another admin is added:', json)
    }
  }

    return (
        <div className="container m-5">
            <h1 className="mb-4">Add an admin</h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Username:
                </label>
                <input
                    required={true}
                    type="text"
                    id="name"
                    className="form-control"
                    value={username !== null ? username : ""}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input
                    required={true}
                    type="password"
                    id="password"
                    className="form-control"
                    value={password !== null ? password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email:
                </label>
                <input
                    required={true}
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={handleAddAdmin}>
                Add
            </button>

            <div className="results mt-4">
                {admin && <AdminDetails admin={admin}/>}
            </div>
        </div>
    );
}

export default AddAdmin