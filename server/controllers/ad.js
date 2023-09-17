const { validationResult } = require("express-validator");
const Ad = require("../models/Ad");
const Room = require("../models/Room");
const User = require("../models/User");
const io = require("../socket");
const moment = require('../middlewares/timezoneConfig');

// @route   POST /ad
// @desc    Post a new ad
exports.addAd = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let {
    productName,
    category,
    basePrice,
    description,
    images, // Assuming 'images' is an object with four keys
    startTime,
    endTime,
    duration,
  } = req.body;


  console.log("req. body", req.body);

  startTime = moment(req.body.startTime).valueOf();
  endTime = moment(req.body.endTime).valueOf();
  console.log("data refractures ", startTime, endTime);
  duration =  endTime- startTime;
  // if (duration === null || duration === 0) duration = 300;
  // if (duration > 10800) duration = 3600;
  const timer = duration;
  console.log("Data", 
  startTime, endTime, duration
  );

  console.log("Data", 
  moment(startTime).format('MMMM DD, YYYY hh:mm:ss'), 
  moment(endTime).format('MMMM DD, YYYY hh:mm:ss')
  );
  try {
    let ad = new Ad({
      productName,
      description,
      basePrice,
      currentPrice: basePrice,
      startTime,
      endTime,
      duration,
      timer,
      category,
      owner: req.user.id,
      images, // Store the object with four image paths directly in the 'images' field
    });
    
console.log(ad.startTime);
console.log(ad.endTime);

    // images.forEach((image, index) => {
    //   ad.images[index] = `/upload/image/${image}`; // Store the image paths as strings
    // });

    // Create room for auction
    let room = new Room({ ad: ad._id });
    room = await room.save();

    ad.room = room._id;
    await ad.save();

    const user = await User.findById(ad.owner);
    user.postedAds.push(ad._id);
    await user.save();

    io.getIo().emit("addAd", { action: "add", ad });

    res.status(200).json({ ad, room });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};
// exports.addAd = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: errors.array(),
//     });
//   }

//   let { productName, basePrice, startTime, endTime, duration, image, category, description } = req.body;
//   if (duration === null || duration === 0) duration = 300;
//   if (duration > 10800) duration = 3600;
//   const timer = duration;

//   try {
//     let ad = new Ad({
//       productName,
//       description,
//       basePrice,
//       currentPrice: basePrice,
//       startTime,
//       endTime,
//       duration,
//       timer,
//       image,
//       category,
//       owner: req.user.id,
//     });
//     ad.image = `/upload/image/${ad.image}`;

//     console.log("ad body", ad);
//     // Create room for auction
//     let room = new Room({ ad: ad._id });
//     room = await room.save();

//     ad.room = room._id;
//     ad = await ad.save();

//     const user = await User.findById(ad.owner);
//     user.postedAds.push(ad._id);
//     await user.save();

//     io.getIo().emit('addAd', { action: 'add', ad: ad });

//     res.status(200).json({ ad, room });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ errors: [{ msg: 'Server error' }] });
//   }
// };

// @route   GET /ad
// @desc    Retrieve list of all ads
exports.retrieveAds = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { user, option } = req.query;
  let adList = [];
  try {
    if (user) {
      adList = await Ad.find({ owner: user }).sort({ createdAt: -1 });
    } else if (option === "notexpired") {
      adList = await Ad.find({ auctionEnded: false }).sort({
        createdAt: -1,
      });
    } else {
      adList = await Ad.find().sort({ createdAt: -1 });
    }
    res.status(200).json(adList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

// @route   GET /ad/:id
// @desc    Find one ad
exports.findAd = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const adId = req.params.id; // id of type ObjectId (61a18153f926fdc2dd16d78b)
  try {
    const ad = await Ad.findById(adId).populate("owner", { password: 0 });
    if (!ad) return res.status(404).json({ errors: [{ msg: "Ad not found" }] });
    res.status(200).json(ad);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

// @route   PUT /ad/:id
// @desc    Update an ad
exports.updateAd = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const adId = req.params.id;
  try {
    // Check for authorization
    let ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ errors: [{ msg: "Ad not found" }] });
    if (ad.owner != req.user.id)
      return res
        .status(401)
        .json({ errors: [{ msg: "Unauthorized to delete this ad" }] });
    // Update all fields sent in body
    if (req.body.basePrice) {
      req.body.currentPrice = req.body.basePrice;
    }

    let updatedAd = await Ad.findByIdAndUpdate(adId, req.body);
    updatedAd = await Ad.findById(adId);

    res.status(200).json(updatedAd);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

// @route   DELETE /ad/:id
// @desc    Delete an ad
exports.deleteAd = async (req, res, next) => {
  const adId = req.params.id;
  try {
    let ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ errors: [{ msg: "Ad not found" }] });
    if (ad.owner != req.user.id)
      return res
        .status(401)
        .json({ errors: [{ msg: "Unauthorized to delete this ad" }] });
    if (ad.auctionStarted || ad.auctionEnded)
      return res
        .status(404)
        .json({ errors: [{ msg: "Cannot delete, auction started/ended" }] });
    await Ad.deleteOne(ad);
    res.status(200).json({ msg: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};