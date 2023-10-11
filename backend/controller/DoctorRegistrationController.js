const DoctorModel = require('../model/Doctor')
const DoctorRegistrationModel = require('../model/DoctorRegistration')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

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

//ziad: requirement 10 (sprint 2) NOT TESTED
//accept or reject the request of a doctor to join the platform
const acceptDoctorRequest = asyncHandler(async (req, res) => {

    try {
        const { id } = req.body
        const DoctorRequest = await DoctorRegistrationModel.findById(id)
        if(!DoctorRequest){
            res.status(404)
            throw new Error('Doctor Request not found')
        }
        DoctorRequest.status = "ACCEPTED"
        await DoctorRequest.save()
        const Doctor = await DoctorModel.create({
                username:DoctorRequest.username,
                name:DoctorRequest.name,
                email:DoctorRequest.email,
                password:DoctorRequest.password,
                dateOfBirth:DoctorRequest.dateOfBirth,
                hourlyRate:DoctorRequest.hourlyRate,
                affiliation:DoctorRequest.affiliation,
                educationalBackground:DoctorRequest.educationalBackground,
                speciality:DoctorRequest.speciality,
                sessionPrice:DoctorRequest.sessionPrice
        })
        res.status(200).json(Doctor)
    }
    catch (error){
        res.status(400)
        throw new Error(error)
    }
})

const rejectDoctorRequest = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body
        const DoctorRequest = await DoctorRegistrationModel.findById(id)
        if(!DoctorRequest) {
            res.status(400)
            throw new Error('Request not found')
        }
        DoctorRequest.status = "REJECTED"
        await DoctorRequest.save()
        res.status(200).json(DoctorRequest)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = {
    doctorRegistrationRequest,
    getDoctorRequests,
    acceptDoctorRequest,
    rejectDoctorRequest
};