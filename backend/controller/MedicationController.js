const MedicationModel = require('../model/Medication');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const addMedication = asyncHandler(async (req, res) => {
  const medicationBody = req.body;
  try {
    const medication = await MedicationModel.create(medicationBody);
    res.status(200).json(medication);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
 
module.exports = { addMedication };