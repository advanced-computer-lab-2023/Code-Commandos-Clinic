const mongoose = require('mongoose');

//3 types of packages: silver, gold, platinum

const HealthPackageSchema = mongoose.Schema({
    packageType: {
        type: String,
        required: true,
        enum: ['Silver', 'Gold', 'Platinum']
    },

},{ timestamps: true })

const HealthPackage = mongoose.model('HealthPackage', HealthPackageSchema);
module.exports = HealthPackage;