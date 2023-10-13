const PrescriptionModel = require('../model/Prescription');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const PatientModel = require('../model/Patient')
const DoctorModel = require('../model/Doctor')

const getPrescriptionsbyPatient = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  if(!mongoose.Types.ObjectId.isValid(patientId) ){
    throw new Error('Invalid id format')
  }
  try {
    const prescriptions = await PrescriptionModel.find({ patient: patientId })
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
    const patient = await PatientModel.findById(newPrescription.patient)
    const doctor = await DoctorModel.findById(newPrescription.doctor)
    console.log(newPrescription)
    newPrescription.patientName = patient.name
    newPrescription.doctorName = doctor.name
    await newPrescription.save()
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

const filterbyDate = asyncHandler(async (req, res) => {
  const { createdAt } = req.params;
  try {
    const prescriptions = await PrescriptionModel.find({createdAt});
    res.status(200).json(prescriptions)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

const filterbyStatus = asyncHandler(async (req, res) => {
  const { status } = req.params;
  try {
    const prescriptions = await PrescriptionModel.find({status});
    res.status(200).json(prescriptions)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

const filterbyDoctor = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  try {
    const prescriptions = await PrescriptionModel.find({doctor:doctorId})
    res.status(200).json(prescriptions)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

module.exports = {
  getPrescriptionsbyPatient,
  addPrescription ,
  getPrescriptionbyId,
  filterbyDate,
  filterbyStatus,
  filterbyDoctor
};
