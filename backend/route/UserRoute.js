const express = require('express');
const router = express.Router();

const {
    login,
    register
} = require('../controller/UserController')

router.post('/login',login)
module.exports = router
