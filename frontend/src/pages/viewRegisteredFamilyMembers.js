import { Component, useEffect, useState } from "react";
import FamilyMembersDetails from '../components/FamilyMembersDetails';

const RegisteredFamilyMembers = () =>{
    const [registeredFamilyMembers, setRegisteredFamilyMembers] = useState(null)

    useEffect(() => {
        const fetchRegisteredFamilyMembers = async () => {
            const response = await fetch('api/familyMember/getFamilyMembers/')
            const json = await response.json()

            if(response.ok){
                setRegisteredFamilyMembers(json)
            }
        }
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
           <h2 className="mb-4"><hr className="lineAround"></hr>Registered  Family Members<hr className="lineAround"></hr></h2> 
            <br/>
            {/* <div> */}
            <div class="row row-cols-1 row-cols-md-3 g-4">
                {registeredFamilyMembers && registeredFamilyMembers.map((registeredFamilyMember)=>(
                    <FamilyMembersDetails key={registeredFamilyMember._id}  registeredFamilyMember={registeredFamilyMember}/>
                ))}
            </div>
        </div>
    )
}

export default RegisteredFamilyMembers