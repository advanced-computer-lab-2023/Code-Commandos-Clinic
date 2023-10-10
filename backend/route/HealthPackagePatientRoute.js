const express = require('express')
const router = express.Router()

const {
    subscribeToPackage,
    getSubscribedPackage,
    getPatientPackages
} = require('../controller/HealthPackagePatientController')

//subscribe to a package
router.post('/', subscribeToPackage)

//get a patient's package
router.get('/:id', getSubscribedPackage)

//get all patient packages
router.get('/', getPatientPackages)

module.exports = router;
