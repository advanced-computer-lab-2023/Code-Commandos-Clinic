const express = require("express");
const router = express.Router();
const {
    addFamilyMember,
    getFamilyMembers
} = require("../controller/FamilyMemberController");
const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");

// task 18 and 22
router.post('/addFamilyMember/:patientId', addFamilyMember);
router.get('/getFamilyMembers',protect,checkPatientRole,getFamilyMembers);


module.exports=router