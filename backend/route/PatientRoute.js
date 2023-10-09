const express = require('express');
const router = express.Router()


const {
  getPatients, 
  getPatient, 
  createPatient, 
  deletePatient, 
  updatePatient,
    getPatientsOfADoctor,
    getInfoHealthPatient,
    searchByName
} = require('../controller/PatientController')


// GET all patients
router.get('/', getPatients)

// GET a single patient
router.get('/:id', getPatient)

// create or POST a new patient
router.post('/', createPatient)

// patient registration route
router.route('/registerPatient').post(createPatient)

// DELETE a patient
router.delete('/:id', deletePatient)

// update or PATCH a patient
router.patch('/:id', updatePatient)

router.get('/getPatientsOfADoctor/:doctorId',getPatientsOfADoctor);
router.get('/getInfoHealthPatient/:id',getInfoHealthPatient);
router.get('/searchByname/:name/:doctorId',searchByName)

module.exports = router
