const Patient = require('../model/Patient')
const mongoose = require('mongoose')

// get all patients
const getPatients = async (req, res) => {
  const Patients = await Patient.find({}).sort({createdAt: -1})

  res.status(200).json(Patients)
}

// get a single patient
const getPatient = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Patient not found')
    //return res.status(404).json({error: 'Patient not found'})
  }

  const patient = await Patient.findById(id)

  if (!patient) {
    throw new Error('Patient not found')
    //return res.status(404).json({error: 'Patient not found'})
  }

  res.status(200).json(patient)
}

// create a new patient
const createPatient = async (req, res) => {
  const {username, name, email, password, dateOfBirth, gender, mobileNumber, emergencyContact} = req.body

  // add to the database
  try {
    const patient = await Patient.create({ username, name, email, password, dateOfBirth, gender, mobileNumber, emergencyContact })
    res.status(200).json(patient)
  } catch (error) {
    throw new Error(error.message)
    //res.status(400).json({ error: error.message })
  }
}//

// delete a patient
const deletePatient = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Patient not found')
    //return res.status(400).json({error: 'Patient not found'})
  }

  const patient = await Patient.findOneAndDelete({_id: id})

  if(!patient) {
    throw new Error('Patient not found')
    //return res.status(400).json({error: 'Patient not found'})
  }

  res.status(200).json(patient)
}

// update a patient
const updatePatient = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Patient not found')
    // res.status(400).json({error: 'Patient not found'})
  }

  const patient = await Patient.findOneAndUpdate({_id: id}, {...req.body})

  if (!patient) {
    throw new Error('Patient not found')
    //return res.status(400).json({error: 'Patient not found'})
  }

  res.status(200).json(patient)
}

module.exports = {
    getPatients,
    getPatient,
    createPatient,
    deletePatient,
    updatePatient
}