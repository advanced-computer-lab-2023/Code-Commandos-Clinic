const mongoose = require('mongoose');

const EmploymentContractSchema = new mongoose.Schema({

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },

monthlySalary: {
    type: Number,
    required: true
},
startDate:{
    type: Date,
    required: true,
},
endDate:{ 
    type: Date,
    required: true,
},
responsibilities:{
    type: String,
    required: true
},
termsAndConditions: {
    type: String,
    required: true    
},
    status: {
        type: String,
        default: 'PENDING',
        enum: ['PENDING','ACCEPTED','REJECTED']
    },
    markup: {
        type: Number,
        required: true
    },
});

const EmploymentContract = mongoose.model('EmploymentContract', EmploymentContractSchema);

module.exports = EmploymentContract;
