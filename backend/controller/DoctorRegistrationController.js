const DoctorRegistrationModel = require('../model/DoctorRegistration')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const DoctorModel = require('../model/Doctor')
const UserModel = require('../model/User')
const bcrypt = require("bcryptjs");
//ziad: requirement 3
//submit a request to register as a doctor using username, name, email, password, date of birth, hourly rate, affiliation, educational background
const doctorRegistrationRequest = asyncHandler(async (req,res) =>{
    const doctorBody = req.body
    try {
        if (doctorBody.password.search(/[a-z]/) < 0 || doctorBody.password.search(/[A-Z]/) < 0 || doctorBody.password.search(/[0-9]/) < 0) {
            res.status(400)
            throw new Error("Password must contain at least one number, one capital letter and one small letter")
        }
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

const deleteRequest = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400)
      throw new Error('Request not found')
    }
    try{
      const DoctorRequest = await DoctorRegistrationModel.findOneAndDelete({_id: id})
      if(!DoctorRequest) {
        res.status(400)
        throw new Error('Request not found')
      }
      res.status(200).json(DoctorRequest)
    } catch (error){
      res.status(400)
      throw new Error(error.message)
    }
  })


const acceptDoctorRequests = asyncHandler(async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        const request = await DoctorRegistrationModel.findByIdAndDelete(id)
        if (request.password.search(/[a-z]/) < 0 || request.password.search(/[A-Z]/) < 0 || request.password.search(/[0-9]/) < 0) {
            res.status(400)
            throw new Error("Password must contain at least one number, one capital letter and one small letter")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(request.password,salt)
        const user = await UserModel.create({username: request.username,password: hashedPassword,role:'DOCTOR'})
        const addDoctor =await DoctorModel.create({username: request.username,name: request.name,email:  request.email,password: request.password,dateOfBirth:  request.dateOfBirth,hourlyRate: request.hourlyRate,affiliation: request.affiliation,educationalBackground: request.educationalBackground,speciality: request.speciality,sessionPrice: request.sessionPrice})
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
        const request = await DoctorRegistrationModel.findByIdAndRemove(id)
        res.status(200).json(request)
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