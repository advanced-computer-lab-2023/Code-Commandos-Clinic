const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/User')
const Patient = require("../model/Patient");
const Doctor = require("../model/Doctor");
const Admin = require("../model/Admin");
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const Mailgen =  require('mailgen');
const dotenv = require("dotenv").config();

const register = asyncHandler(async (req,res) => {
    const {username,password} = req.body
    if(!username || !password){
        res.status(400)
        throw new Error('Please provide username and password')
    }
    const userExists = await User.findOne({username})
    if (userExists){
        res.status(400)
        throw new Error('User exists already')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = await User.create({
        username: username,
        password: hashedPassword,
    })
    if (user){
        res.status(200).json(user)
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
const login = asyncHandler(async (req,res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})
    if (user && user.password === password){
        var id
        if(user.role == 'PATIENT'){
            const patient = await Patient.findOne({username}).select('_id')
            id = patient._id
        }
        else if(user.role == 'DOCTOR'){
            const doctor = await Doctor.findOne({username}).select('_id')
            id = doctor._id
        }
        else if(user.role == 'ADMIN'){
            const admin = await Admin.findOne({username}).select('_id')
            id = admin._id
        }
        const token = generateToken(user.username,user.role,id)
        console.log(token)
        res.cookie('token', token, {
            maxAge: 3600000,
            httpOnly: true,
        });
        res.status(200).json({
            id: id,
            username: user.username,
            role: user.role,
            token: token
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json("Successfully logged out ");
    }
    catch (error){
        throw new Error(error.message)
    }
}

const generateToken = (username,role,id) => {
    return jwt.sign({username,role,id}, process.env.JWT_SECRET, {
        expiresIn: 3600000,
    })
}

const generateOTP =  asyncHandler(async (req,res) => {
    const {email} = req.body
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    req.app.locals.email = email

    let nodeConfig = {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD,

        }
    }

    let transporter = nodemailer.createTransport(nodeConfig);

    let message = {
        from : {
            name: "Code Commandos",
            address: process.env.ETHEREAL_EMAIL
        },
        to: email,
        subject : "OTP Verification",
        text: `Your OTP for verification is ${req.app.locals.OTP}`,
    }

    try {
        const response = await transporter.sendMail(message)
        res.status(200).json(message)
    }
    catch (error){
        res.status(500)
        throw new Error(error.message)
    }

})


const verifyOTP =  asyncHandler(async (req,res,next) => {
    const { otp } = req.body;
    if(parseInt(req.app.locals.OTP) === parseInt(otp)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        next()
    }
    else{
        res.status(401)
        throw new Error("Invalid OTP")
    }
})

const resetPassword = asyncHandler(async (req,res) => {
    const {username,newPassword} = req.body
    if (newPassword.search(/[a-z]/) < 0 || newPassword.search(/[A-Z]/) < 0 || newPassword.search(/[0-9]/) < 0) {
        res.status(400)
        throw new Error("Password must contain at least one number, one capital letter and one small letter")
    }
    const patient = await Patient.findOneAndUpdate({username},{password:newPassword})
    const doctor = await Doctor.findOneAndUpdate({username},{password:newPassword})
    const admin = await Admin.findOneAndUpdate({username},{password:newPassword})

    if (!patient && !doctor && !admin){
        res.status(404)
        throw new Error("No user found")
    }
    else {
        await User.findOneAndUpdate({username},{password:newPassword})
    }
    res.status(200).json("Your password has been reset")
})

const changePassword = async (req,res) => {
    const username = req.user.username
    const role = req.user.role
    const {currentPassword,newPassword,confirmPassword} = req.body
    var currentComparedPassword
    try {
         currentComparedPassword = await User.findOne({username}).select('password')
    }
    catch (error){
        return res.status(400).json({error:error.message})
    }
    if(currentPassword != currentComparedPassword.password){
        return res.status(401).json({ error: "Your current password is incorrect!" });
    }
    if (newPassword.search(/[a-z]/) < 0 || newPassword.search(/[A-Z]/) < 0 || newPassword.search(/[0-9]/) < 0) {
        return res.status(400).json({error: "Password must contain at least one number, one capital letter and one small letter"})
    }
    if(newPassword != confirmPassword){
        return res.status(400).json({ error: "Password confirmation incorrect" });
    }
    try {
        await User.findOneAndUpdate({username},{password:newPassword})
        if(role == "PATIENT"){
            await Patient.findOneAndUpdate({username},{password:newPassword})
        }
        if(role == "DOCTOR"){
            await Doctor.findOneAndUpdate({username},{password:newPassword})
        }
        if(role == "ADMIN"){
            await Admin.findOneAndUpdate({username},{password:newPassword})
        }
        res.clearCookie('token')
        return res.status(200).json("Password changed successfully we recommend closing the browser!")
    }
    catch (error){
        return res.status(400).json({error:error.message})
    }
}


module.exports = {
    register,
    login,
    logout,
    generateOTP,
    verifyOTP,
    resetPassword,
    changePassword
}