const express = require("express");
const router = express.Router();
const {
    addFamilyMember,
    getFamilyMembers,
    getSubscribedPackagesForFamilyMembers
} = require("../controller/FamilyMemberController");
const {protect} = require('../middleware/AuthenticationHandler')
const {
  checkPatientRole,
} = require('../middleware/AccessHandler')

// task 18 and 22
router.post('/addFamilyMember/',protect, checkPatientRole, addFamilyMember);
router.get('/getFamilyMembers/',protect, checkPatientRole, getFamilyMembers);
router.get('/getSubscribedPackagesForFamilyMembers', protect, checkPatientRole, getSubscribedPackagesForFamilyMembers)

module.exports=router