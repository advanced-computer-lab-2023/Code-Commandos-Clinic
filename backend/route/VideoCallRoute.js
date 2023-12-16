const express = require('express');
const router = express.Router();

const {
    addVideoCall,
    getVideoCall,
    deleteVideoCall,
    setSocketID,
    authZoomAPI,
    createMeeting,
    getMeetings
} = require('../controller/VideoCallController')
const { protect } = require("../middleware/AuthenticationHandler");

router.post('/addVideoCall', protect, addVideoCall)
router.get('/getVideoCall', protect, getVideoCall)
router.delete('/deleteVideoCall', protect, deleteVideoCall)
router.put('/setSocketID', protect, setSocketID)
router.post('/authZoomAPI', authZoomAPI)
router.post('/createMeeting', createMeeting)
router.get('/getMeetings', getMeetings)
module.exports = router
