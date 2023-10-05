const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },

    NationalId:{
        type: Number,
        required: true
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
        enum: ['WIFE/HUSBAND','CHILDREN']
    }
},{ timestamps: true });

const FamilyMember = mongoose.model('FamilyMember', FamilyMemberSchema);
module.exports = FamilyMember;