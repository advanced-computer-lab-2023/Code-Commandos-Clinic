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


module.exports = {
    doctorRegistrationRequest,
    getDoctorRequests,
    deleteRequest
};