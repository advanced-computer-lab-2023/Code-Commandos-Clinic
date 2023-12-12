const express = require("express");
const {
  allMessages,
  sendMessage,
  sendMessageFromPharmacy,
} = require("../controller/MessageController");
const { protect } = require("../middleware/AuthenticationHandler");

const router = express.Router();

router.route("/allMessages/:chatId").get(protect, allMessages);
router.route("/sendMessage").post(protect, sendMessage); 
router.route("/sendMessageFromPharmacy").post(sendMessageFromPharmacy) // cannot protect as it is accessed by pharmacy users

module.exports = router;
