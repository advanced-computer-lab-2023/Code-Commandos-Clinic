import { useState } from 'react'
import AdminDetails from "../components/AdminDetails";
import Swal from 'sweetalert2';
import adminImage from '../images/admin1.png';


const AddAdmin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
    const [admin,setAdmin] = useState(null)

  const handleAddAdmin = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Please fill in all the fields.',
      });
      return;
    }
    const admin = {username: username, password: password}
    const response = await fetch('/api/admin/addAdmin', {
      method: 'POST',
      body: JSON.stringify(admin),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      const errorMessage = await response.text();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
      return;
    }

    if (response.ok) {
        const json = await response.json()
        setAdmin(json)
      setUsername('')
      setPassword('')
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Admin added successfully!',
      });
      console.log('another admin is added:', json)
    }
  }

  return (
    <div className="container m-5 ">
      <div className="admin-form ">
        <h2 className="mb-4 ">
          <hr className="lineAround"></hr>Add new admin<hr className="lineAround"></hr>
        </h2>
  
        <div className="row border-danger box col-md-8">
          <div className="col-md-6">
            <div className="col-md-5 mb-3">
              <label htmlFor="name" className="form-label">
                Username:
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={username !== null ? username : ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-5 mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password !== null ? password : ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="custom-btn wider-button" onClick={handleAddAdmin}>
              Add
            </button>
          </div>
        </div>
  
          <div className="col-md-2">
            {/* Include the image on the right side */}
            <img src={adminImage} style={{marginTop:'10px'}} alt="Admin" className="img-fluid" />
          </div>
  
        <div className="results mt-4">
          {admin && <AdminDetails admin={admin} />}
        </div>
      </div>
    </div>
  );
}

export default AddAdmin