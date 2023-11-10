const express = require('express');
const router = express.Router();
const {
    createEmploymentContract,
    getAllEmploymentContracts
  } = require('../controller/EmploymentContractController')

  const {
    checkPatientRole,
    checkDoctorRole,
    checkAdminRole
  } = require('../middleware/AccessHandler')

// Create a new employment contract
router.post('/createContracts', createEmploymentContract);

// Retrieve all employment contracts
router.get('/getContracts', getAllEmploymentContracts);

module.exports = router;
