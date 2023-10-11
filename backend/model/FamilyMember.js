const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
      },
    nationalId:{
        type: Number,
        required: true,
        unique:true
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['MALE','FEMALE']
      },
    relation:{
        type: String,
        required: true,
        enum: ['WIFE','HUSBAND','CHILDREN']
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    }
},
{ timestamps: true });

const FamilyMember = mongoose.model('FamilyMember', FamilyMemberSchema);
module.exports = FamilyMember;