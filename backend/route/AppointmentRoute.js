const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getUpcomingAppointments
} = require('../controller/AppointmentController')

router.route('/createAppointment').post(createAppointment)
router.get('/getUpcomingAppointments/:doctorid',getUpcomingAppointments)
module.exports = router