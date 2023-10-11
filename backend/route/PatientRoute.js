const express = require('express')
const {
  getPatients, 
  getPatient, 
  createPatient, 
  deletePatient, 
  updatePatient
} = require('../controller/PatientController')

const router = express.Router()

// GET all patients
router.get('/getPatients', getPatients)

// GET a single patient
router.get('/getPatient/:id', getPatient)

// patient registration route
router.route('/registerPatient').post(createPatient)

// DELETE a patient
router.delete('/deletePatient/:id', deletePatient)

// update or PATCH a patient
router.patch('/updatePatient/:id', updatePatient)

module.exports = router