const express = require('express');
const router = express.Router();

const {
    searchByNameAndOrSpeciality,
    createDoctor,
    viewDoctor,
    filterBySpecialityAndDate,
    removeDoctor
} = require('../controller/DoctorController')

router.route('/searchByNameAndOrSpeciality').get(searchByNameAndOrSpeciality)
router.route('/createDoctor').post(createDoctor)
router.route('/viewDoctor/:id').get(viewDoctor)
router.route('/filterBySpecialityAndDate').get(filterBySpecialityAndDate)
router.route('/removeDoctor/:id').delete(removeDoctor)
module.exports = router