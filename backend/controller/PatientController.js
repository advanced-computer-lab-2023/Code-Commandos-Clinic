const DoctorPatient = require('../model/DoctorPatient.js');
const HealthRecord = require ('../model/HealthRecord.js');
const PatientModel = require('../model/Patient')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')


//requirement-33 Nour
const getPatientsOfADoctor = asyncHandler ( async (req,res) =>{
    try{
        const allPatients= await DoctorPatient.find({ doctor: req.params.doctorId });
        if(allPatients.length===0){
            throw new Error("No Patients found")
        }
        res.status(200).json(allPatients);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

//requirement-25 Nour
const getInfoHealthPatient = asyncHandler ( async (req , res) =>{
    try{
        const HealthRecords = await HealthRecord.find({ patient: req.params.id })
        res.status(200).json(HealthRecords);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

// get all patients
const getPatients = asyncHandler(async (req, res) => {
  try {
    const Patients = await PatientModel.find({}).sort({createdAt: -1})
  }
  catch (error){
    res.status(400)
    throw new Error(error.message)
  }
  res.status(200).json(Patients)
})

// get a single patient
const getPatient = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Patient not found')
  }
  try{
    const patient = await PatientModel.findById(id)
    if (!patient) {
      res.status(400)
      throw new Error('Patient not found')
    }
    res.status(200).json(patient)
  } catch (error){
    res.status(400)
    throw new Error(error.message)
  }

})

// create a new patient
const createPatient = asyncHandler(async (req, res) => {
  const patientBody = req.body
  try {
    const patient = await PatientModel.create(patientBody)
    res.status(200).json(patient)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

// delete a patient
const deletePatient = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Patient not found')
  }
  try{
    const patient = await PatientModel.findOneAndDelete({_id: id})
    if(!patient) {
      res.status(400)
      throw new Error('Patient not found')
    }
    res.status(200).json(patient)
  } catch (error){
    res.status(400)
    throw new Error(error.message)
  }
})

// update a patient
const updatePatient = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Patient not found')
  }
  try{
    const patient = await PatientModel.findOneAndUpdate({_id: id}, {...req.body})
    if (!patient) {
      res.status(400)
      throw new Error('Patient not found')
    }
    res.status(200).json(patient)
  } catch (error){
    res.status(400)
    throw new Error(error.message)
  }
})

module.exports = {
    getPatients,
    getPatient,
    createPatient,
    deletePatient,
    updatePatient,
    getPatientsOfADoctor,
    getInfoHealthPatient
}