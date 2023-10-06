const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db")
const {errorHandler} = require('./middleware/ErrorHandler')
const port = process.env.PORT || "5000";

server.use(express.json());
server.use(express.urlencoded({ extended: false }));



server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectDB()

server.get('/',(req,res) => {
    res.status(200).json({message:"Hello from serveripnpnpnpi"})
})

const prescriptionRoute = require('./route/PrescriptionRoute')
server.use('/Prescription',prescriptionRoute)
server.use(errorHandler)