// const HealthPackageModel = require('../model/HealthPackage')
const asyncHandler = require('express-async-handler')
const HealthPackagePatientModel = require('../model/HealthPackagePatient');
const HealthPackageModel = require('../model/HealthPackage')
const { default: mongoose } = require('mongoose');

//Req ID #11 in VC(add/update/delete health packages)

//subscribe to a package
const subscribeToPackage = asyncHandler(async (req, res) => {
  const { patientID, healthPackageID } = req.body;
  try {
    // Check if the patient already has a subscription
    const existingPackage = await HealthPackagePatientModel.findOne({ patientID: patientID });
    if (existingPackage) {
      throw new Error('Patient already has a subscription');
    }

    // If the patient doesn't have a subscription, create a new one
    const newPackage = await HealthPackagePatientModel.create({ patientID, healthPackageID });
    res.status(200).json(newPackage);

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//get package subscription using patient ID
const getSubscribedPackage = asyncHandler(async(req,res) => {
    const { id } = req.user
      
    // Check if the package ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404)
        throw new Error('Patient id is invalid');
    }
    try {
      const HealthPackagePatient = await HealthPackagePatientModel.findOne({patientID: id})
      if(!HealthPackagePatient){
        res.status(404)
        throw new Error('No subscribed package');
      }
      const HealthPackageID = HealthPackagePatient.healthPackageID
      const HealthPackage = await HealthPackageModel.findOne({_id: HealthPackageID})
      if(!HealthPackage){
        res.status(404)
        throw new Error('Subscribed to invalid package');
      }
      res.status(200).json(HealthPackage)
    } 
    catch (error){
      res.status(400);
      throw new Error(error.message);
    }
})

//get package subscription status and renewal date using patient ID
const getSubscribedPackageStatus = asyncHandler(async(req,res) => {
  const { id } = req.user
    
  // Check if the package ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)){
      res.status(404)
      throw new Error('Patient id is invalid');
  }
  try {
    const HealthPackagePatient = await HealthPackagePatientModel.findOne({patientID: id})
    if(!HealthPackagePatient){
      res.status(404)
      throw new Error('No subscribed package');
    }
    res.status(200).json(HealthPackagePatient)
  } 
  catch (error){
    res.status(400);
    throw new Error(error.message);
  }
})

//get all packages
const getPatientPackages = asyncHandler(async(req,res) => {
  try{
    const HealthPackage = await HealthPackagePatientModel.find({}).sort({createdAt: -1})
    res.status(200).json(HealthPackage)
  }
  catch (error){
    res.status(400);
    throw new Error(error.message);
  }
})

module.exports = {subscribeToPackage, getSubscribedPackage, getPatientPackages, getSubscribedPackageStatus};

