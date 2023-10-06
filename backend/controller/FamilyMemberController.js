const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const FamilyMember = require("../model/FamilyMember");

//task 18
const addFamilyMember = asyncHandler(async(req,res) => {
    const memberBody = req.body
      try{
        const newFamilyMember = await FamilyMember.create(memberBody)
        res.status(200).json(newFamilyMember)
      }
      catch(error){
        res.status(400)
        throw new Error(error.message)
      }
})


const getFamilyMembers =  asyncHandler(async(req,res) => {
    const {patientId}= req.params
    const familyMembers = await FamilyMember.find({patient:patientId})

    if(familyMembers.length == 0){
        return res.status(404)
        throw new Error('No registered family members')
    }
    res.status(200).json(familyMembers)
})

module.exports={
    addFamilyMember,
    getFamilyMembers
}