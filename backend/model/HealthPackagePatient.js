const mongoose = require('mongoose');

//3 types of packages: silver, gold, platinum

const HealthPackagePatientSchema = mongoose.Schema({
    patientID: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Patient',
         required: true
    },
    healthPackageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthPackage',
        required: true
   }
},{ timestamps: true })

const HealthPackagePatient = mongoose.model('HealthPackagePatient', HealthPackagePatientSchema);
module.exports = HealthPackagePatient;