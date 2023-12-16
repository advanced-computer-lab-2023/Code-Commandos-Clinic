const mongoose = require('mongoose');

const VideoCallSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    patientName: {
        type: String,
    },
    doctorName: {
        type: String,
    },
    patientSocketID: {
        type: String,
    },
    doctorSocketID: {
        type: String,
    },
    join_url: {
        type: String,
    }
},{ timestamps: true });

const VideoCall = mongoose.model('VideoCall', VideoCallSchema);
module.exports = VideoCall;
