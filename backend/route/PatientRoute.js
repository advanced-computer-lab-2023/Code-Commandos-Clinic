const express = require('express');
const router = express.Router()

const {protect} = require('../middleware/AuthenticationHandler')
const {
  checkPatientRole,
  checkDoctorRole,
  checkAdminRole
} = require('../middleware/AccessHandler')

const {
  getPatients, 
  getPatient, 
  createPatient, 
  deletePatient, 
  updatePatient,
    getPatientsOfADoctor,
    getInfoHealthPatient,
    searchByName,
    payForSubscription,
    subscribeToPackage
} = require('../controller/PatientController')


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

router.get('/getPatientsOfADoctor/:doctorId',getPatientsOfADoctor);
router.get('/getInfoHealthPatient/:id',getInfoHealthPatient);
router.get('/searchByname/:name/:doctorId',searchByName)

router.get('/payForSubscription/:familyMemberID/:packageID/:paymentMethod', protect, checkPatientRole, payForSubscription)
router.post('/subscribeToPackage/:sessionID',subscribeToPackage)
module.exports = router
