const AdminModel = require('../model/Admin')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

//requirement  7
// add another adminstrator with a set username and password
const addAdmin = asyncHandler(async(req,res) => {
    const{username,password}= req.body
    //add admin to db
    try{
        const admin =await AdminModel.create({username,password})
        res.status(200).json(admin)
    }
    catch(error) {
        res.status(400)
        throw new Error(error.message)
    }
})

//requirement 8
//remove a doctor/patient/ Admin from the system
const removeAdmin =asyncHandler( async (req,res) => {
    const { id } =req.params
    try {
        const admin =await AdminModel.findByIdAndDelete(id)
        if(!admin){
            res.status(400)
            throw new Error('Admin not found')
        }
        res.status(200).json(admin)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

const getAdmin = asyncHandler(async (req,res) => {
    const {id} = req.params
    try {
        const admin = await AdminModel.findById(id)
        if (!admin){
            res.status(400)
            throw new Error('Admin not found')
        }
        res.status(200).json(admin)
    }
    catch (error){
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports={
    addAdmin,
    removeAdmin,
    getAdmin
}

