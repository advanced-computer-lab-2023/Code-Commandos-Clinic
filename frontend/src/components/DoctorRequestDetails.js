const DoctorRequestDetails = ({doctorRequest}) => {
    return (       
        <div className="doctor-request-details" style={{marginLeft: '20px', marginDown: '40px', backgroundColor: '#f1f1f1', borderRadius:'4px'}}> 
            <h3 style={{color: '#1aac83'}}>&nbsp;{doctorRequest.name}</h3>
            <p>&nbsp;&nbsp;&nbsp; <strong>Username:</strong> {doctorRequest.username}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>E-mail:</strong> {doctorRequest.email}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>Password:</strong> {doctorRequest.password}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>Date of Birth:</strong> {doctorRequest.dateOfBirth}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>Hourly Rate:</strong> {doctorRequest.hourlyRate}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>Affiliation:</strong> {doctorRequest.affiliation}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>Educational Background:</strong> {doctorRequest.educationalBackground}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>Speciality:</strong> {doctorRequest.speciality}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>Request Status:</strong> {doctorRequest.status}</p>
            <p>&nbsp;&nbsp;&nbsp; {doctorRequest.createdAt}</p>
            &nbsp;&nbsp;&nbsp;<button>Accept</button> <button>Reject</button>
        </div>
    )
}

export default DoctorRequestDetails