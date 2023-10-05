const express = require('express');
const router = express.Router();

const {
    searchByNameAndOrSpeciality,
    createDoctor,
    updateDoctor
} = require('../controller/DoctorController')

router.route('/searchByNameAndOrSpeciality').get(searchByNameAndOrSpeciality)
router.route('/createDoctor').post(createDoctor)
//ziad: req 14 update doctor's email, hourlyRate, affiliation
router.route('/updateDoctor').patch(updateDoctor)
module.exports = router