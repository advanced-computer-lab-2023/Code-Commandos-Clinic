// const HealthPackageModel = require('../model/HealthPackage')
const asyncHandler = require('express-async-handler')
const PatientModel = require("../model/Patient");
const HealthPackage = require('../model/HealthPackage');
const { default: mongoose } = require('mongoose');
// const HealthPackage = require('../model/HealthPackage');
// const HealthPackage = require('../model/HealthPackage');

//Req ID #11 in VC

//add package
const addPackage = asyncHandler(async(req,res) => {
    const {packageType} = req.body
      try{
        const HealthPackage = await HealthPackage.create({packageType})
        res.status(200).json(HealthPackage)
      } catch(error){
        // res.status(400)json({error: error.message})
        res.status(400)
        throw new Error(error.message)
      }

})

//update
const updatePackage = asyncHandler(async(req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such package'})
    }

    const HealthPackage = await HealthPackage.findOneAndUpdate({_id: id}, {...req.body})

    if(!HealthPackage){
      return res.status(400).json({error: 'No such package'})
    }

    res.status(200).json(HealthPackage)
    
    
  })
  
//get one (if needed)
const getPackage = asyncHandler(async(req,res) => {
    const {id} = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such package'})
    }
    
    const HealthPackage = await HealthPackage.findByID({id})
  
    if(!HealthPackage){
      return res.status(400).json({error: 'No such package'})
    }
  
    res.status(200).json(HealthPackage)
})

//get all (if needed)
const getPackages = asyncHandler(async(req,res) => {
  const HealthPackage = await HealthPackage.find({}).sort({createdAt: -1})

  res.status(200).json(HealthPackage)
})

//delete
const deletePackage = asyncHandler(async(req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such package'})
    }
    
    const HealthPackage = await HealthPackage.findOneAndDelete({_id: id})

    if(!HealthPackage){
      return res.status(400).json({error: 'No such package'})
    }

    res.status(200).json(HealthPackage)
})




module.exports = {addPackage, updatePackage, getPackage, deletePackage};

