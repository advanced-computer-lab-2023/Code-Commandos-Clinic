const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db")
const {errorHandler} = require('./middleware/ErrorHandler')
const port = process.env.PORT
const mongoose=require("mongoose")
const familymemberroute=require("./route/FamilyMemberRoute")


server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectDB()
server.get('/',(req,res) => {
    res.status(200).json({message:"Hello from server"})
})


const doctorRoutes = require('./route/DoctorRoute')
const appointmentRoutes = require('./route/AppointmentRoute')

server.use('/api/doctor',doctorRoutes)
server.use('/api/appointment',appointmentRoutes)
server.use('/api/FamilyMemberRoute',familymemberroute);

server.use(errorHandler)
