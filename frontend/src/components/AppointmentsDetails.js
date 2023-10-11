const AppointmentsDetails =({filteredAppointment}) =>{
    return(
        <div className="appointment-details" style={{marginLeft: '20px', marginDown: '40px', backgroundColor: '#f1f1f1', borderRadius:'4px'}}> 
        <h3 style={{color: '#1aac83'}}>&nbsp;{filteredAppointment.patient}</h3>
            <p>&nbsp;&nbsp;&nbsp; <strong>Doctor:</strong> {filteredAppointment.doctor}</p> 
            <p>&nbsp;&nbsp;&nbsp; <strong>DoctorName:</strong> {filteredAppointment.doctorName}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>PatientName:</strong> {filteredAppointment.patientName}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>StartTime:</strong> {filteredAppointment.startTime}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>EndTime:</strong> {filteredAppointment.endTime}</p>
            <p>&nbsp;&nbsp;&nbsp; <strong>Status:</strong> {filteredAppointment.status}</p>
        </div>
    )
}

export default AppointmentsDetails