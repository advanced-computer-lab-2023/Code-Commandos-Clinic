const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getUpcomingPatientsOfDoctor,
    getAppointment,
    getAppointmentsByDateAndStatus,
    getAppointments
} = require('../controller/AppointmentController')

const {
    checkPatientRole,
    checkDoctorRole,
    checkAdminRole
  } = require('../middleware/AccessHandler')

  const {protect} = require('../middleware/AuthenticationHandler')

router.route('/createAppointment').post(createAppointment)
router.get('/getUpcomingPatientsOfDoctor/:doctorid',getUpcomingPatientsOfDoctor)
router.get('/getAppointment/:patientid/:doctorid',getAppointment)
router.get('/getAppointmentsByDateAndStatus/:appointmentDate/:status',protect, checkPatientRole ||checkDoctorRole , getAppointmentsByDateAndStatus)
router.route('/getAppointments').get(getAppointments)
module.exports = router