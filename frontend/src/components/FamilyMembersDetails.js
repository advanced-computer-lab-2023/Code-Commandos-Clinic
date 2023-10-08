const FamilyMembersDetails =({registeredFamilyMember}) =>{
    return(
        <div className="family-member-details" style={{marginLeft: '20px', marginDown: '40px', backgroundColor: '#f1f1f1', borderRadius:'4px'}}> 
        <h3 style={{color: '#1aac83'}}>&nbsp;{registeredFamilyMember.name}</h3>
            <p>&nbsp;&nbsp;&nbsp; <strong>nationalId:</strong> {registeredFamilyMember.nationalId}</p> 
            <p>&nbsp;&nbsp;&nbsp; <strong>age:</strong> {registeredFamilyMember.age}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>gender:</strong> {registeredFamilyMember.gender}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>relation:</strong> {registeredFamilyMember.relation}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>patientid:</strong> {registeredFamilyMember.patient}</p>
        </div>
    )
}

export default FamilyMembersDetails
