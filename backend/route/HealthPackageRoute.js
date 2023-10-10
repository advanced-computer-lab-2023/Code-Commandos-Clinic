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
router.post('/',addPackage)

//get a single package
router.get('/',getPackage)

//get all packages
router.get('/',getPackages)

//update a package
router.patch('/:id',updatePackage)

//delete a  package(done)
router.delete('/',deletePackage)

module.exports = router;
