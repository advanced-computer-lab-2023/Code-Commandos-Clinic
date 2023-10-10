import { useEffect, useState } from "react";

import ShowAllAdmins from '../components/ShowAllAdmins'

const ShowAllAdminss = () => {
    const [admin, setAdmin] = useState('')
    //const [value, setValue] = useState('');

    useEffect(() => {
        const fetchAdmin = async () => 
        {
            const response = await fetch('api/admin/getAlladmins')
            const json = await response.json()

            if(response.ok){
                setAdmin(json)
                console.log(json)
            }
        }

        fetchAdmin()
    }, [])

    return (
        <div className="ShowAllAdmins">
            <h2>All Admins:</h2>
            <div>
            
                {admin && admin.map((admin) => (
                    //<p key={doctorRequest._id}>{doctorRequest.name}</p>
                    <ShowAllAdmins key={admin._id} admin={admin}/>
                   
                ))}
            </div>
        </div>
    )
}

export default ShowAllAdminss;
