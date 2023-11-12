const express = require('express');
const router = express.Router()
const multer=require('multer')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const {
    createHealthRecord,
    getHealthRecordsPatient,
    getHealthRecordPatientsOfDoctor,
    addHealthRecordByDoctor
    
} = require('../controller/HealthRecordController')

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole, checkDoctorRole} = require("../middleware/AccessHandler");


router.post('/createHealthRecord',createHealthRecord)
router.get('/getHealthRecordOfPatient',protect,checkPatientRole,getHealthRecordsPatient)
router.get('/getHealthRecordOfPatients',protect,checkDoctorRole,getHealthRecordPatientsOfDoctor)
router.post('/AddHealthRecord/:patientid',protect,checkDoctorRole,upload.single('file'),addHealthRecordByDoctor)

module.exports = router










