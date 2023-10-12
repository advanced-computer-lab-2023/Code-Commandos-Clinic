const FamilyMembersDetails =({registeredFamilyMember}) =>{
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{registeredFamilyMember.name}</h5>
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
                <p className="card-text">
                    Patient ID: {registeredFamilyMember.patient}
                </p>
            </div>
        </div>
    );
}

export default FamilyMembersDetails
