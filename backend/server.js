const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db")
const {errorHandler} = require('./middleware/ErrorHandler')
const port = process.env.PORT

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectDB()
server.get('/',(req,res) => {
    res.status(200).json({message:"Hello from server"})
})

const patientRoutes = require('./route/PatientRoute')
const doctorRoutes = require('./route/DoctorRoute')
const appointmentRoutes = require('./route/AppointmentRoute')
const adminRoutes=require('./route/AdminRoute')
const doctorRegisterationRoutes = require('./route/DoctorRegistrationRoute')

server.use('/api/appointment',appointmentRoutes)
server.use('/api/admin',adminRoutes)
server.use('/api/doctor',doctorRoutes)
server.use('/api/patient', patientRoutes)
server.use('/api/doctorRegistration', doctorRegisterationRoutes)

server.use(errorHandler)
