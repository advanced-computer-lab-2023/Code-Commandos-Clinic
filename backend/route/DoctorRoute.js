const express = require('express');
const DoctorController = require('../controller/DoctorController');
const router = express.Router();




router.get('/:id',DoctorController.getMyPatients);
router.post('/viewPatientDoctors',DoctorController.createDoctorPatients);




module.exports=router;






















