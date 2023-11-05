const express = require('express');
const router = express.Router();

const {
    doctorRegistrationRequest,
    getDoctorRequests,
    deleteRequest
} = require('../controller/DoctorRegistrationController')

router.route('/doctorRegistrationRequest').post(doctorRegistrationRequest)
router.route('/getDoctorRequests').get(getDoctorRequests)
router.route('/doctorRegistrationRequestDelete/:id').delete(deleteRequest)
module.exports = router