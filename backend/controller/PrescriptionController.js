const PrescriptionModel = require('../model/Prescription');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const getPrescriptionsbyPatient = asyncHandler(async (req, res) => {
  const { patient } = req.params;
  try {
    const prescriptions = await PrescriptionModel.find({ patient: new mongoose.Types.ObjectId(patient) })
    .populate('patient', 'name')
    .populate('doctor', 'name')
    .populate('medication', 'name');
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const getPrescriptionbyId = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Prescription not found')
  }
  try{
    const prescription = await PrescriptionModel.findById(id)
    if (!prescription) {
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

    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

const filterbyDate = asyncHandler(async (req, res) => {
  const { issueDate } = req.params;
  try {
    const prescriptions = await PrescriptionModel.find({issueDate});
    res.status(200).json(prescriptions)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

const filterbyFilledOrNot = asyncHandler(async (req, res) => {
  const { filled } = req.params;
  try {
    const prescriptions = await PrescriptionModel.find({filled});
    res.status(200).json(prescriptions)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

const filterbyDoctor = asyncHandler(async (req, res) => {
  const { name } = req.params;
  try {
    const prescriptions = await PrescriptionModel.find({
      'doctor.name': name}); 
    res.status(200).json(prescriptions)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

module.exports = { getPrescriptionsbyPatient,
                   addPrescription , 
                   getPrescriptionbyId,
                   filterbyDate,
                   filterbyFilledOrNot,
                   filterbyDoctor};
