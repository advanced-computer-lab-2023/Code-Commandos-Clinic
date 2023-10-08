const express = require('express');
const router = express.Router();

const {
  addAdmin,removePatient,getAdmin,removeAdmin,removeDoctor,
} = require('../controller/AdminController')

router.get('/',getAdmin)
router.post('/',addAdmin)
router.delete('/:id',removeAdmin)
router.delete('/:id',removeDoctor)
router.delete('/:id',removePatient)
module.exports = router
