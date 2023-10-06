const DoctorModel = require('../model/Doctor')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const addDoctor = asyncHandler(async (req,res) =>{
  const doctorBody = req.body
  try {
      const doctor = await DoctorModel.create(doctorBody)
      res.status(200).json(doctor)
  }
  catch (error){
      res.status(400)
      throw new Error(error.message)
  }
})

module.exports = {addDoctor}