const express = require('express')
const router = express.Router()

const {
    addPackage,
    getPackage,
    getPackages,
    updatePackage,
    deletePackage
} = require('../controller/HealthPackageController')
const {protect} = require("../middleware/AuthenticationHandler");
const {checkAdminRole} = require("../middleware/AccessHandler");

//post a new package
router.post('/addPackage',protect,checkAdminRole, addPackage)

//get a single package
router.get('/getPackage/:id', getPackage)

//get all packages
router.get('/getPackages', getPackages)

//update a package
router.put('/updatePackage/:id', protect,checkAdminRole,updatePackage)

//delete a  package(done)
router.delete('/deletePackage/:id', protect,checkAdminRole,deletePackage)

module.exports = router;
