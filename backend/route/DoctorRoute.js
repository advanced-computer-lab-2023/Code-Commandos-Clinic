const express = require('express');
const router = express.Router();

const {
    searchByNameAndOrSpeciality,
    createDoctor
} = require('../controller/DoctorController')

router.route('/searchByNameAndOrSpeciality').get(searchByNameAndOrSpeciality)
router.route('/createDoctor').post(createDoctor)
module.exports = router