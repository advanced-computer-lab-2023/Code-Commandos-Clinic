const express = require("express");
const FamilyMember = require("../model/FamilyMember");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
    AddFamilyMember,
    getFamilyMembers
} = require("../controller/FamilyMemberController");

// task 18
router.post('/', AddFamilyMember);

router.get('/:idofpatient',getFamilyMembers);


module.exports=router