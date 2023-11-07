const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getUpcomingPatientsOfDoctor,
    getAppointment,
    getAppointmentsByDateAndStatus,
    getAppointments
} = require('../controller/AppointmentController');
const { protect } = require('../middleware/AuthenticationHandler');
const {checkDoctorRole} = require("../middleware/AccessHandler");


router.route('/createAppointment').post(createAppointment)
router.get('/getUpcomingPatientsOfDoctor',protect,checkDoctorRole,getUpcomingPatientsOfDoctor)
router.get('/getAppointment/:patientid/:doctorid',getAppointment)
router.route('/getAppointmentsByDateAndStatus/:appointmentDate/:status').get(getAppointmentsByDateAndStatus)
router.route('/getAppointments').get(getAppointments)
module.exports = router