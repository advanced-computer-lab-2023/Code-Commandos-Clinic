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

module.exports = { getPrescriptions, addPrescription };
