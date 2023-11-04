const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db");
const {errorHandler} = require('./middleware/ErrorHandler')
const cookieParser = require('cookie-parser');

const port = process.env.PORT

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());


server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectDB()

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
const walletRoutes= require('./route/WalletRoute')

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
server.use('/api/wallet',walletRoutes)
server.use('/api/user',userRoutes)


server.use(errorHandler)

