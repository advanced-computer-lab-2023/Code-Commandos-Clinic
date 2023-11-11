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
    },
    healthPackage:{
        healthPackageID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HealthPackage',
            required: false
        },
        status: {
            type: String,
            enum: [ 'SUBSCRIBED', 'CANCELLED' ],
            required: false,
        },
        renewalDate: {
            type: Date,
            required: false
        },
    }
},
{ timestamps: true });

const FamilyMember = mongoose.model('FamilyMember', FamilyMemberSchema);
module.exports = FamilyMember;