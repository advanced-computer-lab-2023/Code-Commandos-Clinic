const express = require("express");
const { accessChat, fetchChats, accessChatFromPharmacy } = require("../controller/ChatController");
const { protect } = require("../middleware/AuthenticationHandler");

const router = express.Router();

router.route("/accessChat").post(protect, accessChat); 
router.route("/fetchChats").get(protect, fetchChats);
router.route("/accesChatFromPharmacy").post(accessChatFromPharmacy); // cannot protect because it is accessed by pharmacy users

module.exports = router;
