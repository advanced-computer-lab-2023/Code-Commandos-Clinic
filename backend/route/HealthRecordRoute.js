const express = require('express');
const router = express.Router()

const {
    createHealthRecord,
    getHealthRecordsPatient
} = require('../controller/HealthRecordController')

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");

//create health record
router.post('/createHealthRecord',createHealthRecord)
router.get('/getHealthRecordOfPatient',protect,checkPatientRole,getHealthRecordsPatient)

module.exports = router










