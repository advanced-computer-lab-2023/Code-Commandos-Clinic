const express = require("express");
const FamilyMember = require("../model/FamilyMember");
const router = express.Router();
const asyncHandler = require('express-async-handler');

// task 18
router.post('/',asyncHandler(async(req,res) => {
    const {name,NationalId,age,gender,relation,patient} = req.body
    
      try{
        const familymember = await FamilyMember.create({name,NationalId,age,gender,relation,patient})
        res.status(200).json(familymember)
      } catch(error){
        throw new Error(error.message)
      }
    }))

router.get()

module.exports=router