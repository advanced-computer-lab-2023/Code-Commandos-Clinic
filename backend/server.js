const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db");
const {errorHandler} = require('./middleware/ErrorHandler')
const port = process.env.PORT

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectDB()

const patientRoutes = require('./route/PatientRoute')
const doctorRoutes = require('./route/DoctorRoute')
const appointmentRoutes = require('./route/AppointmentRoute')
const familyMemberRoutes=require("./route/FamilyMemberRoute")
const doctorRegisterationRoutes = require('./route/DoctorRegistrationRoute')
const healthPackageRoutes = require('./route/HealthPackageRoute');
const healthPackagePatientRoutes = require('./route/HealthPackagePatientRoute');

server.use('/api/doctor',doctorRoutes)
server.use('/api/appointment',appointmentRoutes)
server.use('/api/familyMember',familyMemberRoutes);
server.use('/api/patient', patientRoutes)
server.use('/api/doctorRegistration', doctorRegisterationRoutes)
server.use('/api/healthPackage', healthPackageRoutes)
server.use('/api/healthPackagePatient', healthPackagePatientRoutes)


server.use(errorHandler)
