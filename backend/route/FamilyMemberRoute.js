const express = require("express");
const router = express.Router();
const {
    addFamilyMember,
    getFamilyMembers
} = require("../controller/FamilyMemberController");

// task 18
router.post('/addFamilyMember', addFamilyMember);
router.get('/getFamilyMembers/:patientId',getFamilyMembers);


module.exports=router