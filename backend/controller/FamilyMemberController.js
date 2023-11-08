const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const FamilyMember = require("../model/FamilyMember");
const HealthPackage = require("../model/HealthPackage");

//task 18 and 22
const addFamilyMember = asyncHandler(async(req,res) => {
    const memberBody = req.body
      try{
        const {id}= req.user
        const newFamilyMember = await FamilyMember.create(memberBody)
        newFamilyMember.patient=id
        await newFamilyMember.save()
        res.status(200).json(newFamilyMember)
      }
      catch(error){
        res.status(400)
        throw new Error(error.message)
      }
})


const getFamilyMembers =  asyncHandler(async(req,res) => {
    const {id}= req.user
    const familyMembers = await FamilyMember.find({patient:id})

    if(familyMembers.length == 0){
        res.status(404)
        throw new Error('No registered family members')
    }
    res.status(200).json(familyMembers)
    console.log(familyMembers)
})

const getSubscribedPackagesForFamilyMembers =  asyncHandler(async(req,res) => {
  const {id}= req.user
  const familyMembers = await FamilyMember.find({patient:id})
  if(familyMembers.length == 0){
      res.status(404)
      throw new Error('No registered family members')
  }
  for(const familyMember in familyMembers){
    if(familyMember.healthPackage){
      const healthPackage = await HealthPackage.findOne({_id:familyMember.healthPackage.healthPackageID})
      familyMember.healthPackage.healthPackageID = healthPackage
    }
  }
  res.status(200).json(familyMembers)
})

module.exports={
    addFamilyMember,
    getFamilyMembers,
    getSubscribedPackagesForFamilyMembers
}