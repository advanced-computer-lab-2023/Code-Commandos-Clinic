import {useState} from "react";
import Swal from "sweetalert2"

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
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: "Added successfully",
                });
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: await response.text(),
                });
            }
        }
        catch (error){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
            });
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