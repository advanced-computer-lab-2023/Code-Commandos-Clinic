const express = require('express')
const router = express.Router()

const {
    subscribeToPackage,
    getSubscribedPackage,
    getPatientPackages
} = require('../controller/HealthPackagePatientController')

//subscribe to a package
router.post('/subscribeToPackage', subscribeToPackage)

//get a patient's package
router.get('/getSubscribedPackage/:id', getSubscribedPackage)

//get all patient packages
router.get('/getPatientPackages', getPatientPackages)

module.exports = router;
