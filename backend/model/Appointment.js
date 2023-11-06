const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
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
        enum: ['RESERVED', 'COMPLETED', 'CANCELLED','FREE'],
        default: 'RESERVED'
    }
},{ timestamps: true })

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
