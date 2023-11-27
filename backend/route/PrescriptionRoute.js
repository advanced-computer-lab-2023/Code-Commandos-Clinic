const express = require('express')
const { getPrescriptionsbyPatient, addPrescription, getPrescriptionbyId, filterbyDate, filterbyStatus, filterbyDoctor,
    addMedicineToPrescription, deleteMedicineFromPrescription, updateMedicineDosage
} = require("../controller/PrescriptionController")
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientDoctorRole, checkPatientRole, checkDoctorRole} = require("../middleware/AccessHandler");
const router = express.Router();

router.get('/getPrescriptionsbyPatient',protect,checkPatientRole, getPrescriptionsbyPatient)

router.get('/getPrescriptionbyId/:id', getPrescriptionbyId)

router.post('/addPrescription',protect,checkDoctorRole, addPrescription)

router.get('/filterByDoctor/:doctorId',protect,checkPatientRole, filterbyDoctor)

router.get('/filterByDate/:createdAt', protect,checkPatientRole,filterbyDate)

router.get('/filterbyStatus/:status', protect,checkPatientRole,filterbyStatus)

router.post('/addMedicineToPrescription',addMedicineToPrescription)
router.delete('/deleteMedicineFromPrescription',deleteMedicineFromPrescription)
router.put('/updateMedicineDosage',updateMedicineDosage)
module.exports = router

