const mongoose = require('mongoose');

const DoctorPatientSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    doctorName: {
        type: String,
    },
    patientName: {
        type: String,
    }
},{ timestamps: true })

const DoctorPatient = mongoose.model('DoctorPatient', DoctorPatientSchema);
module.exports = DoctorPatient;
