const express = require('express');
const router = express.Router();
const {
    createEmploymentContract,
    getAllEmploymentContracts, getDoctorContract, acceptContract, rejectContract
} = require('../controller/EmploymentContractController')

  const {
    checkPatientRole,
    checkDoctorRole,
    checkAdminRole
  } = require('../middleware/AccessHandler')
const {protect} = require("../middleware/AuthenticationHandler");

// Create a new employment contract
router.post('/createContracts', createEmploymentContract);

// Retrieve all employment contracts
router.get('/getContracts', protect,checkAdminRole,getAllEmploymentContracts);
router.get('/getDoctorContract', protect,checkDoctorRole,getDoctorContract);
router.put('/acceptContract', protect,checkDoctorRole,acceptContract);
router.put('/rejectContract', protect,checkDoctorRole,rejectContract);

module.exports = router;
