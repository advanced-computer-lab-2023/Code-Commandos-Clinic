const express = require("express");
const {
    getUserNotifications,
    deleteNotificationById,
} = require("../controller/NotificationController");
const { protect } = require("../middleware/AuthenticationHandler");

const router = express.Router();

router.get("/getUserNotifications",protect,getUserNotifications)
router.delete("/deleteNotificationById/:id",protect,deleteNotificationById)

module.exports = router;
