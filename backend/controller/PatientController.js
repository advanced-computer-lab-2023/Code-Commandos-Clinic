const DoctorPatientModel = require('../model/DoctorPatient.js');
const HealthRecord = require ('../model/HealthRecord.js');
const PatientModel = require('../model/Patient')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')


//requirement-33 Nour
const getPatientsOfADoctor = asyncHandler ( async (req,res) =>{
    try{
        const allPatients= await DoctorPatientModel.find({ doctor: req.user.id });
        if(allPatients.length===0){
            throw new Error("No Patients found")
        }
        let _allPatients = []
        for(const patient of allPatients){
          _allPatients.push(await PatientModel.findOne({_id: patient.patient}))
        }
        res.status(200).json(_allPatients);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})

//requirement-25 Nour
const getInfoHealthPatient = asyncHandler ( async (req , res) =>{
    try{
        const HealthRecords = await HealthRecord.findOne({ patient: req.params.id })
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
    res.status(200).json(Patients)
  }
  catch (error){
    res.status(400)
    throw new Error(error.message)
  }
  
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

//requirement 34 Nour
//search for a patient by name in the list of patients of a specific doctor
const searchByName = asyncHandler( async (req,res) =>{
  let query = {};
  const {name,doctorId} = req.params
  if(name !== "none"){
    query = {
      $and:[
          {patientName: {$regex: new RegExp(name , 'i')}},
          {doctor:doctorId}
      ]
    };
  }
  else{
    res.status(400);
    throw new Error('Please enter a name')
  }
  try {
    const patients = await DoctorPatientModel.find(query)
    if(patients.length === 0 ){
      res.status(400);
      throw new Error("No patients found!")
    }
    let allPatients = []
        for(const patient of patients){
          allPatients.push(await PatientModel.findOne({_id: patient.patient}))
        }
    res.status(200).json(allPatients)
  }
  catch (err){
    res.status(400)
    throw new Error(err.message)
  }

})



module.exports = {
    getPatients,
    getPatient,
    createPatient,
    deletePatient,
    updatePatient,
    getPatientsOfADoctor,
    getInfoHealthPatient,
    searchByName,
}
