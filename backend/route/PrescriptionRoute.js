const express = require('express')
const {
    getPrescriptionsbyPatient,
    addPrescription,
    getPrescriptionbyId,
    filterbyDate,
    filterbyStatus,
    filterbyDoctor,
    addMedicineToPrescription,
    deleteMedicineFromPrescription,
    updateMedicineDosage,
    getPrescriptionsOfPatient, deletePrescriptionById,
    generatePDF, updateDosageDescription
} = require("../controller/PrescriptionController")
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientDoctorRole, checkPatientRole, checkDoctorRole} = require("../middleware/AccessHandler");
const router = express.Router();

router.get('/getPrescriptionsbyPatient/:username', getPrescriptionsbyPatient)
router.get('/getPrescriptionsOfPatient/:id',protect,checkDoctorRole, getPrescriptionsOfPatient)

router.get('/getPrescriptionbyId/:id', getPrescriptionbyId)

router.post('/addPrescription',protect,checkDoctorRole, addPrescription)
router.delete('/deletePrescriptionById/:id',protect,checkPatientDoctorRole, deletePrescriptionById)

router.get('/filterByDoctor/:doctorId',protect,checkPatientRole, filterbyDoctor)

router.get('/filterByDate/:createdAt', protect,checkPatientRole,filterbyDate)

router.get('/filterbyStatus/:status', protect,checkPatientRole,filterbyStatus)

router.post('/addMedicineToPrescription',addMedicineToPrescription)
router.delete('/deleteMedicineFromPrescription',deleteMedicineFromPrescription)
router.put('/updateMedicineDosage',updateMedicineDosage)
router.put('/updateDosageDescription',updateDosageDescription)

router.get('/generatePdf/:id', generatePDF);

module.exports = router

