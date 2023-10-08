const express = require('express');
const router = express.Router();

const {
    searchByNameAndOrSpeciality,
    createDoctor,
    updateDoctor,
    getDoctors
} = require('../controller/DoctorController')

router.route('/searchByNameAndOrSpeciality').get(searchByNameAndOrSpeciality)
router.route('/createDoctor').post(createDoctor)
//ziad: req 14 update doctor's email, hourlyRate, affiliation
router.route('/updateDoctor').put(updateDoctor)
router.route('/:id').put(updateDoctor)
router.route('/getDoctors').get(getDoctors)
module.exports = router