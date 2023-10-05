const express = require('express');
const router = express.Router();

const {
    searchByNameAndOrSpeciality,
    createDoctor,
    viewDoctor,
    filterBySpecialityAndDate
} = require('../controller/DoctorController')

router.route('/searchByNameAndOrSpeciality').get(searchByNameAndOrSpeciality)
router.route('/createDoctor').post(createDoctor)
router.route('/viewDoctor').get(viewDoctor)
router.route('/filterBySpecialityAndDate').get(filterBySpecialityAndDate)
module.exports = router