const AdminModel = require('../model/Admin')
const UserModel = require('../model/User')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs");

//requirement  7
// add another adminstrator with a set username and password
const addAdmin = asyncHandler(async(req,res) => {
    const{username,password,email}= req.body
    //add admin to db
    try{
        if (password.search(/[a-z]/) < 0 || password.search(/[A-Z]/) < 0 || password.search(/[0-9]/) < 0) {
            res.status(400)
            throw new Error("Password must contain at least one number, one capital letter and one small letter")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = await UserModel.create({username,password:hashedPassword,'role':'ADMIN'})
        const admin =await AdminModel.create({username,password:password,email:email})
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
    const {username} =await AdminModel.findById(id);
    try {
        const user = await UserModel.findOneAndDelete({username:username})
        const admin =await AdminModel.findByIdAndDelete(id);//req.user.username);
        
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

const getAlladmins =asyncHandler(async (req,res) => {
    console.log('user is ',req.user)
    console.log('user is ',req.user.id)

    try {
        const admins= await AdminModel.find({})
        res.status(200).json(admins)
    }
    catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})

module.exports={
    addAdmin,
    removeAdmin,
    getAdmin,
    getAlladmins
}

