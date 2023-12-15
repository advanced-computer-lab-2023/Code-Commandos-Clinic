import { Component, useEffect, useState } from "react";
import FamilyMembersDetails from '../components/FamilyMembersDetails';
import Swal from "sweetalert2"
const RegisteredFamilyMembers = () =>{
    const [registeredFamilyMembers, setRegisteredFamilyMembers] = useState(null)

    useEffect(() => {
        const fetchRegisteredFamilyMembers = async () => {
            const response = await fetch('api/familyMember/getFamilyMembers/')
            if(response.ok){
                const json = await response.json()
                setRegisteredFamilyMembers(json)
            }
            else if(!response.ok){
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: await response.text(),
                });
            }
        }
        fetchRegisteredFamilyMembers()
    }, [])

    const fetchRegisteredFamilyMembers = async () => {
        const response = await fetch('api/familyMember/getFamilyMembers')
        if(response.ok){
            setRegisteredFamilyMembers(await response.json())
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: await response.text(),
            });
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