const express = require("express");
const { accessChat, fetchChats } = require("../controller/ChatController");
const { protect } = require("../middleware/AuthenticationHandler");

const router = express.Router();

router.route("/accessChat").post(protect, accessChat);
router.route("/fetchChats").get(protect, fetchChats);

module.exports = router;
