const PrescriptionModel = require('../model/Prescription');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const PatientModel = require('../model/Patient')
const DoctorModel = require('../model/Doctor')
const fs = require('fs');
const PDFDocument = require('pdfkit');

const getPrescriptionsbyPatient = asyncHandler(async (req, res) => {
  const {username}  = req.params;
  console.log(username)
  const patient = await PatientModel.findOne({username}).select("_id")
  console.log(patient)
  const patientId = patient._id
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

const getPrescriptionsOfPatient = asyncHandler(async (req, res) => {
  const patientId  = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(patientId) ){
    throw new Error('Invalid id format')
  }
  try {
    const prescriptions = await PrescriptionModel.find({ patient: patientId ,doctor: req.user.id})
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
    const prescriptionBody = {
      patient: req.body.patient,
      doctor: req.user.id
    }
    const newPrescription = await PrescriptionModel.create(prescriptionBody);
    const patient = await PatientModel.findById(newPrescription.patient)
    const doctor = await DoctorModel.findById(newPrescription.doctor)
    newPrescription.patientName = patient.name
    newPrescription.doctorName = doctor.name
    await newPrescription.save()
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

const deletePrescriptionById = asyncHandler(async (req, res) => {
  const prescriptionId = req.params.id;
  try {
    const prescription = await PrescriptionModel.findById(prescriptionId);
    if (!prescription) {
      res.status(404)
      throw new Error("Prescription not found")
    }
    await PrescriptionModel.findByIdAndDelete(prescriptionId)
    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500)
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

const addMedicineToPrescription = asyncHandler(async (req,res) => {
  const {name,dosage,prescriptionId} = req.body
  try {
    const prescription = await PrescriptionModel.findById(prescriptionId);
    if (!prescription) {
      return res.status(404)
      throw new Error("Prescription not found")
    }

    const existingMedicine = prescription.medicines.find(
        (medicine) => medicine.name === name
    );

    if (existingMedicine) {
      res.status(400)
      throw new Error("Medicine exists already")
    }

    prescription.medicines.push({ name, dosage });
    prescription.status = 'FILLED'
    await prescription.save();

    res.status(200).json(prescription);
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

const deleteMedicineFromPrescription = asyncHandler(async (req, res) => {
  const { name, prescriptionId } = req.body;

  try {
    const prescription = await PrescriptionModel.findByIdAndUpdate(
        prescriptionId,
        { $pull: { medicines: { name } } },
        { new: true }
    );
    if (!prescription) {
      return res.status(404)
      throw new Error("Prescription not found")
    }
    if(prescription.medicines.length === 0){
      prescription.status = "UNFILLED"
      await prescription.save()
    }
    res.status(200).json(prescription);
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

const updateMedicineDosage = async (req, res) => {
  const { prescriptionId, name, newDosage } = req.body;

  try {
    const prescription = await PrescriptionModel.findById(prescriptionId);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    const medicineToUpdate = prescription.medicines.find(
        (medicine) => medicine.name === name
    );
    if (!medicineToUpdate) {
      return res.status(404).json({ message: 'Medicine not found in prescription' });
    }
    medicineToUpdate.dosage = newDosage;
    await prescription.save();
    res.status(200).json(prescription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generatePDF = async (req, res) => {
 try{
  const prescriptionId = req.params.id; // Assuming you have an endpoint like /prescription/:id
  const prescription = await PrescriptionModel.findById(prescriptionId);

  if (!prescription) {
    return res.status(404).json({ message: 'Prescription not found' });
  }
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent('prescription.pdf')}`);
  const doc = new PDFDocument();

  // Add prescription details to the PDF
  doc.text(`Patient: ${prescription.patientName}`);
  doc.text(`Doctor: ${prescription.doctorName}`);
  doc.text('------------------------------------'); 
  doc.text('Medicines:');
  prescription.medicines.forEach((medicine) => {
    doc.text(`- Name: ${medicine.name}, Dosage: ${medicine.dosage}`);
  });
  doc.text('-----------------------------------'); 
  doc.text(`Status: ${prescription.status}`);
  doc.text('-----------------------------------'); 
  doc.text(`Date: ${prescription.createdAt}`);

  doc.pipe(res);
  doc.end();
 }
 catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
}
};


module.exports = {
  getPrescriptionsbyPatient,
  getPrescriptionsOfPatient,
  addPrescription ,
  deletePrescriptionById,
  getPrescriptionbyId,
  filterbyDate,
  filterbyStatus,
  filterbyDoctor,
  addMedicineToPrescription,
  deleteMedicineFromPrescription,
  updateMedicineDosage,
  generatePDF
};
