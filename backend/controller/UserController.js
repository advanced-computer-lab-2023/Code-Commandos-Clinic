const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/User')

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

const generateToken = (username,role,id) => {
    return jwt.sign({username,role,id}, process.env.JWT_SECRET, {
        expiresIn: 3600000,
    })
}

const skipLogin = asyncHandler( async (req,res) => {
    res.status(200)
    return true;
})


module.exports = {
    register,
    login,
    getLoggedInUser,
    logout,
    skipLogin
}