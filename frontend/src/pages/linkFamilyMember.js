import React, { useState, useEffect } from 'react';

function LinkFamilyMember(){
    const [email,setEmail] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [nationalId,setNationalId] = useState(0)
    const [relation,setRelation] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const familymember ={
                email: email,
                phoneNumber: phoneNumber,
                nationalId:nationalId,
                relation: relation
            }
            console.log("Family Member Payload:", familymember); // Log the payload
            const response = await fetch('/api/familyMember/linkFamilyMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(familymember),
            })
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                alert("Linked successfully")
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert(error.message);
        }
    };


    return(
        <div className="container mt-5">
            <h2 className="mb-4">Link a Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-select"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                       Phone number
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nationalID" className="form-label">
                        National ID
                    </label>
                    <input
                        required={true}
                        type="number"
                        className="form-control"
                        id="nationalId"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                <label>Relation:</label>
                <div className="form-check">
                    <input
                        required={true}
                        type="radio"
                        className="form-check-input"
                        id="WIFE"
                        name="relation"
                        onChange={(e) => setRelation(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="WIFE">
                        Wife
                    </label>
                </div>

                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="HUSBAND"
                        name="relation"
                        onChange={(e) => setRelation(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="HUSBAND">
                        Husband
                    </label>
                </div>

                <div className="form-check">
                    <input
                        type="radio"
                        className="form-check-input"
                        id="CHILDREN"
                        name="relation"
                        onChange={(e) => setRelation(e.target.id)}
                    />
                    <label className="form-check-label" htmlFor="CHILDREN">
                        Children
                    </label>
                </div>
             </div>
             <button type="submit" className="btn btn-primary">Link</button>
            </form>
        </div>
    )
}
export default LinkFamilyMember;