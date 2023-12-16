const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
    {
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        title: {
          type: String,
          required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
