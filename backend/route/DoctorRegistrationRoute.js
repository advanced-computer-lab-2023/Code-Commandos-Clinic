const express = require('express');
const router = express.Router();

const {
    doctorRegistrationRequest,
    getDoctorRequests,
    acceptDoctorRequest,
    rejectDoctorRequest
} = require('../controller/DoctorRegistrationController')

router.route('/doctorRegistrationRequest').post(doctorRegistrationRequest)
router.route('/getDoctorRequests').get(getDoctorRequests)
router.route('/acceptDoctorRequest').post(acceptDoctorRequest)
router.route('/rejectDoctorRequest').put(rejectDoctorRequest)
module.exports = router