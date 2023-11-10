const HealthRecordModel=require('../model/HealthRecord');
const DoctorPatientModel = require('../model/DoctorPatient.js');
const AppointmentModel = require('../model/Appointment');

const asyncHandler = require('express-async-handler');
const PatientModel = require('../model/Patient')
const {S3Client,PutObjectCommand} = require('@aws-sdk/client-s3');

const crypto=require('crypto')
const multer=require('multer')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const s3 = new S3Client({
    credentials: {
      accessKeyId:accessKey,
      secretAccessKey:secretAccessKey
    },
    region:bucketRegion,
  })
const randomImageName=(bytes=32)=>crypto.randomBytes(bytes).toString('hex')
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



const addHealthRecordByDoctor = async(req,res)=>{
    console.log("req.body",req.body)
    console.log("req.file",req.file)
    
    const imageName=randomImageName()+"healthrecord"
    const params ={
        Bucket:bucketName,
        Key:req.file.originalname,
        Body : req.file.buffer,
        ContentType :req.file.mimetype
    }
    const command = new PutObjectCommand(params)
    console.log(req.params.patientid)
    const HealthRecord= new HealthRecordModel({
        patient: req.params.patientid,
        AllergicHistory: req.body.AllergicHistory,
        Maincomplaint: req.body.Maincomplaint,
        BloodType: req.body.BloodType,
        imageName:req.file.originalname
    })
    try{
        const healthrecord = await HealthRecordModel.findOne({patient:req.params.patientid})
        if(healthrecord){
            throw new Error("patient you are trying to add to it health redord have already one ")
        }
        await s3.send(command)
        const newHealthRecord=await HealthRecord.save();
        res.status(200).json(newHealthRecord)
    } catch(err) {
        res.status(400)
        throw new Error(err.message)
    }


}









//used to view health records of a patient when you sign in as a patient you view your own health record
const getHealthRecordsPatient = asyncHandler ( async (req,res) =>{
    try{
        const healthRecord= await HealthRecordModel.findOne({ patient: req.user.id });
        if(healthRecord===null){
            throw new Error("No health record found")
        }
        res.status(200).json(healthRecord);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})


//used to view health records of patients of a specific doctor and this patients have at least one appointment with doctor
const getHealthRecordPatientsOfDoctor = asyncHandler(async (req,res)=>{
    try{
        const patients = await DoctorPatientModel.find({doctor: req.params.doctorid});
        if(patients.length==0){
            throw new Error("you do not have any patients")
        }
        let healthRecords = []
        for(const _patient of patients){
            console.log(_patient)
            const currentDate = new Date();
            let query={
            $and: [
                { startTime : { $lt : currentDate } },
                { endTime : { $lt : currentDate } },
                { doctor : req.params.doctorid },
                { patient : _patient.patient},
                { status : 'COMPLETED'}
            ]
        }
           const previousAppointments = await AppointmentModel.findOne(query)
           console.log(previousAppointments)
           if(previousAppointments!==null){
            console.log(_patient.patient)
             healthRecords.push(await HealthRecordModel.findOne({patient: _patient.patient}))
             console.log(healthRecords)
           }
        }
        if(healthRecords==null){
            throw new Error("no health records of patients")
        }
        console.log(healthRecords)
        res.status(200).json(healthRecords);

    }catch(err){
        res.status(400)
        throw new Error(err.message)
    }
})





module.exports={
    createHealthRecord,
    getHealthRecordsPatient,
    getHealthRecordPatientsOfDoctor,
    addHealthRecordByDoctor
   
}