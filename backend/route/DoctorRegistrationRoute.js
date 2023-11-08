const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/AuthenticationHandler')
const {
  checkPatientRole,
  checkDoctorRole,
  checkAdminRole
} = require('../middleware/AccessHandler')

const {
    doctorRegistrationRequest,
    getDoctorRequests,
} = require('../controller/DoctorRegistrationController')

router.route('/doctorRegistrationRequest').post(doctorRegistrationRequest)
router.route('/getDoctorRequests').get(protect, checkAdminRole, getDoctorRequests)
module.exports = router