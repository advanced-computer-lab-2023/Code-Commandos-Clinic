const mongoose = require('mongoose');

//3 types of packages: silver, gold, platinum

const HealthPackageSchema = mongoose.Schema({
    // patientID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Patient',
    //     required: true
    // },
    // packageType: {
    //     type: String,
    //     required: true,
    //     enum: ['Silver', 'Gold', 'Platinum']
    // },
    packageName: {
        type: String,
        required: true,
    },
    yearlySubscription: {
        type: Number,
        required: true
    },
    doctorSessionDiscount: {
        type: Number,
        required: true
    },
    medicineDiscount: {
        type: Number,
        required: true
    },
    familyDiscount: {
        type: Number,
        required: true
    }

},{ timestamps: true })

const HealthPackage = mongoose.model('HealthPackage', HealthPackageSchema);
module.exports = HealthPackage;