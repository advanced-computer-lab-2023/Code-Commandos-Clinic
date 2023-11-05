const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const WalletModel = require('../model/Wallet');


//requirement 67  -> akram
const getAmount = asyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const wallet = await WalletModel.findOne({ username });
    if (!wallet) {
      res.status(400)
      throw new Error('Wallet not found')
    }

    res.status(200).json(wallet) 
  }
  catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
});

module.exports = {
  getAmount
};