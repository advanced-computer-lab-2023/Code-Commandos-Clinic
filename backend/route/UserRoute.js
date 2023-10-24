const express = require('express');
const router = express.Router();

const {
    login,
    register, skipLogin
} = require('../controller/UserController')
const {protect} = require("../middleware/AuthenticationHandler");

router.post('/login',login)
router.get('/checkLoggedIn',protect,skipLogin)
module.exports = router
