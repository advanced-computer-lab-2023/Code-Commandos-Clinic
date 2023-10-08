// const HealthPackageModel = require('../model/HealthPackage')
const asyncHandler = require('express-async-handler')
const PatientModel = require("../model/Patient");
const HealthPackageModel = require('../model/HealthPackage');
const { default: mongoose } = require('mongoose');

//Req ID #11 in VC(add/update/delete health packages)

//add package
const addPackage = asyncHandler(async(req,res) => {
    const {patientUserName, packageType} = req.body
      try{
        const HealthPackage = await HealthPackageModel.create({patientUserName, packageType})
        res.status(200).json(HealthPackage)
      }

      catch(error){
        res.status(400)
        throw new Error(error.message)
      }
})

//get package subscription for patient(if needed)
const getPackage = asyncHandler(async(req,res) => {
    const {id} = req.params
  
    // if (!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error: 'No such package'})
    // }
    
    const HealthPackage = await HealthPackageModel.findById(id)
  
    if(!HealthPackage){
      return res.status(400).json({error: 'No such package'})
    }
  
    res.status(200).json(HealthPackage)
})

//get all (if needed)
const getPackages = asyncHandler(async(req,res) => {
  const HealthPackage = await HealthPackageModel.find({}).sort({createdAt: -1})

  res.status(200).json(HealthPackage)
})

//update
const updatePackage = asyncHandler(async(req,res) => {
  const { id, packageType} = req.params

  // try{
    // let query = {}
    // if(packageType){
      // query.packageType = packageType
    // }
    // else{
      // throw new Error('Patient already has subscription to this package')
    // }

    const HealthPackage = await HealthPackageModel.findOneAndUpdate({_id: id}, {...req.body})

    if(!HealthPackage){
      return res.status(400).json({error: 'Patient not found '})
    }
    
    res.status(200).json(HealthPackage)
  // }

  // catch(error){
    // res.status(400)
    // throw new Error(error.message)
  // }
})

//delete
const deletePackage = asyncHandler(async(req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such package'})
    }
    
    const HealthPackage = await HealthPackageModel.findOneAndDelete({_id: id})

    if(!HealthPackage){
      return res.status(400).json({error: 'No such package'})
    }

    res.status(200).json(HealthPackage)
})

module.exports = {addPackage, getPackage, getPackages, updatePackage, deletePackage};

