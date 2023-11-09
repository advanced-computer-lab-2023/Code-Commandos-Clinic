const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectToDb = require("./configuration/Db");
const {errorHandler} = require('./middleware/ErrorHandler')
const cookieParser = require('cookie-parser');
const port = process.env.PORT
const {S3Client,PutObjectCommand} = require('@aws-sdk/client-s3');
const HealthRecordModel=require('../backend/model/HealthRecord');
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
const randomImageName=(bytes=32)=>crypto.randomBytes(bytes).toString('hex')
const s3 = new S3Client({
    credentials: {
      accessKeyId:accessKey,
      secretAccessKey:secretAccessKey
    },
    region:bucketRegion,
  })




server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());


server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectToDb()

server.post("/api/posts",upload.single('image'),async(req,res)=>{
    console.log("req.body",req.body)
    console.log("req.file",req.file)
    
    const imageName=randomImageName()
    const params ={
        Bucket:bucketName,
        Key:imageName,
        Body : req.file.buffer,
        ContentType :req.file.mimetype
    }
    const command = new PutObjectCommand(params)
    await s3.send(command)
    const HealthRecord= new HealthRecordModel({
        patient: new ObjectId("654bb74ecd6cbced77d59500"),
        AllergicHistory: 'NONE',
        Maincomplaint: 'NONE',
        BloodType: 'A_NEGATIVE',
        imagename:imageName
    })
    try{
        const newHealthRecord=await HealthRecord.save();
        res.status(200).json(newHealthRecord)
    } catch(err) {
        res.status(400)
        throw new Error(err.message)
    }


})

server.get('/',(req,res) => {
    
    res.status(200).json({message:"Hello from server"})
})


const patientRoutes = require('./route/PatientRoute')
const doctorRoutes = require('./route/DoctorRoute')
const appointmentRoutes = require('./route/AppointmentRoute')
const adminRoutes=require('./route/AdminRoute')
const familyMemberRoutes=require("./route/FamilyMemberRoute")
const doctorRegisterationRoutes = require('./route/DoctorRegistrationRoute')
const healthPackageRoutes = require('./route/HealthPackageRoute');
const healthPackagePatientRoutes = require('./route/HealthPackagePatientRoute');
const prescriptionRoute = require('./route/PrescriptionRoute')
const healthRecordRoutes = require('./route/HealthRecordRoute')
const userRoutes= require('./route/UserRoute')

server.use('/api/appointment',appointmentRoutes)
server.use('/api/admin',adminRoutes)
server.use('/api/doctor',doctorRoutes)
server.use('/api/familyMember',familyMemberRoutes);
server.use('/api/patient', patientRoutes)
server.use('/api/doctorRegistration', doctorRegisterationRoutes)
server.use('/api/healthPackage', healthPackageRoutes)
server.use('/api/healthPackagePatient', healthPackagePatientRoutes)
server.use('/api/healthRecord',healthRecordRoutes)
server.use('/api/prescription',prescriptionRoute)
server.use('/api/user',userRoutes)


server.use(errorHandler)

