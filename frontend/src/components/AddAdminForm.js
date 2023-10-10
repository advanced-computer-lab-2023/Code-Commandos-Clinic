import { useState } from 'react'

const AddAdminForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const admin = {username: username, password: password}
    
    const response = await fetch('/api/admin/addAdmin', {
      method: 'POST',
      body: JSON.stringify(admin),
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
      setUsername('')
      setPassword('')
      console.log('another admin is added:', json)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h2>Add another admin:</h2>

      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username}
      /> <br />

      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      /> <br />


      <button>Add Admin</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddAdminForm