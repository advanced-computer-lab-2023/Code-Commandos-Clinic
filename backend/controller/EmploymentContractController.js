const EmploymentContract = require('../model/EmploymentContract');
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

// Create a new employment contract
const createEmploymentContract = asyncHandler(async(req,res) => {
  try {
    const contractData = req.body;

    const employmentContract = await EmploymentContract.create(contractData);
    res.status(200).json({employmentContract});

} catch (error) {
    res.status(400)
    throw new Error(error.message);
  }
});

// Retrieve all employment contracts
const getAllEmploymentContracts = asyncHandler(async(req,res) => {
  try {
    const contracts = await EmploymentContract.find({}).sort({createdAt: -1})
    res.status(200).json(contracts);

  } catch (error) {
    res.status(400)
    throw new Error(error.message) 
    }
});

const getDoctorContract = asyncHandler(async(req,res) => {
    try {
        const contract = await EmploymentContract.findOne({doctor:req.user.id})
        if(!contract){
            res.status(404)
            throw new Error("You have no contract")
        }
        res.status(200).json(contract);

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
});

const acceptContract = asyncHandler(async (req,res) => {
  try {
    const contract = await EmploymentContract.findOne({doctor:req.user.id});
    if (!contract) {
      res.status(404)
      throw new Error("Contract not found")
    }
    contract.status = "ACCEPTED"
    await contract.save()
    res.status(200).json(contract)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

const rejectContract = asyncHandler(async (req,res) => {
    try {
      const contract = await EmploymentContract.findOne({doctor:req.user.id});
    if (!contract) {
      res.status(404)
      throw new Error("Contract not found")
    }
    contract.status = "REJECTED"
    await contract.save()
    res.status(200).json(contract)
    } catch (error) {
      res.status(400)
      throw new Error(error.message)
    }
})


module.exports = {
  createEmploymentContract,
  getAllEmploymentContracts,
    acceptContract,
    rejectContract,
    getDoctorContract
};
