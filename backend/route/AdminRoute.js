const express = require('express');
const router = express.Router();

const {
  addAdmin,
  getAdmin,
  removeAdmin,
  getAlladmins
} = require('../controller/AdminController')

const {protect} = require('../middleware/AuthenticationHandler')
const {
  checkPatientRole,
  checkDoctorRole,
  checkAdminRole
} = require('../middleware/AccessHandler')

router.get('/getAdmin/:id',getAdmin)
router.get('/getAlladmins',protect,checkAdminRole,getAlladmins)
router.post('/addAdmin',addAdmin)
router.delete('/removeAdmin/:id',removeAdmin)
module.exports = router
