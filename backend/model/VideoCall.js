const mongoose = require('mongoose');

const VideoCallSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
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
},{ timestamps: true });

const VideoCall = mongoose.model('VideoCall', VideoCallSchema);
module.exports = VideoCall;
