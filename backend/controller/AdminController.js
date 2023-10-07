const DoctorModel = require('../model/Doctor')
const PatientModel = require('../model/Patient')
const AdminModel = require('../model/Admin')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

//requirement  7
// add another adminstrator with a set username and password
const addAdmin = asyncHandler(async(req,res) =>
{
        const{username,password}= req.body
     
        //add admin to db
        try{
         const admin =await  AdminModel.create({username,password})
         res.status(200).json(admin)
        } catch(error)
        {
         res.status(400)//.json({error: "cannot add admin"})
         //throw new Error('cannot add admin')
         throw new Error('error.message')
        }
        
})

module.exports={
    addAdmin
}

