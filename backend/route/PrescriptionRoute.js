const express = require('express')
const { getPrescriptionsbyPatient, addPrescription, getPrescriptionbyId, filterbyDate, filterbyStatus, filterbyDoctor } = require("../controller/PrescriptionController")
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientDoctorRole, checkPatientRole} = require("../middleware/AccessHandler");
const router = express.Router();

//view all prescriptions
router.get('/getPrescriptionsbyPatient',protect,checkPatientRole, getPrescriptionsbyPatient)

// view by id
router.get('/getPrescriptionbyId/:id', getPrescriptionbyId)

// add a prescription
router.post('/addPrescription', addPrescription)

router.get('/filterByDoctor/:doctorId',protect,checkPatientRole, filterbyDoctor)

router.get('/filterByDate/:createdAt', protect,checkPatientRole,filterbyDate)

router.get('/filterbyStatus/:status', protect,checkPatientRole,filterbyStatus)

module.exports = router

