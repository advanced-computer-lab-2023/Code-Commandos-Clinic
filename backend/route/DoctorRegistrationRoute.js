const express = require('express');
const router = express.Router();

const {
    doctorRegistrationRequest,
    getDoctorRequests
} = require('../controller/DoctorRegistrationController')

router.route('/doctorRegistrationRequest').post(doctorRegistrationRequest)
router.route('/getDoctorRequests').get(getDoctorRequests)
module.exports = router