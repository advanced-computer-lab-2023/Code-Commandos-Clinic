const express = require('express');
const router = express.Router();

const {
    getPatients,
    getInfoHealthPatient
} = require('../controller/PatientController.js')


router.get('/getPatients/:doctorId',getPatients);
router.get('/getInfoHealthPatient/:id',getInfoHealthPatient);

module.exports=router;