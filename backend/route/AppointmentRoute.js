const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getAppointment,
    getAppointments
} = require('../controller/AppointmentController')

router.route('/createAppointment').post(createAppointment)
router.route('/getAppointment/:appointmentDate/:status').get(getAppointment)
router.route('/getAppointments').get(getAppointments)
module.exports = router