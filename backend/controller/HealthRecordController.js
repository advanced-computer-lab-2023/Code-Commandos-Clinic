const HealthRecordModel=require('../model/HealthRecord');
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler');



const createHealthRecord = asyncHandler( async (req,res)=>{
    const HealthRecord= new HealthRecordModel({
        patient: req.body.patient,
        AllergicHistory: req.body.AllergicHistory,
        Maincomplaint: req.body.Maincomplaint,
        BloodType: req.body.BloodType
    })
    try{
        const newHealthRecord=await HealthRecord.save();
        res.status(200).json(newHealthRecord)
    } catch(err) {
        res.status(400)
        throw new Error(err.message)
    }
})
//used to view health records of a patient when you sign in as a patient you view your own health record
const getHealthRecordsPatient = asyncHandler ( async (req,res) =>{
    try{
        const healthRecord= await HealthRecordModel.findOne({ patient: req.user.id });
        if(healthRecord===undefined){
            throw new Error("No health record found")
        }
        res.status(200).json(healthRecord);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})


module.exports={
    createHealthRecord,
    getHealthRecordsPatient
}