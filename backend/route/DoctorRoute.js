const express = require('express');


const {
    searchByNameAndOrSpeciality,
    createDoctor,
    viewDoctor,
    filterBySpecialityAndDate,
    updateDoctor,
    getDoctor
} = require('../controller/DoctorController')

const router = express.Router();

router.route('/searchByNameAndOrSpeciality').get(searchByNameAndOrSpeciality)
router.route('/createDoctor').post(createDoctor)

router.route('/viewDoctor/:id').get(viewDoctor)
router.route('/filterBySpecialityAndDate').get(filterBySpecialityAndDate)

//ziad: req 14 update doctor's email, hourlyRate, affiliation
router.route('/updateDoctor').put(updateDoctor)

router.get('/:id',getDoctor)

module.exports = router