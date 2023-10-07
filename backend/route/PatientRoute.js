const express = require('express');
const PatientController = require('../controller/PatientController.js')
const router = express.Router();



router.get('/:id',PatientController.getPatients);
router.get('/patients/:id',PatientController.selectPatient);







module.exports=router;