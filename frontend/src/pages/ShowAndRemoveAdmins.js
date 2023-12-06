import { useEffect, useState } from "react";
//import AdminDetails from "../components/AdminDetails";
import "../css/showandremoveadmins.css";
import swal from 'sweetalert';

const ShowAndRemoveAdmins = () => {
    const [admins, setAdmins] = useState([])
    const [selectedAdmin,setSetSelectedAdmin] = useState(null)

    useEffect(() => {
        fetchAdmins()
    }, [])

    const fetchAdmins = async () => {
        const response = await fetch('/api/admin/getAlladmins',{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        });
        if(response.ok){
            const json = await response.json()
            setAdmins(json)
            console.log(json)
        }
        else if(!response.ok){
            swal(await response.text())
        }
    }

    const handleRemoveAdmin = async (adminId) => {
        const response = await fetch('/api/admin/removeAdmin/'+adminId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            swal(await response.text())
        }
        if (response.ok) {
            setSetSelectedAdmin(null)
            fetchAdmins()
        }
    }



    return (
        <div className="container mt-4">
        <h1 className="mb-4">System Admins</h1>
       
        <ul className="list-group">
            {admins.map((admin) => (
                <li key={admin._id} className="list-group-item red-border">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{admin.username}</h5>
                            <p>{admin.email}</p>
                           
                        </div>
                        <div>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleRemoveAdmin(admin._id)}
                                style={{ backgroundColor: '#d21312' }}
                            >
                                Remove{" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-trash"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M1.5 2.5a.5.5 0 0 1 1 0V13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5a.5.5 0 0 1 1 0V13a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V2.5zM0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1H0V1z"
                                    />
                                </svg>
                                
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
    );
}

export default ShowAndRemoveAdmins;