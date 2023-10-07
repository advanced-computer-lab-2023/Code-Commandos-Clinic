const DoctorPatient = require('../model/DoctorPatient.js');
const Doctor=require('../model/Doctor.js');
const Patient = require('../model/Patient.js');
const HealthRecord = require ('../model/HealthRecord.js');
const asyncHandler = require('express-async-handler');














//requirement-33 Nour
const getPatients = asyncHandler ( async (req,res) =>{
    try{
        const allPatients= await DoctorPatient.find({ doctor: req.params.id });
        if(allPatients.length===0){
            throw new Error("No Patients found")
        }
        res.status(200).json(allPatients);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
}
)

//requirement-36 Nour
const selectPatient = asyncHandler ( async (req , res) =>{
    try{
        const patient = await Patient.findById(req.params.id);
        res.status(200).json(patient);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
}
)

const getInfoHealthPatient = asyncHandler ( async (req , res) =>{
    try{
        const HealthRecords = await HealthRecord.find({ patient: req.params.id })
        res.status(200).json(HealthRecords);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }




}

)



module.exports={
    getPatients,
    selectPatient,
    getInfoHealthPatient
}