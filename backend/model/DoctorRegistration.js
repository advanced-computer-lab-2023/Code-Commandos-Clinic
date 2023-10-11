const mongoose = require('mongoose');

const DoctorRegistrationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  educationalBackground: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  sessionPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'PENDING',
    enum: ['PENDING','ACCEPTED','REJECTED']
  }
},{ timestamps: true });

const DoctorRegistration = mongoose.model('DoctorRegistration', DoctorRegistrationSchema);
module.exports = DoctorRegistration;