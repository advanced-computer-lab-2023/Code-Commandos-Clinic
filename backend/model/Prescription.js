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
  patientName:{
    type: String,
  },
  doctorName:{
    type: String
  },
  status: {
    type: String,
    enum: ['FILLED','UNFILLED'],
    default: 'UNFILLED'
  },
  medicines: [
    {
      name: {
        type: String,
        required: true,
      },
      dosage: {
        type: Number,
        required: true,
      },
    },
  ],

},{ timestamps: true });


const Prescription = mongoose.model('Prescription', PrescriptionSchema);
module.exports = Prescription;