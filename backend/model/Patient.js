const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    required: true,
    enum: ['MALE','FEMALE']
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  emergencyContact: {
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
  }
},{ timestamps: true });

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;