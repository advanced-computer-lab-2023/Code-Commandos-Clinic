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
    enum: [
      'ALLERGISTS/IMMUNOLOGISTS',
      'ANESTHESIOLOGISTS',
      'CARDIOLOGISTS',
      'COLON AND RECTAL SURGEONS',
      'CRITICAL CARE MEDICINE SPECIALISTS',
      'DERMATOLOGISTS',
      'ENDOCRINOLOGISTS',
      'EMERGENCY MEDICINE SPECIALISTS',
      'FAMILY PHYSICIANS',
      'GASTROENTEROLOGISTS',
      'GERIATRIC MEDICINE SPECIALISTS',
      'HEMATOLOGISTS',
      'HOSPICE AND PALLIATIVE MEDICINE SPECIALISTS',
      'INFECTIOUS DISEASE SPECIALISTS',
      'INTERNISTS',
      'MEDICAL GENETICISTS',
      'NEPHROLOGISTS',
      'NEUROLOGISTS',
      'OBSTETRICIANS AND GYNECOLOGISTS',
      'ONCOLOGISTS',
      'OPHTHALMOLOGISTS',
      'OSTEOPATHS',
      'OTOLARYNGOLOGISTS',
      'PATHOLOGISTS',
      'PEDIATRICIANS',
      'PHYSIATRISTS',
      'PLASTIC SURGEONS',
      'PODIATRISTS',
      'PREVENTIVE MEDICINE SPECIALISTS',
      'PSYCHIATRISTS',
      'PULMONOLOGISTS',
      'RADIOLOGISTS',
      'RHEUMATOLOGISTS',
      'SLEEP MEDICINE SPECIALISTS',
      'SPORTS MEDICINE SPECIALISTS',
      'GENERAL SURGEONS',
      'UROLOGISTS',
      'DENTIST'
    ],
  },
  status: {
    type: String,
    default: 'PENDING',
    enum: ['PENDING','ACCEPTED','REJECTED']
  },
  medicalID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  },
  medicalLicenses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  },
  medicalDegree: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  }
},{ timestamps: true });

const DoctorRegistration = mongoose.model('DoctorRegistration', DoctorRegistrationSchema);
module.exports = DoctorRegistration;