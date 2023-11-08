const express = require('express');
const router = express.Router()

const {protect} = require('../middleware/AuthenticationHandler')
const {
  checkPatientRole,
  checkDoctorRole,
  checkAdminRole
} = require('../middleware/AccessHandler')

const {
    searchByNameAndOrSpeciality,
    createDoctor,
    updateDoctor,
    getDoctors,
    viewDoctor,
    filterBySpecialityAndDate,
    getDoctorsSessionPrice,
    removeDoctor,
    createDoctorPatients
} = require('../controller/DoctorController')

router.route('/searchByNameAndOrSpeciality/:name/:speciality').get(searchByNameAndOrSpeciality)
router.route('/createDoctor').post(/*protect, checkAdminRole,*/ createDoctor)
router.route('/viewDoctor/:id').get(viewDoctor)
router.route('/removeDoctor/:id').delete(removeDoctor)
router.route('/filterBySpecialityAndDate/:speciality/:date').get(filterBySpecialityAndDate)
router.route('/getDoctors').get(getDoctors)
router.route('/updateDoctor').put(protect, checkDoctorRole, updateDoctor)
router.route('/getSessionPrice/').get(protect, checkPatientRole, getDoctorsSessionPrice)
router.post('/createDoctorPatients',createDoctorPatients)

module.exports = router