
const express = require('express');
const {upload} = require('../middleware/uploadHandler')
const  {singleFileUpload,getallSingleFiles,multipleFileUpload,getallMultipleFiles,deleteSingleFile,deleteAllSingleFiles} = require('../controller/FileController')
const router = express.Router();

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");

router.post('/addSingleFile', protect, checkPatientRole, upload.single('file'), singleFileUpload);
router.get('/getSingleFiles', protect, checkPatientRole, getallSingleFiles);
router.post('/addMultipleFiles', protect, checkPatientRole, upload.array('files'), multipleFileUpload);
router.get('/getMultipleFiles', protect, checkPatientRole, getallMultipleFiles);
router.delete('/deleteSingleFile/:id', protect, checkPatientRole, deleteSingleFile);
router.delete('/deleteAllSingleFiles', protect, checkPatientRole, deleteAllSingleFiles);

module.exports = {
  routes: router
}
