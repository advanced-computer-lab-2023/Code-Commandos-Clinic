const express = require('express');
const router = express.Router();

const {
    searchByNameAndOrSpeciality,
    createDoctor,
    updateDoctor,
    getDoctors,
    viewDoctor,
    filterBySpecialityAndDate,
    getDoctorsSessionPrice,
    removeDoctor
} = require('../controller/DoctorController')

router.route('/searchByNameAndOrSpeciality/:name/:speciality').get(searchByNameAndOrSpeciality)
router.route('/createDoctor').post(createDoctor)
router.route('/viewDoctor/:id').get(viewDoctor)
router.route('/removeDoctor/:id').delete(removeDoctor)
router.route('/filterBySpecialityAndDate/:speciality/:date').get(filterBySpecialityAndDate)
router.route('/getDoctors').get(getDoctors)
router.route('/updateDoctor/:id').put(updateDoctor)
router.route('/getSessionPrice/:id').get(getDoctorsSessionPrice)

module.exports = router