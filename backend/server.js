const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db")
const {errorHandler} = require('./middleware/ErrorHandler')
const port = process.env.PORT
// const adminModel = require('./model/Admin')
// const appointmentModel = require('./model/Appointment')
// const doctorModel = require('./model/Doctor')
// const doctorPatientModel = require('./model/DoctorPatient')
// const patientModel = require('./model/Patient')

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectDB()
server.get('/',(req,res) => {
    res.status(200).json({message:"Hello from server"})
})

const doctorRoutes = require('./route/DoctorRoute')
const appointmentRoutes = require('./route/AppointmentRoute')

const adminRoutes=require('./route/AdminRoute')

server.use('/api/doctor',doctorRoutes)
server.use('/api/appointment',appointmentRoutes)
server.use('/api/admin',adminRoutes)

server.use(errorHandler)
