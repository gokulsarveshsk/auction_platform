// const User = require("../models/userModel");
// const bcrypt = require("bcrypt");

// module.exports.chatlogin = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user)
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     delete user.password;
//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// };

// module.exports.chatregister = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;
//     const usernameCheck = await User.findOne({ username });
//     if (usernameCheck)
//       return res.json({ msg: "Username already used", status: false });
//     const emailCheck = await User.findOne({ email });
//     if (emailCheck)
//       return res.json({ msg: "Email already used", status: false });
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       email,
//       username,
//       password: hashedPassword,
//     });
//     delete user.password;
//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// };

// module.exports.getAllUsers = async (req, res, next) => {
//   try {
//     const Users = await User.find({ _id: { $ne: req.params.id } }).select([
//       "email",
//       "username",
//       "avatarImage",
//       "_id",
//     ]);
//     return res.json(Users);
//   } catch (ex) {
//     next(ex);
//   }
// };

// module.exports.setAvatar = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const avatarImage = req.body.image;
//     const userData = await User.findByIdAndUpdate(
//       userId,
//       {
//         isAvatarImageSet: true,
//         avatarImage,
//       },
//       { new: true }
//     );
//     return res.json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (ex) {
//     next(ex);
//   }
// };

// module.exports.chatlogOut = (req, res, next) => {
//   try {
//     if (!req.params.id) return res.json({ msg: "User id is required " });
//     onlineUsers.delete(req.params.id);
//     return res.status(200).send();
//   } catch (ex) {
//     next(ex);
//   }
// };

const User = require("../models/User");
const bcrypt = require("bcrypt");
const Room = require("../models/Room");
const Ad = require("../models/Ad");

module.exports.chatlogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ email: username });
    console.log("uder", User)
    if (!user)
      return res.json({ msg: "ehy Incorrect Username or Password", status: false });
    delete user.password;
    delete user.phone;
    delete user.address;
    delete user.purchasedProducts;
    delete user.postedAds;
    delete user.bids;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.chatregister = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const Users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    console.log("req.params.i", req.params.id);
    const userRooms = await Room.find({ users: { $elemMatch: { $eq: req.params.id } } });

    // Step 2: Extract room IDs
    const roomIds = userRooms.map(room => room._id);
console.log("userRooms", userRooms);
    // Step 3: Find ads in those rooms and populate the owner user IDs
    const adsInRooms = await Ad.find({ roomId: { $in: roomIds } })
      .populate('owner'); // Assuming 'userId' is the field containing the owner's user ID in the Ad model

    // Extract the owner user IDs from the populated 'userId' field
    const adOwners = adsInRooms.map(ad => ad.owner);
    // console.log("adOwners", adOwners);
    return res.json(Users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.chatlogOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};