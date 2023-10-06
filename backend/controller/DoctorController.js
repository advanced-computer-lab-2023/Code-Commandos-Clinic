const DoctorPatient = require('../model/DoctorPatient');
const Doctor=require('../model/Doctor');
const asyncHandler = require('express-async-handler')






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


}


)

const getMyPatients = asyncHandler ( async (req,res) =>{
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



module.exports = {
    getMyPatients,
    createDoctorPatients


}










