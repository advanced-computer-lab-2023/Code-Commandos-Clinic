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
    searchByName,
    getAmount
} = require('../controller/PatientController')

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");

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

// req 67 (Akram)
router.get('/getAmount',protect,checkPatientRole, getAmount)

router.get('/getPatientsOfADoctor/:doctorId',getPatientsOfADoctor);

router.get('/getInfoHealthPatient/:id',getInfoHealthPatient);

router.get('/searchByname/:name/:doctorId',searchByName)

module.exports = router
