// const HealthPackageModel = require('../model/HealthPackage')
const asyncHandler = require('express-async-handler')
const PatientModel = require("../model/Patient");
const HealthPackageModel = require('../model/HealthPackage');
const { default: mongoose } = require('mongoose');

//Req ID #11 in VC(add/update/delete health packages)

//add package(working)
const addPackage = asyncHandler(async (req, res) => {
  const { patientID, packageType } = req.body;
  try {
    // Check if the patient already has a subscription
    const existingPackage = await HealthPackageModel.findOne({ patientID });

    if (existingPackage) {
      throw new Error('Patient already has a subscription');
    }

    // If the patient doesn't have a subscription, create a new one
    const newPackage = await HealthPackageModel.create({ patientID, packageType });
    res.status(200).json(newPackage);

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//get package subscription for patient (not working)
const getPackage = asyncHandler(async(req,res) => {
    const {patientID} = req.body
      
    // Check if the patient ID is valid
    if (!mongoose.Types.ObjectId.isValid(patientID)){
        return res.status(404).json({error: 'Patient id is invalid'})
    }
    
    const HealthPackage = await HealthPackageModel.findOne(patientID)
  
    if(!HealthPackage){
      return res.status(400).json({error: 'Patient has no package subscription'})
    }
  
    res.status(200).json(HealthPackage)
})

//get all (working if needed)
const getPackages = asyncHandler(async(req,res) => {
  const HealthPackage = await HealthPackageModel.find({}).sort({createdAt: -1})

  res.status(200).json(HealthPackage)
})

// Update(working)
const updatePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { packageType } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid patient ID' });
    }
    
    // Validate the package type against the enum values
    const validPackageTypes = ['Silver', 'Gold', 'Platinum'];
    if (!validPackageTypes.includes(packageType)) {
      return res.status(400).json({ error: 'Invalid package type' });
    }

    const updatedPackage = await HealthPackageModel.findByIdAndUpdate(id,{ packageType },{ new: true });

    if (!updatedPackage) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(updatedPackage);
  }
   catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//delete(working)
const deletePackage = asyncHandler(async(req,res) => {
    const {patientID} = req.body

    if (!mongoose.Types.ObjectId.isValid(patientID)){
        return res.status(404).json({error: 'Patient id is invalid '})
    }
    
    const HealthPackage = await HealthPackageModel.findOneAndDelete({patientID: patientID})

    if(!HealthPackage){
      return res.status(400).json({error: 'Patient has no package subscription'})
    }

    res.status(200).json(HealthPackage)
})

module.exports = {addPackage, getPackage, getPackages, updatePackage, deletePackage};

