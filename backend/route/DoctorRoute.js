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
    getAmount
} = require('../controller/DoctorController')
const {protect} = require("../middleware/AuthenticationHandler");
const {checkDoctorRole} = require("../middleware/AccessHandler");

router.route('/searchByNameAndOrSpeciality/:name/:speciality').get(searchByNameAndOrSpeciality)
router.route('/createDoctor').post(createDoctor)
router.route('/viewDoctor/:id').get(viewDoctor)
router.route('/removeDoctor/:id').delete(removeDoctor)
router.route('/filterBySpecialityAndDate/:speciality/:date').get(filterBySpecialityAndDate)
router.route('/getDoctors').get(getDoctors)
router.route('/updateDoctor').put(updateDoctor)
router.route('/getSessionPrice/:id').get(getDoctorsSessionPrice)
router.post('/createDoctorPatients',createDoctorPatients)
router.get('/getAmount',protect,checkDoctorRole,getAmount)

module.exports = router