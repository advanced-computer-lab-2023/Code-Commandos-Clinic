const DoctorPatient = require('../model/DoctorPatient');
const Doctor=require('../model/Doctor');
const asyncHandler = require('express-async-handler')

/*******************************************************adding a doctorPatient entry ****************************************************************************** */
const createDoctorPatients= asyncHandler( async(req,res) =>{
    const patientdoctor=new DoctorPatient({
        patient:req.body.patient,
        doctor:req.body.doctor,
        doctorName:req.body.doctorName,
        patientName:req.body.patientName
    })
    try{
        const newPatientDoctor=await patientdoctor.save();
        res.status(201).json(newPatientDoctor);
    }catch(err){
        console.log(err.message);
    }
})

module.exports = {
    createDoctorPatients
}










