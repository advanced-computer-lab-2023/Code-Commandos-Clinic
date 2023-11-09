import React, { useState, useEffect } from 'react';

function LinkFamilyMember(){
    const [patients, setPatients] = useState([]);
    const [selectedPatient,setSelectedPatient] = useState('')
    const [selectednationalId, setNationalId] = useState('')
    const [selectedrelation, setRelation] = useState('')

    useEffect(() => {
        fetchPatients();
    }, []);


    const fetchPatients = async () => {
        try {
            const response = await fetch('/api/patient/getPatients'); // Replace with your API endpoint
            if(response.ok){
                const data = await response.json();
                setPatients(data);
            }
            else {
                alert(await response.text())
            }
        } catch (error) {
            alert(error)
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const familymember ={
                patient: selectedPatient,
                nationalId: selectednationalId,
                relation: selectedrelation
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
                alert("Family member linked",data)
            } else {
                alert(await response.text())
            }
        } catch (error) {
            alert('Error linking family member: ', error);
        }
    };


    return(
        <div className="container mt-5">
            <h2 className="mb-4">Link a Patient</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="patient" className="form-label">Patient:</label>
                    <select
                        id="patient"
                        name="patient"
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                        className="form-select"
                        required
                    >
                        <option value="">Select a patient</option>
                        {patients && patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="nationalID" className="form-label">
                       National ID of the wanted patient:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="nationalID"
                        value={selectednationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                <label>Relation:</label>
                <div className="form-check">
                    <input
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