const express = require('express')
const {
  getPatients, 
  getPatient, 
  createPatient, 
  deletePatient, 
  updatePatient
} = require('../controller/patientController')

const router = express.Router()

// GET all patients
router.get('/', getPatients)

// GET a single patient
router.get('/:id', getPatient)

// create or POST a new patient
router.post('/', createPatient)

// DELETE a patient
router.delete('/:id', deletePatient)

// update or PATCH a patient
router.patch('/:id', updatePatient)

module.exports = router