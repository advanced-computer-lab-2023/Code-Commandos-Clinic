const DoctorModel = require('../model/Doctor')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

//requirement 38
//search for a doctor by name and/or speciality
const searchByNameAndOrSpeciality = asyncHandler( async (req,res) => {
    const {name,speciality} = req.body
    let query = {}
    if(name && speciality){
        query = {
            $and: [
                { name: { $regex: new RegExp(name, 'i') } },
                { speciality: { $regex: new RegExp(speciality, 'i') } },
            ],
        };
    }
    else if(name){
        query = {name: {$regex: new RegExp(name, 'i')}};
    }
    else if (speciality) {
        query = { speciality: { $regex: new RegExp(speciality, 'i') } };
    }
    else {
        res.status(400)
        throw new Error('You need to provide name and speciality or at least one of them')
    }
    try {
        const doctors = await DoctorModel.find(query);
        if (doctors.length === 0){
            res.status(404)
            throw new Error('No doctors found!')
        }
        res.status(200).json(doctors)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

const createDoctor = asyncHandler(async (req,res) =>{
    const doctorBody = req.body
    try {
        const doctor = await DoctorModel.create(doctorBody)
        res.status(200).json(doctor)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

//ziad: requirement 14
//update doctor's email, hourlyRate, affiliation
//function updates a doctor's info using an ID or username
const updateDoctor = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { username, email, hourlyRate, affiliation } = req.body
    try{
        let query = {}
        if(email){
            query.email = email
        }
        if(hourlyRate){
            query.hourlyRate = hourlyRate        
        }
        if(affiliation){
            query.affiliation = affiliation
        }
        if(!email && !hourlyRate && !affiliation){
            throw new Error('You need to provide a new email, hourly rate or affiliation to continue')
        }
        var doctor;
        if(id) {
            doctor = await DoctorModel.findOneAndUpdate({_id: id}, {...query})
        }
        else {
            doctor = await DoctorModel.findOneAndUpdate({username: username}, {...query})
        }    
        if (!doctor) {
            res.status(400)
            throw new Error('Doctor not found')
        }
        res.status(200).json(doctor)
    } 
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

//for testing
const getDoctors = asyncHandler(async (req, res) => {
    try {
      const Doctors = await DoctorModel.find({}).sort({createdAt: -1})
      res.status(200).json(Doctors)
    }
    catch (error){
      res.status(400)
      throw new Error(error.message)
    }
    
  }) 

module.exports = {
    searchByNameAndOrSpeciality,
    createDoctor,
    updateDoctor,
    getDoctors
};