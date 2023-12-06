const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    },
    familyMember:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FamilyMember',
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
    },
    familyMemberName: {
        type: String,
        default: "NONE"
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['RESERVED', 'COMPLETED', 'PENDING','FREE','REJECTED'],
        default: 'FREE'
    },
    type: {
        type: String,
        enum: ['NORMAL', 'FOLLOWUP'],
        default: 'NORMAL'
    }
},{ timestamps: true })

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
