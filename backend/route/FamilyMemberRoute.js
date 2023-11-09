const express = require("express");
const router = express.Router();
const {
    addFamilyMember,
    getFamilyMembers,
    linkFamilyMember
} = require("../controller/FamilyMemberController");

const {protect} = require('../middleware/AuthenticationHandler')

const {
  checkPatientRole,
  checkDoctorRole,
  checkAdminRole
} = require('../middleware/AccessHandler')

// task 18 and 22
router.post('/addFamilyMember',protect,checkPatientRole,addFamilyMember);
router.get('/getFamilyMembers',protect,checkPatientRole,getFamilyMembers);
router.post('/linkFamilyMember',protect,checkPatientRole,linkFamilyMember);

module.exports=router