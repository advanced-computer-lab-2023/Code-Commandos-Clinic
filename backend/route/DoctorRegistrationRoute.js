const express = require('express');
const router = express.Router();

const {
    doctorRegistrationRequest,
    getDoctorRequests,
    acceptDoctorRequests,
    rejectDoctorRequests,
} = require('../controller/DoctorRegistrationController');

//const { protect } = require('../middleware/AuthenticationHandler');
//const { checkAdminRole} = require('../middleware/AccessHandler')

router.post('/doctorRegistrationRequest',doctorRegistrationRequest)
router.get('/getDoctorRequests',getDoctorRequests)
router.post('/acceptDoctorRequests/:id',acceptDoctorRequests)
router.delete('/rejectDoctorRequests/:id',rejectDoctorRequests)
module.exports = router