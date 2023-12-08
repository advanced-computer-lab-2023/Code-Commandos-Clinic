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
    createDoctorPatients,
    getPatientDoctors,
    getAmount,
    searchDoctorsToChat,
} = require('../controller/DoctorController')

router.get('/searchByNameAndOrSpeciality/:name/:speciality',protect,checkPatientRole,searchByNameAndOrSpeciality)
router.route('/createDoctor').post(createDoctor)
router.route('/viewDoctor/:id').get(viewDoctor)
router.delete('/removeDoctor/:id',protect,checkAdminRole,removeDoctor)
router.get('/filterBySpecialityAndDate/:speciality/:date',protect,checkPatientRole,filterBySpecialityAndDate)
router.get('/getDoctors',protect,getDoctors)
router.put('/updateDoctor',protect,checkDoctorRole,updateDoctor)
router.get('/getSessionPrice',protect,checkPatientRole,getDoctorsSessionPrice)
router.post('/createDoctorPatients',createDoctorPatients)
router.get('/getPatientDoctors',protect,checkPatientRole,getPatientDoctors)
router.get('/getAmount',protect,checkDoctorRole,getAmount)
router.get('/searchDoctorsToChat/:name/:specialty',searchDoctorsToChat)

module.exports = router