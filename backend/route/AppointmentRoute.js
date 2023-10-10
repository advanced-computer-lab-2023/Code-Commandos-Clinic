const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getUpcomingAppointments,
    getAppointment
} = require('../controller/AppointmentController')

router.route('/createAppointment').post(createAppointment)
router.get('/getUpcomingAppointments/:doctorid',getUpcomingAppointments)
router.get('/getAppointment/:patientid/:doctorid',getAppointment)
module.exports = router