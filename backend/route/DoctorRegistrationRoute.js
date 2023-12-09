const express = require('express');
const router = express.Router();

const {
    doctorRegistrationRequest,
    getDoctorRequests,
    acceptDoctorRequests,
    rejectDoctorRequests,
} = require('../controller/DoctorRegistrationController');

const { protect } = require('../middleware/AuthenticationHandler');
const { checkAdminRole} = require('../middleware/AccessHandler')

router.post('/doctorRegistrationRequest',doctorRegistrationRequest)
router.get('/getDoctorRequests',protect, checkAdminRole, getDoctorRequests)
router.post('/acceptDoctorRequests/:id',protect,checkAdminRole,acceptDoctorRequests)
router.delete('/rejectDoctorRequests/:id',protect,checkAdminRole,rejectDoctorRequests)
module.exports = router