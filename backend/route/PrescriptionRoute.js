const express = require('express')
const {getPrescriptions , addPrescription , getPrescriptionbyId} = require("../controller/PrescriptionController")
const router = express.Router();

//view all prescriptions
router.get('/prescriptionList' , getPrescriptions)

// view by id
router.get('/:id' , getPrescriptionbyId)



// add a prescription
router.post('/addPrescription' , addPrescription)



module.exports = router

