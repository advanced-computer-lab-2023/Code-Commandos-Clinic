const express = require('express')
const { getPrescriptionsbyPatient, addPrescription, getPrescriptionbyId, filterbyDate, filterbyStatus, filterbyDoctor } = require("../controller/PrescriptionController")
const router = express.Router();

//view all prescriptions
router.get('/getPrescriptionsbyPatient/:patientId', getPrescriptionsbyPatient)

// view by id
router.get('/getPrescriptionbyId/:id', getPrescriptionbyId)

// add a prescription
router.post('/addPrescription', addPrescription)

router.get('/filterByDoctor/:doctorId', filterbyDoctor)

router.get('/filterByDate/:createdAt', filterbyDate)

router.get('/filterbyStatus/:status', filterbyStatus)

module.exports = router

