const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getAppointment
} = require('../controller/AppointmentController')

router.route('/createAppointment').post(createAppointment)
router.route('/getAppointment/:appointmentDate').get(getAppointment)
module.exports = router