const asyncHandler = require("express-async-handler");
const Message = require("../model/Message");
const User = require("../model/User");
const Chat = require("../model/Chat");
const axios = require("axios")

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    var messages = await Message.find({ chat: req.params.chatId })
      .populate("chat");
    if(messages.length>0 && messages[0].chat.pharmacyChatId) {
      for(var message of messages) 
        message._doc.sender = {_id:message.sender}
    } else {
      messages = await User.populate(messages, "sender")
    }
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const  user = await User.findOne({username:req.user.username}).select("-password")

  var newMessage = {
    sender: user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username",
    });
    

    const chat = await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    if(chat.pharmacyChatId){
      const response = await axios.post(`http://localhost:8090/api/message/sendMessageFromClinic/`, {
        content: content, 
        chatId: chat.pharmacyChatId,
        sender: user._id
      });
      console.log(await response.data)
    }

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessageFromPharmacy = asyncHandler(async (req, res) => {
  const { content, chatId, sender } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: sender,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message.sender = {_id:sender}
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username",
    });
    console.log(message)
    

    const chat = await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage, sendMessageFromPharmacy };
