// const HealthPackageModel = require('../model/HealthPackage')
const asyncHandler = require('express-async-handler')
const PatientModel = require("../model/Patient");
const HealthPackageModel = require('../model/HealthPackage');
const HealthPackagePatientModel = require('../model/HealthPackagePatient')
const { default: mongoose } = require('mongoose');


//Req ID #11 in VC(add/update/delete health packages)

//add package(working)
const addPackage = asyncHandler(async (req, res) => {
  const { packageName, yearlySubscription, doctorSessionDiscount, medicineDiscount, familyDiscount } = req.body;
  try {
    // Check if the patient already has a subscription
    // const existingPackage = await HealthPackageModel.findOne({ patientID });

    // if (existingPackage) {
    //   throw new Error('Patient already has a subscription');
    // }

    // If the patient doesn't have a subscription, create a new one
    const newPackage = await HealthPackageModel.create({ packageName, yearlySubscription, doctorSessionDiscount, medicineDiscount, familyDiscount });
    res.status(200).json(newPackage);

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//get package subscription using ID
const getPackage = asyncHandler(async(req,res) => {
    const { id } = req.params
      
    // Check if the package ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Package id is invalid'})
    }
    try {
      const HealthPackage = await HealthPackageModel.findOne(id)
      if(!HealthPackage){
        return res.status(400).json({error: 'Package not found'})
      }
      res.status(200).json(HealthPackage)
    } 
    catch (error){
      res.status(400);
      throw new Error(error.message);
    }
})

//get all packages
const getPackages = asyncHandler(async(req,res) => {
  try{
    const HealthPackage = await HealthPackageModel.find({}).sort({yearlySubscription: 1})
    res.status(200).json(HealthPackage)
  }
  catch (error){
    res.status(400);
    throw new Error(error.message);
  }
})

//gets all packages and adds discountedYearlySubscription attribute, returns nothing if no discount
const getPackagesWithDiscount =  asyncHandler(async(req,res) => {
  const { id } = req.user
  try {
    const HealthPackagePatient = await HealthPackagePatientModel.findOne({patientID: id})
    if(!HealthPackagePatient){
      res.status(404)
      throw new Error('No subscribed package');
    }
    const subscribedHealthPackage = await HealthPackageModel.findOne({_id:HealthPackagePatient.healthPackageID})
    const discount = subscribedHealthPackage.familyDiscount
    const healthPackages = await HealthPackageModel.find({}).sort({yearlySubscription: 1})
    let healthPackageList = []
    for(const healthPackage of healthPackages){
      const { _id, packageName, yearlySubscription, doctorSessionDiscount, medicineDiscount, familyDiscount } = healthPackage;
      const discountedYearlySubscription = healthPackage.yearlySubscription*(1-discount)
      healthPackageList.push({
        _id:_id, 
        packageName:packageName, 
        yearlySubscription:yearlySubscription, 
        doctorSessionDiscount:doctorSessionDiscount, 
        medicineDiscount:medicineDiscount, 
        familyDiscount:familyDiscount, 
        discountedYearlySubscription:discountedYearlySubscription 
      })
    }
    res.status(200).json(healthPackageList)
  }
  catch (error){
    res.status(400);
    throw new Error(error.message);
  }
})

// Update package
const updatePackage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid package ID' });
    }
    const updatedPackage = await HealthPackageModel.findByIdAndUpdate({_id: id}, {...req.body});

    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
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
    const { id } = req.params
    try{
      if (!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({error: 'Package id is invalid '})
      }
      const HealthPackage = await HealthPackageModel.findOneAndDelete({_id: id})
      if(!HealthPackage){
        return res.status(400).json({error: 'Package not found'})
      }
      res.status(200).json(HealthPackage)
    }
    catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
})

module.exports = {addPackage, getPackage, getPackages, getPackagesWithDiscount, updatePackage, deletePackage};

