const express = require('express');
const router = express.Router();

const {
    doctorRegistrationRequest,
    getDoctorRequests,
    deleteRequest
} = require('../controller/DoctorRegistrationController');
const { checkAdminRole } = require('../middleware/AccessHandler');
const { protect } = require('../middleware/AuthenticationHandler');

router.route('/doctorRegistrationRequest').post(doctorRegistrationRequest)
router.get('/getDoctorRequests',protect, checkAdminRole, getDoctorRequests)
router.route('/doctorRegistrationRequestDelete/:id').delete(deleteRequest)
module.exports = router