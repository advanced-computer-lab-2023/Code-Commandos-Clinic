const express = require('express')
const router = express.Router()

const {
    addPackage,
    getPackage,
    getPackages,
    updatePackage,
    deletePackage,
    getPackagesWithDiscount
} = require('../controller/HealthPackageController')

const {protect} = require('../middleware/AuthenticationHandler')
const {
  checkPatientRole,
  checkDoctorRole,
  checkAdminRole
} = require('../middleware/AccessHandler')

//post a new package
router.post('/addPackage', addPackage)

//get a single package
router.get('/getPackage/:id', getPackage)

//get all packages
router.get('/getPackages',protect, getPackages)

//update a package
router.put('/updatePackage/:id', updatePackage)

//delete a  package(done)
router.delete('/deletePackage/:id', deletePackage)

router.get('/getPackagesWithDiscount', protect, checkPatientRole, getPackagesWithDiscount)

module.exports = router;
