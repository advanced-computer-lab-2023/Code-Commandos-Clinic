const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getUpcomingPatientsOfDoctor,
    getAppointment
} = require('../controller/AppointmentController')

router.route('/createAppointment').post(createAppointment)
router.get('/getUpcomingPatientsOfDoctor/:doctorid',getUpcomingPatientsOfDoctor)
router.get('/getAppointment/:patientid/:doctorid',getAppointment)
module.exports = router