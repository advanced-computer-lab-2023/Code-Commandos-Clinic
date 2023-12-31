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
    filterAppointmentsByDateOrStatus,
    scheduleFollowUp,
    success,
    rescheduleAppointment,
    getUpcomingAppointmentsPatient,
    cancelAppointment,
    updateStatusToPending,
    acceptFollowUp,
    updateStatusToFree
} = require('../controller/AppointmentController')
const {protect} = require("../middleware/AuthenticationHandler");
const {checkDoctorRole, checkPatientRole, checkPatientDoctorRole} = require("../middleware/AccessHandler");


router.post('/createAppointment',protect,checkDoctorRole,createAppointment)
router.get('/getUpcomingPatientsOfDoctor',protect,checkDoctorRole,getUpcomingPatientsOfDoctor)
router.get('/getAppointment/:patientid/:doctorid',getAppointment)
router.get('/getAppointmentsByDateAndStatus/:appointmentDate/:status',protect, checkPatientDoctorRole, getAppointmentsByDateAndStatus)
router.get('/getAppointments',getAppointments)
router.get('/viewAvailableAppointmentsOfDoctor/:doctorId',protect,checkPatientRole,viewAvailableAppointmentsOfDoctor)
router.put('/reserveAppointment/:paymentMethod',protect,checkPatientRole,reserveAppointment)
router.post('/success/:sessionID',protect,checkPatientRole,success)
router.get('/upcomingPastAppointmentsOfDoctor',protect,checkDoctorRole,upcomingPastAppointmentsOfDoctor)
router.get('/upcomingPastAppointmentsOfPatient',protect,checkPatientRole,upcomingPastAppointmentsOfPatient)
router.get('/filterAppointmentsByDateOrStatus/:date/:status',protect,checkPatientDoctorRole,filterAppointmentsByDateOrStatus)
router.get('/getUpcomingAppointmentsPatient/:patientid',getUpcomingAppointmentsPatient)
router.post('/scheduleFollowUp/:patientId',protect,checkDoctorRole,scheduleFollowUp)
router.put('/rescheduleAppointment/:appointmentId',protect,checkPatientDoctorRole,rescheduleAppointment);
router.put('/cancelAppointment/:appointmentID', protect, cancelAppointment)
router.put('/updateStatusToPending/:id/:whichMember',protect,checkPatientRole,updateStatusToPending) // make the request
router.put('/updateStatusToFree/:id',protect,checkDoctorRole,updateStatusToFree) // revoke a request
router.put('/acceptFollowUp/:followUpId',protect,checkDoctorRole,acceptFollowUp)

module.exports = router