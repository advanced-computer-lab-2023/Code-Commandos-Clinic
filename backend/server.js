const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db");
const HealthPackage = require("./model/HealthPackage");
const { addPackage } = require("./controller/HealthPackageController");
const {errorHandler} = require('./middleware/ErrorHandler')
const port = process.env.PORT
const HealthPackageRoute = require('./route/HealthPackageRoute')
// const adminModel = require('./model/Admin')
// const appointmentModel = require('./model/Appointment')
// const doctorModel = require('./model/Doctor')
// const doctorPatientModel = require('./model/DoctorPatient')
// const patientModel = require('./model/Patient')

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(errorHandler)
server.use('/api/HealthPackageRoute', HealthPackageRoute)



server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectDB()

server.get('/',(req,res) => {
    res.status(200).send("Hello from server")
})


// server.post("/addPackage",addPackage);
// // server.get("/users", getUsers);
// server.put("/updatePackage", updatePackage);
// server.delete("/deletePackage", deletePackage);
