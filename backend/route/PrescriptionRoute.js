const express = require('express')
const { getPrescriptionsbyPatient, addPrescription, getPrescriptionbyId, filterbyDate, filterbyFilledOrNot, filterbyDoctor } = require("../controller/PrescriptionController")
const router = express.Router();

//view all prescriptions
router.get('/prescriptionList/:patient', getPrescriptionsbyPatient)

// view by id
router.get('/:id', getPrescriptionbyId)

// add a prescription
router.post('/addPrescription', addPrescription)

router.get('/filterByDoctor', filterbyDoctor)

router.get('/filterByDate', filterbyDate)

router.get('/filterByFilledOrNot', filterbyFilledOrNot)   

module.exports = router

