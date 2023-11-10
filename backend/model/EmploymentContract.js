const mongoose = require('mongoose');

const EmploymentContractSchema = new mongoose.Schema({
  
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
} 
});

const EmploymentContract = mongoose.model('EmploymentContract', EmploymentContractSchema);

module.exports = EmploymentContract;
