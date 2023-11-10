const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const FamilyMemberModel = require("../model/FamilyMember");
const PatientModel=require("../model/Patient");
const User = require("../model/User");

//task 18 and 22
const addFamilyMember = asyncHandler(async(req,res) => {
    const memberBody = req.body
      try{
        const patientId= req.user.id
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
    console.log('from controller ',req.user.id)
    const patientId= req.user.id
    const familyMembers = await FamilyMemberModel.find({patient:patientId})

    if(familyMembers.length == 0){
        res.status(404)
        throw new Error('No registered family members')
    }
    res.status(200).json(familyMembers)
    console.log(familyMembers)
})


const linkFamilyMember =asyncHandler( async (req,res) => {
  const { patient, nationalId, relation } = req.body;
  try {
    const patientDetails = await PatientModel.findById(patient);
    if (!patientDetails) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    const nationalIdNumber = Number(nationalId);
    const birthDate = new Date(patientDetails.dateOfBirth);
    const today = new Date();
    const age = parseInt(today.getFullYear() - birthDate.getFullYear()); 
    //
    console.log("dateOfBirth:", patientDetails.dateOfBirth);
    console.log("today:", today);
    //
    const familyMember = await FamilyMemberModel.create({
      name: patientDetails.name,
      nationalId: nationalIdNumber,
      age: age ,
      gender: patientDetails.gender,
      relation,
      patient:req.user.id,
    });
    await familyMember.save()
    res.status(200).json(familyMember)
  } catch (error) {
      res.status(400)
      throw new Error(error.message)
  }
})

module.exports={
    addFamilyMember,
    getFamilyMembers,
    linkFamilyMember
}