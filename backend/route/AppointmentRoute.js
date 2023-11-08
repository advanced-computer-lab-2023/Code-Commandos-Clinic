const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getUpcomingPatientsOfDoctor,
    getAppointment,
    getAppointmentsByDateAndStatus,
    getAppointments,
    viewAvailableAppointmentsOfDoctor,
    reserveAppointment,
    upcomingPastAppointmentsOfDoctor,
    upcomingPastAppointmentsOfPatient,
    filterAppointmentsByDateOrStatus

} = require('../controller/AppointmentController')
const {protect} = require("../middleware/AuthenticationHandler");
const {checkDoctorRole, checkPatientRole, checkPatientDoctorRole} = require("../middleware/AccessHandler");

router.post('/createAppointment',protect,checkDoctorRole,createAppointment)
router.get('/getUpcomingPatientsOfDoctor/:doctorid',getUpcomingPatientsOfDoctor)
router.get('/getAppointment/:patientid/:doctorid',getAppointment)
router.route('/getAppointmentsByDateAndStatus/:appointmentDate/:status').get(getAppointmentsByDateAndStatus)
router.route('/getAppointments').get(getAppointments)
router.get('/viewAvailableAppointmentsOfDoctor/:doctorId',protect,checkPatientRole,viewAvailableAppointmentsOfDoctor)
router.put('/reserveAppointment',protect,checkPatientRole,reserveAppointment)
router.get('/upcomingPastAppointmentsOfDoctor',protect,checkDoctorRole,upcomingPastAppointmentsOfDoctor)
router.get('/upcomingPastAppointmentsOfPatient',protect,checkPatientRole,upcomingPastAppointmentsOfPatient)
router.get('/filterAppointmentsByDateOrStatus/:date/:status',protect,checkPatientDoctorRole,filterAppointmentsByDateOrStatus)

module.exports = router