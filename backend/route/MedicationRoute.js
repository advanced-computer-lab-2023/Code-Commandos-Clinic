const express = require('express')
const {addMedication , getMedicationbyId} = require("../controller/MedicationController") 

const router = express.Router();

// add a medication
router.post('/addMedication' , addMedication)

// view by id
router.get('/:id' , getMedicationbyId)

module.exports = router