const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getUpcomingPatientsOfDoctor,
    getAppointment,
    getAppointmentsByDateAndStatus,
    getAppointments
} = require('../controller/AppointmentController')

router.route('/createAppointment').post(createAppointment)
router.get('/getUpcomingPatientsOfDoctor/:doctorid',getUpcomingPatientsOfDoctor)
router.get('/getAppointment/:patientid/:doctorid',getAppointment)
router.route('/getAppointmentsByDateAndStatus/:appointmentDate/:status').get(getAppointmentsByDateAndStatus)
router.route('/getAppointments').get(getAppointments)
module.exports = router