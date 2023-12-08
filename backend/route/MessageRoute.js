const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controller/MessageController");
const { protect } = require("../middleware/AuthenticationHandler");

const router = express.Router();

router.route("/allMessages/:chatId").get(protect, allMessages);
router.route("/sendMessage").post(protect, sendMessage);

module.exports = router;
