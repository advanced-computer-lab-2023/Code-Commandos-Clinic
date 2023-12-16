const asyncHandler = require("express-async-handler");
const Notification = require("../model/Notification");
const Patient = require("../model/Patient");
const Doctor = require("../model/Doctor");
const Admin = require("../model/Admin");


const getUserNotifications = asyncHandler(async (req,res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const deleteNotificationById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const deletedNotification = await Notification.findByIdAndDelete(id);
        if (!deletedNotification) {
            res.status(404)
            throw new Error("Notification not found")
        }
        res.status(200).json(deletedNotification);
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
});

module.exports = {
    getUserNotifications,
    deleteNotificationById
}
