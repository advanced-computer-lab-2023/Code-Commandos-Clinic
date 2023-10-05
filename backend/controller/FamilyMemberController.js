
const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const FamilyMember = require("../model/FamilyMember");

//task 18

const AddFamilyMember = asyncHandler(async(req,res) => {
    const {name,NationalId,age,gender,relation,patient} = req.body
    
      try{
        const familymember = await FamilyMember.create({name,NationalId,age,gender,relation,patient})
        res.status(200).json(familymember)
      } catch(error){
        throw new Error(error.message)
      }
})


const getFamilyMembers =  asyncHandler(async(req,res) => {
    const {idofpatient}= req.params
    const familymember = await FamilyMember.find({patient:idofpatient})

    if(!familymember){
        return res.status(404).json({error:'No family members'})
    }
    res.status(200).json(familymember)
})

module.exports={
    AddFamilyMember,
    getFamilyMembers
}