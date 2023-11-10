const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const FamilyMemberModel = require("../model/FamilyMember");
const PatientModel=require("../model/Patient");
const User = require("../model/User");
const FamilyMember = require("../model/FamilyMember");

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
    try {
        const familyMembers = await FamilyMember.find({patient: req.user.id})
        res.status(200).json(familyMembers)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

const linkFamilyMember =asyncHandler( async (req,res) => {
  // const { patient, nationalId, relation } = req.body;
  // try {
  //   const patientDetails = await PatientModel.findById(patient);
  //   if (!patientDetails) {
  //     res.status(404).json({ message: "Patient not found" });
  //     return;
  //   }
  //   const nationalIdNumber = Number(nationalId);
  //   const birthDate = new Date(patientDetails.dateOfBirth);
  //   const today = new Date();
  //   const age = parseInt(today.getFullYear() - birthDate.getFullYear());
  //   //
  //   console.log("dateOfBirth:", patientDetails.dateOfBirth);
  //   console.log("today:", today);
  //   //
  //   const familyMember = await FamilyMemberModel.create({
  //     name: patientDetails.name,
  //     nationalId: nationalIdNumber,
  //     age: age ,
  //     gender: patientDetails.gender,
  //     relation,
  //     patient:req.user.id,
  //   });
  //   await familyMember.save()
  //   res.status(200).json(familyMember)
  // } catch (error) {
  //     res.status(400)
  //     throw new Error(error.message)
  // }
    const {email,phoneNumber,nationalId,relation} = req.body
    var patient
    if(email){
        patient = await PatientModel.findOne({email})
    }
    else if(phoneNumber){
        patient = await PatientModel.findOne({mobileNumber:phoneNumber})
    }
    else {
        res.status(400)
        throw new Error("You have to provide either the email or the phone number")
    }
    if(!patient){
        res.status(404)
        throw new Error("No patient found with that email")
    }
    else {
        const today = new Date();
        const birthDate = new Date(patient.dateOfBirth);
        const now = today.getFullYear()
        const old = birthDate.getFullYear()
        const age = parseInt( now - old);
        const member = {
            name:patient.name,
            nationalId:nationalId,
            age:age,
            gender:patient.gender,
            relation:relation,
            patient:req.user.id
        }
        try {
            console.log(member)
            const createdMember = await FamilyMember.create(member)
            return res.status(200).json(createdMember)
        }
        catch (error){
            res.status(400)
            throw new Error(error.message)
        }

    }
})

module.exports={
    addFamilyMember,
    getFamilyMembers,
    linkFamilyMember
}