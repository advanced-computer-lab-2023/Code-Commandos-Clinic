const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  name: {
   type : String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },

},{ timestamps: true });

const Medication = mongoose.model('Medication', MedicationSchema);
module.exports = Medication;