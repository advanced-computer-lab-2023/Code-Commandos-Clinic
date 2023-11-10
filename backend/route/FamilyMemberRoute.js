const express = require("express");
const router = express.Router();
const {
    addFamilyMember,
    getFamilyMembers,
    linkFamilyMember
} = require("../controller/FamilyMemberController");

const {protect} = require("../middleware/AuthenticationHandler");
const {checkPatientRole} = require("../middleware/AccessHandler");

router.get('/getFamilyMembers',protect,checkPatientRole,getFamilyMembers);
router.post('/addFamilyMember',protect,checkPatientRole,addFamilyMember);
router.post('/linkFamilyMember',protect,checkPatientRole,linkFamilyMember);

module.exports=router