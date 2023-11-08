const express = require('express');
const router = express.Router()

const {
    searchByNameAndOrSpeciality,
    createDoctor,
    updateDoctor,
    getDoctors,
    viewDoctor,
    filterBySpecialityAndDate,
    getDoctorsSessionPrice,
    removeDoctor,
    createDoctorPatients,
    getPatientDoctors
} = require('../controller/DoctorController')
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");

router.route('/searchByNameAndOrSpeciality/:name/:speciality',protect,checkPatientRole).get(searchByNameAndOrSpeciality)
router.route('/createDoctor').post(createDoctor)
router.route('/viewDoctor/:id').get(viewDoctor)
router.route('/removeDoctor/:id').delete(removeDoctor)
router.get('/filterBySpecialityAndDate/:speciality/:date',protect,checkPatientRole,filterBySpecialityAndDate)
router.route('/getDoctors').get(getDoctors)
router.route('/updateDoctor').put(updateDoctor)
router.route('/getSessionPrice/:id').get(getDoctorsSessionPrice)
router.post('/createDoctorPatients',createDoctorPatients)
router.get('/getPatientDoctors',protect,checkPatientRole,getPatientDoctors)
module.exports = router