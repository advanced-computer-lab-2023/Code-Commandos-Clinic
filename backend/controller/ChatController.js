const asyncHandler = require("express-async-handler");
const Chat = require("../model/Chat");
const User = require("../model/User");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  const user = await User.findOne({username:req.user.username})

  var isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  try{
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username",
    });
  } catch(error) {
    // do nothing
  }

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    
    var chatData = {
      chatName: "sender",
      users: [user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400).json(error.message);
      throw new Error(error.message);
    }
  }
});

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChatFromPharmacy = asyncHandler(async (req, res) => {
  const { userId, pharmacistUsername, pharmacyChatId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = {}
  // if(req.user)
  // isChat = await Chat.find({
  //   $and: [
  //     { users: { $elemMatch: { $eq: req.user._id } } },
  //     { users: { $elemMatch: { $eq: userId } } },
  //   ],
  // })
  //   .populate("users", "-password")
  //   .populate("latestMessage");

  // try{
  //   isChat = await User.populate(isChat, {
  //     path: "latestMessage.sender",
  //     select: "username",
  //   });
  // } catch(error) {
  //   // do nothing
  // }

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      users: [userId],
      pharmacistUsername: pharmacistUsername,
      pharmacyChatId: pharmacyChatId
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400).json(error.message);
      throw new Error(error.message);
    }
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({username:req.user.username})
    Chat.find({ users: { $elemMatch: { $eq: user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        for(const result of results) {
          if(result.latestMessage) {
            const user = await User.findOne({_id:result.latestMessage.sender})
            if(user)
              result.latestMessage.sender = user
          }
        }
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  accessChatFromPharmacy
};
