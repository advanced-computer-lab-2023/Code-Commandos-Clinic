const FamilyMembersDetails =({registeredFamilyMember}) =>{
    return (
        
  <div class="col">
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">{registeredFamilyMember.name}</h2>
                <p className="card-text">
                    National ID: {registeredFamilyMember.nationalId}
                </p>
                <p className="card-text">
                    Age: {registeredFamilyMember.age}
                </p>
                <p className="card-text">
                    Gender: {registeredFamilyMember.gender}
                </p>
                <p className="card-text">
                    Relation: {registeredFamilyMember.relation}
                </p>

            </div>
        </div></div>
        
    );
}

export default FamilyMembersDetails
