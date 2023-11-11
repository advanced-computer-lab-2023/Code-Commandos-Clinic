const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    fileHash: {
        type: String,
        required: true
    },
    fileOwner: {
        type: String
    },
}, { timestamps: true });


const file = mongoose.model('SingleFile', singleFileSchema);
module.exports = file;