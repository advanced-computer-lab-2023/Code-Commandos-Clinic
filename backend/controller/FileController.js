'use strict';
const SingleFile = require('../model/File');
const MultipleFile = require('../model/MultipleFiles');
const fs = require('fs');
const crypto = require('crypto');

const singleFileUpload = async (req, res, next) => {
    try {
        const fileContent = fs.readFileSync(req.file.path);
        const fileHash = calculateFileHash(fileContent);

        // Check if a file with the same hash already exists
        const existingFile = await SingleFile.findOne({ fileHash });

        if (existingFile) {
            // File with the same content already exists
            fs.unlinkSync(req.file.path);
            res.status(400).send('File already exists');
        } else {
            // File is unique, save it
            const file = new SingleFile({
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: fileSizeFormatter(req.file.size, 2),
                fileHash,
            });
            await file.save();
            res.status(201).send('File Uploaded Successfully');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteSingleFile = async (req, res) => {
    try {
        const file = await SingleFile.findByIdAndDelete(req.params.id);
        if (!file) {
            return res.status(404).send('File not found');
        }
        const filePath = file.filePath;
        await file.deleteOne();
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err.message);
            }
            res.status(200).send('File deleted successfully');
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteAllSingleFiles = async (req, res) => {
    try {
        const files = await SingleFile.find();
        files.forEach(async file => {
            const filePath = file.filePath;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err.message);
                }  
            });
            await file.deleteOne(); 
        });
        res.status(200).send('All single files deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const multipleFileUpload = async (req, res) => {
    try {
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            title: req.body.title,
            files: filesArray
        });
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getallSingleFiles = async (req, res) => {
    try {
        const files = await SingleFile.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getallMultipleFiles = async (req, res, next) => {
    try {
        const files = await MultipleFile.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

const calculateFileHash = (fileContent) => {
    const hash = crypto.createHash('sha256');
    hash.update(fileContent);
    return hash.digest('hex');
}

module.exports = {
    singleFileUpload,
    getallSingleFiles,
    multipleFileUpload,
    getallMultipleFiles,
    deleteSingleFile,
    deleteAllSingleFiles
}