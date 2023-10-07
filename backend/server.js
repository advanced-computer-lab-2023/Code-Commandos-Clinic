const express = require("express")
const server = express();
const dotenv = require("dotenv").config();
const connectDB = require("./configuration/Db");
const {errorHandler} = require('./middleware/ErrorHandler')
const port = process.env.PORT
const mongoose = require('mongoose')

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectDB()

server.get('/',(req,res) => {
    res.status(200).send("Hello from server")
})

const HealthPackage = require('./model/HealthPackage');
// const HealthPackageController = require('./controller/HealthPackageController');
const HealthPackageRoute = require('./route/HealthPackageRoute');

server.use('/HealthPackageRoute', HealthPackageRoute)

server.use(errorHandler)

// server.post("/addPackage",addPackage);
// // server.get("/users", getUsers);
// server.put("/updatePackage", updatePackage);
// server.delete("/deletePackage", deletePackage);
