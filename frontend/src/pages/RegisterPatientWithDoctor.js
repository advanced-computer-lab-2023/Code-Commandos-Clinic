import {useState} from "react";

const RegisterPatientWithDoctor = ()=> {
    const [doctorUsername, setDoctorUsername] = useState('');
    const [patientUsername, setPatientUsername] = useState('');

    const handleSubmit= async () => {
        try{
            const response = await fetch('/api/doctor/createDoctorPatients',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({patientUsername,doctorUsername})
            });
            if (response.ok){
                alert('Added successfully')
            }
            else {
                const errorMessage = await response.text();
                alert(errorMessage)
            }
        }
        catch (error){
            console.log(error)
        }
    };


    return (
        <div className="container mt-4">
            <h2 className="mb-4"><hr className="lineAround"></hr>Register a patient with a doctor<hr className="lineAround"></hr></h2>
            
            <form onSubmit={handleSubmit}>
            <div className="box">
                <div className="mb-3">
                    <label htmlFor="doctorUsername" className="form-label">
                        Doctor Username:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="doctorUsername"
                        value={doctorUsername}
                        onChange={(e) => setDoctorUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="patientUsername" className="form-label">
                        Patient Username:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="patientUsername"
                        value={patientUsername}
                        onChange={(e) => setPatientUsername(e.target.value)}
                    />
                    </div>
                </div>
                <button id="button"type="submit" className="btn btn-primary">
                    Create Model
                </button>
            </form>
        </div>
    );
};

export default RegisterPatientWithDoctor