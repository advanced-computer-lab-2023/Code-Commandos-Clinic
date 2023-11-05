const express = require('express');
const {upload} = require('../middleware/uploadHandler')
const  {singleFileUpload,getallSingleFiles,multipleFileUpload,getallMultipleFiles} = require('../controller/FileController')
const router = express.Router();


router.post('/addSingleFile', upload.single('file'), singleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.post('/addMultipleFiles', upload.array('files'), multipleFileUpload);
router.get('/getMultipleFiles', getallMultipleFiles);

module.exports = {
  routes: router
}
