const express = require('express');
const router = express.Router()

const {
    createHealthRecord,
    getHealthRecordsPatient,
    getHealthRecordPatientsOfDoctor,
    
} = require('../controller/HealthRecordController')
const {upload} = require("../middleware/gridFs");
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");


router.post('/createHealthRecord',createHealthRecord)
router.get('/getHealthRecordOfPatient',protect,checkPatientRole,getHealthRecordsPatient)
router.get('/getHealthRecordOfPatients/:doctorid',getHealthRecordPatientsOfDoctor)

module.exports = router










