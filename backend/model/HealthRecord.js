const mongoose = require('mongoose');




const HealthRecordSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    AllergicHistory: {
        type: String,
        enum: [ 'NONE',
            'POLLEN',
            'DUST',
            'PET',
            'FOOD',
            'MEDICATION',
            'OTHER'],
        required: true
    },
    MainComplaint: {
        type: String,
        enum: [ 'FEVER',
            'COUGH',
            'HEADACHE',
            'ABDOMINAL_PAIN',
            'FATIGUE',
            'OTHER'],
        required: true
    },
    BloodType: {
        type: String,
        enum: [ ' A_POSITIVE',
            'A_NEGATIVE',
            'B_POSITIVE',
            'B_NEGATIVE',
            'AB_POSITIVE',
            'AB_NEGATIVE',
            'O_POSITIVE',
            'O_NEGATIVE'
        ]
    }
},{ timestamps: true })

const HealthRecord = mongoose.model('HealthRecord', HealthRecordSchema);
module.exports = HealthRecord;



















