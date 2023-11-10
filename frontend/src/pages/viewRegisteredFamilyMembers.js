import { Component, useEffect, useState } from "react";
import FamilyMembersDetails from '../components/FamilyMembersDetails';

const RegisteredFamilyMembers = () =>{
    const [registeredFamilyMembers, setRegisteredFamilyMembers] = useState(null)

    useEffect(() => {

        fetchRegisteredFamilyMembers()
    }, [])

    const fetchRegisteredFamilyMembers = async () => {
        const response = await fetch('api/familyMember/getFamilyMembers')
        //const json = await response.json()

        if(response.ok){
            setRegisteredFamilyMembers(await response.json())
            console.log(registeredFamilyMembers)
        }
        else{
            alert(await response.text())
        }
    }
    return(
        <div className="registeredFamilyMembers m-5">
            <h2>Registered  Family Members:</h2>
            <br/>
            <div>
                {registeredFamilyMembers && registeredFamilyMembers.map((registeredFamilyMember)=>(
                    <FamilyMembersDetails key={registeredFamilyMember._id}  registeredFamilyMember={registeredFamilyMember}/>
                ))}
            </div>
        </div>
    )
}

export default RegisteredFamilyMembers