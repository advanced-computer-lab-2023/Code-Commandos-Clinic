import { useEffect, useState } from "react";
import AdminDetails from "../components/AdminDetails";
import "../css/showandremoveadmins.css";
import Swal from 'sweetalert2';

const ShowAndRemoveAdmins = () => {
    const [admins, setAdmins] = useState([])
    const [selectedAdmin,setSelectedAdmin] = useState(null)

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
        }
        else if(!response.ok){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: await response.text(),
            });
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
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: await response.text(),
            });
        }
        if (response.ok) {
            setSelectedAdmin(null)
            fetchAdmins()
        }
    }



    return (
        <div className="container mt-4">
            <div className="row">
                <h2 className="mb-4"><hr className="lineAround"></hr>system admins<hr className="lineAround"></hr></h2>
             <div className="col-md-5">
               <ul className="list-group">
                  {admins.map((admin) => (
                     <li key={admin._id} className="list-group-item red-border">
                         <button
                             className="btn btn-link btn-lg"
                             onClick={() => setSelectedAdmin(admin)}
                             style={{ textDecoration: "none", color:'#000000' }}
                         >
                             <span>{admin.username}</span>
                        </button>
                    </li>
                ))}
              </ul>
            </div>
            <div className="col-md-5 mt-5">
               {selectedAdmin && (
                        <>
                            <div style={{ marginLeft: '10px' }}> {/* Add margin to the bottom */}
                            <AdminDetails admin={selectedAdmin} />
        
                           </div>
                            <button
                                className="btn btn-danger"
                                style={{ marginLeft: '30px', marginTop:'5px', width:'150px' }}
                                onClick={() => handleRemoveAdmin(selectedAdmin._id)}
                                
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
                        </>
            )}
        </div>
      </div>
    </div>
    );
};

export default ShowAndRemoveAdmins;