const express = require('express')
const router = express.Router()

const {
    subscribeToPackage,
    getSubscribedPackage,
    getPatientPackages
} = require('../controller/HealthPackagePatientController')

const {protect} = require('../middleware/AuthenticationHandler')
const {
  checkPatientRole,
  checkDoctorRole,
  checkAdminRole
} = require('../middleware/AccessHandler')

//subscribe to a package
router.post('/subscribeToPackage', subscribeToPackage)

//get a patient's package
router.get('/getSubscribedPackage/', protect, checkPatientRole, getSubscribedPackage)

//get all patient packages
router.get('/getPatientPackages', getPatientPackages)

module.exports = router;
