const express = require("express");
const router = express.Router();
const {
    addFamilyMember,
    getFamilyMembers
} = require("../controller/FamilyMemberController");

// task 18 and 22
router.post('/addFamilyMember/:patientId', addFamilyMember);
router.get('/getFamilyMembers/:patientId',getFamilyMembers);


module.exports=router