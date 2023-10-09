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


const getMedicationbyId = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Medication not found')
  }
  try{
    const med = await MedicationModel.findById(id)
    if (!med) {
      res.status(400)
      throw new Error('Medication not found')
    }
    res.status(200).json(med)
  } catch (error){
    res.status(400)
    throw new Error(error.message)
  }
})
 
module.exports = { addMedication , getMedicationbyId};