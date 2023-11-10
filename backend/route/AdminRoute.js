const express = require('express');
const router = express.Router();

const {
  addAdmin,
  getAdmin,
  removeAdmin,
  getAlladmins
} = require('../controller/AdminController')

const {protect} = require('../middleware/AuthenticationHandler')
const {checkAdminRole,checkDoctorRole} = require('../middleware/AccessHandler')

router.get('/getAdmin/:id',protect,getAdmin)
router.get('/getAlladmins',protect,checkAdminRole,getAlladmins)
router.post('/addAdmin',protect,checkDoctorRole,addAdmin)
router.delete('/removeAdmin/:id',protect,checkAdminRole,removeAdmin)
module.exports = router
