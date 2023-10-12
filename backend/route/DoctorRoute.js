const express = require('express');
const router = express.Router();

const {
    searchByNameAndOrSpeciality,
    createDoctor,
    viewDoctor,
    filterBySpecialityAndDate,
    updateDoctor,
    createDoctorPatients
} = require('../controller/DoctorController')


router.route('/searchByNameAndOrSpeciality/:name/:speciality').get(searchByNameAndOrSpeciality)
router.route('/createDoctor').post(createDoctor)

router.route('/viewDoctor/:id').get(viewDoctor)
router.route('/filterBySpecialityAndDate/:speciality/:date').get(filterBySpecialityAndDate)

//ziad: req 14 update doctor's email, hourlyRate, affiliation
router.route('/updateDoctor').put(updateDoctor)
router.post('/createDoctorPatients',createDoctorPatients)

module.exports = router