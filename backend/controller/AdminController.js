const DoctorModel = require('../model/Doctor')
const PatientModel = require('../model/Patient')
const AdminModel = require('../model/Admin')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

//requirement  7
// add another adminstrator with a set username and password
const addAdmin = asyncHandler(async(req,res) =>
{
        const{username,password}= req.body
     
        //add admin to db
        try{
         const admin =await  AdminModel.create({username,password})
         res.status(200).json(admin)
        } catch(error)
        {
         res.status(400)//.json({error: "cannot add admin"})
         //throw new Error('cannot add admin')
         throw new Error(error.message)
        }
        
})

//requirement 8
//remove a doctor/patient/ Admin from the system

const removePatient =asyncHandler( async (req,res) =>
{
    const { id } =req.params //grapping id from prams
    
    const patient =await PatientModel.findOneAndDelete({_id:id})

    if(!patient){
        return res.status(400)
        throw new Error(error.message)

    }
    res.status(200).json(workout)

})

const removeDoctor =asyncHandler( async (req,res) =>
{
    const { id } =req.params //grapping id from prams
    
    const Doctor =await DoctorModel.findOneAndDelete({_id:id})

    if(!Doctor){
        return res.status(400)
        throw new Error(error.message)

    }
    res.status(200).json(workout)

})

const removeAdmin =asyncHandler( async (req,res) =>
{
    const { id } =req.params //grapping id from prams
    
    const admin =await AdminModel.findOneAndDelete({_id:id})

    if(!admin){
        return res.status(400)
        throw new Error(error.message)

    }
    res.status(200).json(admin)

})

const getAdmin=async (req,res) =>
{
   //const workouts=await Workout.find({resp:20})
   const workouts=await AdminModel.find({})
   
   res.status(200).json(workouts) //worouts??????

}

module.exports={
    addAdmin,
    removeAdmin,
    removeDoctor,
    removePatient,
    getAdmin
}

