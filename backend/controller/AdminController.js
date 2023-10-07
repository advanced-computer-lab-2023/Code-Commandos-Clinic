const DoctorModel = require('../model/Doctor')
const PatientModel = require('../model/Patient')
const AdminModel = require('../model/Admin')
const mongoose = require('mongoose')

//requirement  7
// add another adminstrator with a set username and password
const addAdmin = async(req,res) =>
{
        const{username,password}= req.body
     
        //add admin to db
        try{
         const admin =await  AdminModel.create({username,password})
         res.status(200).json(admin)
        } catch(error)
        {
         res.status(400).json({error: "cannot add admin"})
        }
        
}

module.exports={
    addAdmin
}

