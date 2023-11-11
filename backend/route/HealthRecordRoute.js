const express = require('express');
const router = express.Router()

const {
    createHealthRecord
} = require('../controller/HealthRecordController')

//create health record
router.post('/createHealthRecord',createHealthRecord)

module.exports = router










