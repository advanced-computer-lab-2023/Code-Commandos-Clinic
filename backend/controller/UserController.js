const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/User')
const Patient = require("../model/Patient");
const Doctor = require("../model/Doctor");
const Admin = require("../model/Admin");
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

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
        const token = generateToken(user.username,user.role)
        res.header('Authorization',`Bearer${token}`)
        console.log(token)
        res.cookie('token', token, {
            maxAge: 3600000,
            httpOnly: false,
            path: '/'
        });

        res.status(200).json({
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

const logout = asyncHandler(async (req, res) => {
    console.log("inside logout method")
    try {
        res.cookie('token', '', {
            maxAge: 0,
            httpOnly: false,
        });
        const token = req.cookies.token
        console.log("token from backend ",token)
        res.status(200);
    }
    catch (error){
        throw new Error(error)
    }
});

const getLoggedInUser = asyncHandler( async (req,res) => {
    res.status(200).json(req.user)
})

const generateToken = (username,role) => {
    return jwt.sign({username,role}, process.env.JWT_SECRET, {
        expiresIn: 3600000,
    })
}

const skipLogin = asyncHandler( async (req,res) => {
    res.status(200)
    return true;
})

const generateOTP =  asyncHandler(async (req,res) => {
    const {email} = req.body
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    req.app.locals.email = email

    const transporter = nodemailer.createTransport({
        service: 'alll',
        auth: {
            user: 'ebram@ntsal.com',
            pass: '18094',
        },
    });
    console.log(req.app.locals.OTP)
    const mailOptions = {
        from: 'no-reply@example.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${req.app.locals.OTP}`,
        replyTo: email,
    };
    console.log(mailOptions)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400)
            throw new Error(error.message)
        } else {
            res.status(200).json({message: "Email sent successfully"})
        }
    });


})


const verifyOTP =  asyncHandler(async (req,res,next) => {
    const { otp } = req.body;
    if(parseInt(req.app.locals.OTP) === parseInt(otp)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        next()
    }
    else
        throw new Error("Invalid OTP")
})

const resetPassword = asyncHandler(async (req,res) => {
    const {newPassword} = req.body
    const email = req.app.locals.email+""
    const patient = await Patient.findOneAndUpdate({email},{password:newPassword})
    const doctor = await Doctor.findOneAndUpdate({email},{password:newPassword})
    const admin = await Admin.findOneAndUpdate({email},{password:newPassword})
    if (!patient && !doctor && !admin){
        throw new Error("No user found")
    }
    req.app.locals.email = null;
})

module.exports = {
    register,
    login,
    getLoggedInUser,
    logout,
    skipLogin,
    generateOTP,
    verifyOTP,
    resetPassword
}