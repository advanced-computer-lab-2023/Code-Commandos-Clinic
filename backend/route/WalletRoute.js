const express = require('express')
const router = express.Router();
const { getAmount } = require("../controller/walletController")

router.get('/getAmount/:username', getAmount)

module.exports = router