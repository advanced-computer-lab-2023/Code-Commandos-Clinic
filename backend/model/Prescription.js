const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
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
  medication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medication',
    required: true,
  },
  filled :Boolean ,
  issueDate: Date,
  refillInfo: String,
  diagnosis: String,
  specialInstructions: String,
  allergies: String,
  precautions: String,
  notes: String,

},{ timestamps: true });

const Prescription = mongoose.model('Prescription', PrescriptionSchema);
module.exports = Prescription;