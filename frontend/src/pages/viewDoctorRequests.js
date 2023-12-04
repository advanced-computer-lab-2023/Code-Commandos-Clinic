import { useEffect, useState } from "react";

import DoctorRequestDetails from '../components/DoctorRequestDetails'

const DoctorRegistrationRequests = () => {
    const [doctorRequests, setDoctorRequests] = useState(null)

    useEffect(() => {
        const fetchDoctorRequests = async () => {
            const response = await fetch('api/doctorRegistration/getDoctorRequests',{
                method: 'GET',
                headers: {
                'Content-Type':'application/json',
            },
            });
            const res = response.clone();
            const json = await response.json()

            if(response.ok){
                setDoctorRequests(json)
            }
            else if(!response.ok){
                alert(await res.text())
            }
        }

        fetchDoctorRequests()
    }, [])
    

    return (
        <div className="doctorRegistrationRequests m-5">
            <h2 className="mb-4"><hr className="lineAround"></hr>Doctors applying to join the platform<hr className="lineAround"></hr></h2>
       
            <div className="box">
            <div>
                {doctorRequests && doctorRequests.map((doctorRequest) => (
                    //<p key={doctorRequest._id}>{doctorRequest.name}</p>
                    <DoctorRequestDetails key={doctorRequest._id} doctorRequest={doctorRequest}/>
                ))}
            </div>
        </div>
        </div>
       
    )
}

export default DoctorRegistrationRequests;