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
        const token = generateToken(user.username,user.role)
        res.header('Authorization',`Bearer${token}`)
        console.log(token)
        res.cookie('token', token, {
            maxAge: 3600000,
            httpOnly: true,
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

const getLoggedInUser = asyncHandler( async (req,res) => {
    res.status(200).json(req.user)
})

const skipLogin = asyncHandler( async (req,res) => {
    res.status(200)
    console.log("helllllll")
    return true;
})

const generateToken = (username,role) => {
    return jwt.sign({username,role}, process.env.JWT_SECRET, {
        expiresIn: 3600000,
    })
}

module.exports = {
    register,
    login,
    getLoggedInUser,
    skipLogin
}