const express = require('express')
const router = express.Router()

const {
    subscribeToPackage,
    getSubscribedPackage,
    getPatientPackages,
    getSubscribedPackageStatus,
    cancelSubscription
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
//router.get('/getSubscribedPackage/', protect, checkPatientRole, getSubscribedPackage)
router.get('/getSubscribedPackage/',  getSubscribedPackage)
//get a patient's package status and renewal date
//router.get('/getSubscribedPackageStatus', protect, checkPatientRole, getSubscribedPackageStatus)
router.get('/getSubscribedPackageStatus',  getSubscribedPackageStatus)
//get all patient packages
router.get('/getPatientPackages', getPatientPackages)

router.delete('/cancelSubscription/:familyMemberID',protect, checkPatientRole, cancelSubscription)

module.exports = router;
