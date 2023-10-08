import { Component, useEffect, useState } from "react";
import AppointmentsDetails from '../components/AppointmentsDetails';

const FilteredAppointments = () =>{
    const [filteredAppointments, setFilteredAppontments] = useState(null)

    useEffect(() => {
        const fetchFilteredAppointments = async () => {
            const response = await fetch('api/appointment/getAppointment/:appointmentDate')
            const json = await response.json()

            if(response.ok){
                setFilteredAppontments(json)
            }
        }
        

        fetchFilteredAppointments()
    }, [])
    return(
        <div className="filteredAppointments">
            <h2>Appointments:</h2>
            <div>
                {filteredAppointments && filteredAppointments.map((filteredAppointment)=>(
                    <AppointmentsDetails key={filteredAppointment._id}  filteredAppointment={filteredAppointment}/>
                ))}
            </div>
        </div>
    )
}

export default FilteredAppointments