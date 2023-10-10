import { useEffect, useState } from "react";

import ShowDoctors from '../components/ShowAllDoctors'

const ShowAllDoctors = () => {
    const [doctor, setDoctor] = useState('')
    //const [value, setValue] = useState('');

    useEffect(() => {
        const fetchDoctor = async () => 
        {
            const response = await fetch('api/doctor/getDoctors')
            const json = await response.json()

            if(response.ok){
                setDoctor(json)
                console.log(json)
            }
        }

        fetchDoctor()
    }, [])

    return (
        <div className="ShowAllDoctors">
            <h2>All Doctors:</h2>
            <div>
            
                {doctor && doctor.map((doctor) => (
                    //<p key={doctorRequest._id}>{doctorRequest.name}</p>
                    <ShowDoctors key={doctor._id} doctor={doctor}/>
                   
                ))}
            </div>
        </div>
    )
}

export default ShowAllDoctors;