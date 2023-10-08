const express = require('express');
const router = express.Router();

const {
    createAppointment
} = require('../controller/AppointmentController')

router.route('/createAppointment').post(createAppointment)
module.exports = router