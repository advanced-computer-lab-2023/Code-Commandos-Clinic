const express = require('express')
const router = express.Router()

const {
    addPackage,
    getPackage,
    getPackages,
    updatePackage,
    deletePackage
} = require('../controller/HealthPackageController')

//post a new package
router.post('/addPackage', addPackage)

//get a single package
router.get('/getPackage/:id', getPackage)

//get all packages
router.get('/getPackages', getPackages)

//update a package
router.put('/updatePackage/:id', updatePackage)

//delete a  package(done)
router.delete('/deletePackage/:id', deletePackage)

module.exports = router;
