const express = require('express');
const router = express.Router();

const {
    login,
    register,
    logout,
    skipLogin,
    generateOTP,
    verifyOTP,
    resetPassword
} = require('../controller/UserController')
const {protect,localVariables} = require("../middleware/AuthenticationHandler");

router.post('/login',login)
router.post('/logout',logout)
router.get('/checkLoggedIn',protect,skipLogin)

router.post('/generateOTP',localVariables,generateOTP)
router.post('/resetPassword',verifyOTP,resetPassword)

module.exports = router
