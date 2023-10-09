const PrescriptionModel = require('../model/Prescription');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const getPrescriptions = asyncHandler(async (req, res) => {
  try {
    const prescriptions = await PrescriptionModel.find({});
    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

const getPrescriptionbyId = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Prescription not found')
  }
  try{
    const prescription = await PrescriptionModel.findById(id)
    if (!prescription) {
      res.status(400)
      throw new Error('prescription not found')
    }
    res.status(200).json(prescription)
  } catch (error){
    res.status(400)
    throw new Error(error.message)
  }
})

const addPrescription = asyncHandler(async (req, res) => {
  try {
    const newPrescription = await PrescriptionModel.create(req.body);

    res.status(201).json({
      success: true,
      data: newPrescription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = { getPrescriptions, addPrescription , getPrescriptionbyId};
