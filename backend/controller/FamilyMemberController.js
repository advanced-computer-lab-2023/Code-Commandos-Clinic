const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const FamilyMember = require("../model/FamilyMember");

//task 18 and 22
const addFamilyMember = asyncHandler(async(req,res) => {
    const memberBody = req.body
      try{
        const {patientId}= req.params
        const newFamilyMember = await FamilyMember.create(memberBody)
        newFamilyMember.patient=patientId
        await newFamilyMember.save()
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
        res.status(404)
        throw new Error('No registered family members')
    }
    res.status(200).json(familyMembers)
    console.log(familyMembers)
})

module.exports={
    addFamilyMember,
    getFamilyMembers
}