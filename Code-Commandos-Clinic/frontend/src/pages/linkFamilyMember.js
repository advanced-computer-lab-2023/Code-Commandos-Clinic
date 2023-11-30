import React, { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

function LinkFamilyMember() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [nationalId, setNationalId] = useState(0);
    const [relation, setRelation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const familymember = {
                email: email,
                phoneNumber: phoneNumber,
                nationalId: nationalId,
                relation: relation
            };

            const response = await fetch('/api/familyMember/linkFamilyMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(familymember),
            });

            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Linked successfully',
                    text: data.message, // If there's a specific success message from the server
                });
            } else {
                const errorMessage = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4 text-center red-text">Link a Patient</h2>

            <img
                                                 src={process.env.PUBLIC_URL + `/family2.png`}
                                                 style={{
                                                   maxWidth: '400px',   // Adjust the maximum width as needed
                                                   height: '',
                                                   float: 'right',      // Float the image to the right
                                                   marginRight: '50px'  // Adjust the right margin as needed

                                                 }}
                                               />

            <form onSubmit={handleSubmit}>
                        <div style={{ border: '2px solid red', borderRadius: '8px', padding: '20px', backgroundColor: 'white', width: '800px', marginRight: '100px' }}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

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


        </div>
                <button type="submit" className="btn btn-danger">Link Member</button>

            </form>
        </div>
    )
}
export default LinkFamilyMember;