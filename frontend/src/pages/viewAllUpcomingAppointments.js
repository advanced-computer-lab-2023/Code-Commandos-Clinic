import { useEffect, useState } from "react";
import UpcomingAppointments from "../components/UpcomingAppointments";
const UpcomingAppointment = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState(null)

    useEffect(() => {
        const fetchUpcomingAppointments = async () => {
            const response = await fetch('api/appointment/getUpcomingAppointments/651ef3b26c21aee2d43e6b9b')
            const json = await response.json()
            console.log(json[0])
            if(response.ok){
                setUpcomingAppointments(json)
                console.log(upcomingAppointments[0])
            }
        }
        fetchUpcomingAppointments()
    }, [])
    

    return (
        <div className="UpcomingAppointments">
            <h2>Your Upcoming Appointments</h2>
            <div>
                {upcomingAppointments && upcomingAppointments.map((upcomingAppointment) => (
                    //<p key={doctorRequest._id}>{doctorRequest.name}</p>
                    <UpcomingAppointments key={upcomingAppointment._id} upcomingAppointment={upcomingAppointment}/>
                ))}
            </div>
        </div>
    )
}

export default UpcomingAppointment;