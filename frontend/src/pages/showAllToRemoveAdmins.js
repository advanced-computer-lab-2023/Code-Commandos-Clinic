import { useEffect, useState } from "react";

import ShowAllAdmins from '../components/ShowAllAdmins'

const ShowAllAdminss = () => {
    const [admins, setAdmins] = useState('')
    //const [value, setValue] = useState('');

    useEffect(() => {
        const fetchAdmins = async () =>
        {
            const response = await fetch('api/admin/getAlladmins')
            const json = await response.json()

            if(response.ok){
                setAdmins(json)
                console.log(json)
            }
        }

        fetchAdmins()
    }, [])

    return (
        <div className="ShowAllAdmins">
            <h2>All Admins:</h2>
            <div>
            
                {admins && admins.map((admin) => (
                    //<p key={doctorRequest._id}>{doctorRequest.name}</p>
                    <ShowAllAdmins key={admin._id} admin={admin}/>
                   
                ))}
            </div>
        </div>
    )
}

export default ShowAllAdminss;
