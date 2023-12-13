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
  payForSubscription,
  subscribeToPackage,
  getAmount,
  searchPatientsToChat,
} = require('../controller/PatientController')
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole,checkAdminRole, checkDoctorRole} = require("../middleware/AccessHandler");

router.get('/getPatients',protect, getPatients)
router.get('/getPatient/:id', getPatient)
router.post('/registerPatient',createPatient)
router.delete('/deletePatient/:id',protect,checkAdminRole, deletePatient)
router.put('/updatePatient/:id', updatePatient)
router.get('/getPatientsOfADoctor',protect,checkDoctorRole,getPatientsOfADoctor);
router.get('/getAmount',protect,checkPatientRole, getAmount)
router.get('/getInfoHealthPatient/:id',getInfoHealthPatient);
router.get('/searchByName/:name',protect,checkDoctorRole,searchByName)
router.get('/payForSubscription/:familyMemberID/:packageID/:paymentMethod', protect, checkPatientRole, payForSubscription)
router.post('/subscribeToPackage/:sessionID',protect,checkPatientRole,subscribeToPackage)
router.get('/searchPatientsToChat/:name', searchPatientsToChat)

module.exports = router 
