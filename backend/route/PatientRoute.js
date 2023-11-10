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
const {checkPatientRole,checkAdminRole, checkDoctorRole} = require("../middleware/AccessHandler");


router.get('/getPatients',protect, getPatients)
router.get('/getPatient/:id', getPatient)
router.route('/registerPatient').post(createPatient)
router.delete('/deletePatient/:id',protect,checkAdminRole, deletePatient)
router.patch('/updatePatient/:id', updatePatient)

router.get('/getPatientsOfADoctor',protect,checkDoctorRole,getPatientsOfADoctor);
router.get('/getInfoHealthPatient/:id',getInfoHealthPatient);
router.get('/searchByname/:name/:doctorId',searchByName)
module.exports = router