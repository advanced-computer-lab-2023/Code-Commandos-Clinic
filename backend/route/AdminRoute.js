const express = require('express');
const router = express.Router();

const {
  addAdmin,
  getAdmin,
  removeAdmin,
} = require('../controller/AdminController')

router.get('/getAdmin/:id',getAdmin)
router.post('/addAdmin',addAdmin)
router.delete('/removeAdmin/:id',removeAdmin)
module.exports = router
