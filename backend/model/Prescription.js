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
  status: {
    type: String,
    enum: ["FILLED,UNFILLED"],
    default: "UNFILLED"
  }

},{ timestamps: true });

const Prescription = mongoose.model('Prescription', PrescriptionSchema);
module.exports = Prescription;