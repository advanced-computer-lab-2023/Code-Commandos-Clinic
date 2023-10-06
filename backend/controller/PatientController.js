const PatientModel = require('../model/Patient')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const addPatient = asyncHandler(async (req,res) =>{
  const patientBody = req.body
  try {
      const patient = await PatientModel.create(patientBody)
      res.status(200).json(patient)
  }
  catch (error){
      res.status(400)
      throw new Error(error.message)
  }
})  

module.exports = {addPatient}