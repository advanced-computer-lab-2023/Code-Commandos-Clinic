const express = require('express');
const router = express.Router();

const {
    login,
    register,
    logout,
    generateOTP,
    verifyOTP,
    resetPassword,
    changePassword
} = require('../controller/UserController')
const {protect,localVariables} = require("../middleware/AuthenticationHandler");

router.post('/login',login)
<<<<<<< HEAD
router.post('/logout',protect,logout)
=======
router.post('/logout',logout)
router.get('/checkLoggedIn',protect,skipLogin)
router.post('/register',register)
>>>>>>> akram

router.post('/generateOTP',localVariables,generateOTP)
router.post('/resetPassword',verifyOTP,resetPassword)
router.post('/changePassword',protect,changePassword)
module.exports = router
