const DoctorRegistrationModel = require('../model/DoctorRegistration')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const DoctorModel = require('../model/Doctor')
const UserModel = require('../model/User')
//ziad: requirement 3
//submit a request to register as a doctor using username, name, email, password, date of birth, hourly rate, affiliation, educational background
const doctorRegistrationRequest = asyncHandler(async (req,res) =>{
    const doctorBody = req.body
    try {
        const doctor = await DoctorRegistrationModel.create(doctorBody)
        res.status(200).json(doctor)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

//ziad: requirement 9
//view all of the information uploaded by a doctor to apply to join the platform
const getDoctorRequests = asyncHandler(async (req, res) => {
    try {
        const DoctorRequests = await DoctorRegistrationModel.find({}).sort({createdAt: -1})
        res.status(200).json(DoctorRequests)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})



const acceptDoctorRequests = asyncHandler(async (req, res) => {
    const {id}=req.params
    try {
        const Doctor = await DoctorRegistrationModel.findByIdAndRemove(id)
        const user = await UserModel.create({username: Doctor.username,password: Doctor.password,role:'DOCTOR'})
        const addDoctor =await DoctorModel.create({username: Doctor.username,name: Doctor.name,email:  Doctor.email,password: Doctor.password,dateOfBirth:  Doctor.dateOfBirth,hourlyRate: Doctor.hourlyRate,affiliation: Doctor.affiliation,educationalBackground: Doctor.educationalBackground,speciality: Doctor.speciality,sessionPrice: Doctor.sessionPrice})
        res.status(200).json(addDoctor)
        
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
    
    
})

const rejectDoctorRequests = asyncHandler(async (req, res) => {
    const {id}=req.params
    try {
        const Doctor = await DoctorRegistrationModel.findByIdAndRemove(id)
        res.status(200).json(Doctor)
        
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
    
    
})



module.exports = {
    doctorRegistrationRequest,
    getDoctorRequests,
    acceptDoctorRequests,
    rejectDoctorRequests
};