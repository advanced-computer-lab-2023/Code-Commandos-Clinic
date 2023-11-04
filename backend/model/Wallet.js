const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  amount:{
    type: Number,
    required: true,
  }
},{ timestamps: true })


const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;