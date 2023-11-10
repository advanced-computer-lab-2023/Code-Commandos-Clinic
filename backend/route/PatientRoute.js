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
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole,checkAdminRole} = require("../middleware/AccessHandler");


// GET all patients
router.get('/getPatients',protect,checkAdminRole, getPatients)

// GET a single patient
router.get('/getPatient/:id', getPatient)

// patient registration route
router.route('/registerPatient').post(createPatient)

// DELETE a patient
router.delete('/deletePatient/:id',protect,checkAdminRole, deletePatient)

// update or PATCH a patient
router.patch('/updatePatient/:id', updatePatient)

router.get('/getPatientsOfADoctor/:doctorId',getPatientsOfADoctor);
router.get('/getInfoHealthPatient/:id',getInfoHealthPatient);
router.get('/searchByname/:name/:doctorId',searchByName)
module.exports = router
