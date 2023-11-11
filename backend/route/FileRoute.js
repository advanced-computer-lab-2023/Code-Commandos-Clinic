
const express = require('express');
const {upload} = require('../middleware/uploadHandler')
const  {singleFileUpload,singleFileUploadGuest,getallSingleFiles,multipleFileUpload,getallMultipleFiles,deleteSingleFile,deleteAllSingleFiles,getFileById} = require('../controller/FileController')
const router = express.Router();

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");

router.post('/addSingleFile', protect, checkPatientRole, upload.single('file'), singleFileUpload);
router.post('/addSingleFileGuest/:username',  upload.single('file'), singleFileUploadGuest);
router.get('/getSingleFiles', protect, checkPatientRole, getallSingleFiles);
router.get('/getFileById/:id',getFileById)
router.post('/addMultipleFiles', protect, checkPatientRole, upload.array('files'), multipleFileUpload);
router.get('/getMultipleFiles', protect, checkPatientRole, getallMultipleFiles);
router.delete('/deleteSingleFile/:id', protect, checkPatientRole, deleteSingleFile);
router.delete('/deleteAllSingleFiles', protect, checkPatientRole, deleteAllSingleFiles);
router.get('/uploads/:filename', (req, res) => {
    res.sendFile(`${__dirname}/uploads/${req.params.filename}`);
});

module.exports = {
  routes: router
}
