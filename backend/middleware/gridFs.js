/*

const multer=require('multer')

const GridFsStorage=require('multer-gridfs-storage')
const url = process.env.MONGO_URI
export function storageFiles(){
    let fileStorage =multer.diskStorage({
        destination:"uploads",
        filename:(req,file,cb)=>{
            let filename=filename.originalname
            cb(null,filename)
        }
    })
    let fileUpload = multer ({storage:fileStorage})
    return fileUpload
}
export function gridStorage(){
    let storageFS= new GridFsStorage({
       url,
       file:(req,file)=>{
        return{
            filename: file.originalname,
            bucketName:"gridUploads"
        }
       }
    })

    let uploadGrid = multer({storage:storageFS})
    return uploadGrid
}

*//*
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const {GridFsStorage} = require('multer-gridfs-storage');
const { GridFsModel } = require('mongoose');
const {gfs}=require('../configuration/Db')

// Connect to MongoDB using Mongoose


// Create GridFS stream and connect it to your Mongoose connection
const conn = mongoose.connection;

url1=process.env.MONGO_URI
// Create storage engine using Multer-GridFS-Storage
const storage = new GridFsStorage({
  gfs: gfs,
  url:url1,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });



module.exports={upload}
*/