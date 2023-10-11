import { useEffect, useState } from "react";
import AdminDetails from "../components/AdminDetails";


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
            alert(await response.text())
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
            alert(await response.text())
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
                    <li key={admin._id} className="list-group-item">
                        <button
                            className="btn btn-link btn-lg"
                            onClick={() => setSetSelectedAdmin(admin)}
                            style={{ textDecoration: "none" }}
                        >
                            {admin.username}
                        </button>
                    </li>

                ))}
            </ul>
            {selectedAdmin &&(
                <>
                    <AdminDetails admin={selectedAdmin} />
                    <button className="btn btn-danger" onClick={() => handleRemoveAdmin(selectedAdmin._id)}>Remove</button>
                </>
            )}
        </div>
    );
}

export default ShowAndRemoveAdmins;
