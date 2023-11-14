const HealthRecordModel=require('../model/HealthRecord');
const DoctorPatientModel = require('../model/DoctorPatient.js');
const AppointmentModel = require('../model/Appointment');

const asyncHandler = require('express-async-handler');
const PatientModel = require('../model/Patient')


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


const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, PutObjectCommand,GetObjectCommand } = require("@aws-sdk/client-s3");



const s3 = new S3Client({
    credentials: {
      accessKeyId:accessKey,
      secretAccessKey:secretAccessKey
    },
    region:bucketRegion,
  })
const randomImageName=(bytes=32)=>crypto.randomBytes(bytes).toString('hex')
const createHealthRecord = asyncHandler( async (req,res)=>{
    try{
    const HealthRecord= new HealthRecordModel({
        patient: req.body.patient,
        AllergicHistory: req.body.AllergicHistory,
        Maincomplaint: req.body.Maincomplaint,
        BloodType: req.body.BloodType
    })
 
        const newHealthRecord=await HealthRecord.save();
        res.status(200).json(newHealthRecord)
    } catch(err) {
        res.status(400)
        throw new Error(err.message)
    }
})



const addHealthRecordByDoctor = asyncHandler (async(req,res)=>{
    console.log("hello")
    console.log("req.body",req.body)
    console.log("req.file",req.file)

    const imageName=randomImageName()+"healthrecord"
    const healthrecord = await HealthRecordModel.findOne({patient:req.params.patientid})
    console.log()

    try{
        if(healthrecord){
            res.status(400)
            throw new Error("patient you are trying to add has an already existing health record ")
        }
        else{
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
                AllergicHistory: req.body.allergicHistory,
                MainComplaint: req.body.mainComplaint,
                BloodType: req.body.bloodType,
                imageName:req.file.originalname
            })
            console.log(req.body.AllergicHistory)
            console.log(HealthRecord)
            await s3.send(command)
            const newHealthRecord=await HealthRecord.save();
            res.status(200).json(newHealthRecord)
        }}
    catch(err){
        res.status(400)
        throw new Error(err.message)

    }
})









//used to view health records of a patient when you sign in as a patient you view your own health record
const getHealthRecordsPatient = asyncHandler ( async (req,res) =>{
    try{
        const healthRecord= await HealthRecordModel.findOne({ patient: req.user.id });
        console.log(healthRecord)
        if(healthRecord==null){
            console.log("hello from backend")
            res.status(400)
            throw new Error("No health record found")
        }
        const getObjectParams={
            Bucket:bucketName,
            Key :healthRecord.imageName
        }
        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(s3,command,{expiresIn:3600})
        healthRecord.urlName=url

        res.status(200).json(healthRecord);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})


//used to view health records of patients of a specific doctor and this patients have at least one appointment with doctor
const getHealthRecordPatientsOfDoctor = asyncHandler(async (req,res)=>{
    try{
        const patients = await DoctorPatientModel.find({doctor: req.user.id});
        if(patients.length==0){
            res.status(400)
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
                    { doctor : req.user.id },
                    { patient : _patient.patient},
                    { status : 'COMPLETED'}
                ]
            }
            const previousAppointments = await AppointmentModel.findOne(query)
            console.log(previousAppointments)
            if(previousAppointments!==null){
                console.log(_patient.patient)
                const curHealthRecord=await HealthRecordModel.findOne({patient: _patient.patient})
                if(curHealthRecord) {

                    healthRecords.push(curHealthRecord)
                }
                console.log(healthRecords)
            }
        }


        for(const healthRecord of healthRecords ){

            const getObjectParams={
                Bucket:bucketName,
                Key :healthRecord.imageName
            }
            const command = new GetObjectCommand(getObjectParams)
            const url = await getSignedUrl(s3,command,{expiresIn:3600})
            healthRecord.urlName=url

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