import { Component, useEffect, useState } from "react";
import FamilyMembersDetails from '../components/FamilyMembersDetails';

const RegisteredFamilyMembers = () =>{
    const [registeredFamilyMembers, setRegisteredFamilyMembers] = useState(null)

    useEffect(() => {
        const fetchRegisteredFamilyMembers = async () => {
            const response = await fetch('api/familyMember/getFamilyMembers/:patientId')
            const json = await response.json()

            if(response.ok){
                setRegisteredFamilyMembers(json)
            }
        }

        fetchRegisteredFamilyMembers()
    }, [])
    return(
        <div className="registeredFamilyMembers">
            <h2>Registered  Family Members:</h2>
            <div>
                {registeredFamilyMembers && registeredFamilyMembers.map((registeredFamilyMember)=>(
                    <FamilyMembersDetails key={registeredFamilyMember._id}  registeredFamilyMember={registeredFamilyMember}/>
                ))}
            </div>
        </div>
    )
}

export default RegisteredFamilyMembers