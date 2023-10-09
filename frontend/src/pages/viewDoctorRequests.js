import { useEffect, useState } from "react";

import DoctorRequestDetails from '../components/DoctorRequestDetails'

const DoctorRegistrationRequests = () => {
    const [doctorRequests, setDoctorRequests] = useState(null)

    useEffect(() => {
        const fetchDoctorRequests = async () => {
            const response = await fetch('api/doctorRegistration/getDoctorRequests')
            const json = await response.json()

            if(response.ok){
                setDoctorRequests(json)
            }
        }

        fetchDoctorRequests()
    }, [])
    

    return (
        <div className="doctorRegistrationRequests">
            <h2>Doctors applying to join the platform:</h2>
            <div>
                {doctorRequests && doctorRequests.map((doctorRequest) => (
                    //<p key={doctorRequest._id}>{doctorRequest.name}</p>
                    <DoctorRequestDetails key={doctorRequest._id} doctorRequest={doctorRequest}/>
                ))}
            </div>
        </div>
    )
}

export default DoctorRegistrationRequests;