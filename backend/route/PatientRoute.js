const express = require('express');
const router = express.Router()



const {
  getPatients,
  getPatient,
  createPatient,
  deletePatient,
  updatePatient,
<<<<<<< HEAD
  getPatientsOfADoctor,
  getInfoHealthPatient,
  searchByName,
    payForSubscription,
    subscribeToPackage
=======
    getPatientsOfADoctor,
    getInfoHealthPatient,
    searchByName,
    getAmount
>>>>>>> akram
} = require('../controller/PatientController')
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole,checkAdminRole, checkDoctorRole} = require("../middleware/AccessHandler");

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");

router.get('/getPatients',protect, getPatients)
router.get('/getPatient/:id', getPatient)
router.post('/registerPatient',createPatient)
router.delete('/deletePatient/:id',protect,checkAdminRole, deletePatient)
router.patch('/updatePatient/:id', updatePatient)
<<<<<<< HEAD
router.get('/getPatientsOfADoctor',protect,checkDoctorRole,getPatientsOfADoctor);
=======

// req 67 (Akram)
router.get('/getAmount',protect,checkPatientRole, getAmount)

router.get('/getPatientsOfADoctor/:doctorId',getPatientsOfADoctor);

>>>>>>> akram
router.get('/getInfoHealthPatient/:id',getInfoHealthPatient);

router.get('/searchByname/:name/:doctorId',searchByName)
<<<<<<< HEAD
router.get('/payForSubscription/:familyMemberID/:packageID/:paymentMethod', protect, checkPatientRole, payForSubscription)
router.post('/subscribeToPackage/:sessionID',subscribeToPackage)
=======
>>>>>>> akram

module.exports = router
