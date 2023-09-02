const { validationResult } = require('express-validator');
const Ad = require('../models/Ad');
const Room = require('../models/Room');
const User = require('../models/User');
const io = require('../socket');

// @route   POST /ad
// @desc    Post a new ad
// exports.addAd = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: errors.array(),
//     });
//   }

//   let { productName, basePrice, startTime, endTime, duration, images, category, description } = req.body;
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
//       images,
//       category,
//       owner: req.user.id,
//     });
//     ad.images = `/upload/image/${ad.images}`;

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

//DURATION BY MATHS
// exports.addAd = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: errors.array(),
//     });
//   }

//   const {
//     productName,
//     basePrice,
//     startTime,
//     endTime,
//     category,
//     description,
//     images, // Assuming 'images' is an array of image paths
//   } = req.body;

//   // Calculate the duration in seconds based on startTime and endTime
//   const startTimeDate = new Date(startTime);
//   const endTimeDate = new Date(endTime);
//   const duration = Math.floor((endTimeDate - startTimeDate) / 1000); // Convert milliseconds to seconds

//   if (duration <= 0) {
//     return res.status(400).json({
//       errors: [{ msg: 'Invalid duration' }],
//     });
//   }

//   const timer = duration;

//   try {
//     const ad = new Ad({
//       productName,
//       description,
//       basePrice,
//       currentPrice: basePrice,
//       startTime,
//       endTime,
//       duration,
//       timer,
//       category,
//       owner: req.user.id,
//       images, // Store the array of image paths directly in the 'images' field
//     });

//     // Create room for auction
//     let room = new Room({ ad: ad._id });
//     room = await room.save();

//     ad.room = room._id;
//     await ad.save();

//     const user = await User.findById(ad.owner);
//     user.postedAds.push(ad._id);
//     await user.save();

//     io.getIo().emit('addAd', { action: 'add', ad });

//     res.status(200).json({ ad, room });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ errors: [{ msg: 'Server error' }] });
//   }
// };

// DURATION BY MOMENT
const moment = require('moment'); // Import the moment library for date/time calculations

exports.addAd = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const {
    productName,
    basePrice,
    startTime,
    endTime,
    category,
    description,
    images,
  } = req.body;

  // Calculate the duration as the difference between endTime and startTime
  const startMoment = moment(startTime);
  const endMoment = moment(endTime);
  const durationInSeconds = endMoment.diff(startMoment, 'seconds');

  if (durationInSeconds <= 0) {
    // Handle the case where the duration is invalid (negative or zero)
    return res.status(400).json({
      errors: [{ msg: 'Invalid duration' }],
    });
  }

  try {
    const ad = new Ad({
      productName,
      description,
      basePrice,
      currentPrice: basePrice,
      startTime,
      endTime,
      duration: durationInSeconds, // Set the calculated duration
      timer: durationInSeconds, // Set the timer to the same value
      category,
      owner: req.user.id,
      images,
    });

    // Create room for auction
    let room = new Room({ ad: ad._id });
    room = await room.save();

    ad.room = room._id;
    await ad.save();

    const user = await User.findById(ad.owner);
    user.postedAds.push(ad._id);
    await user.save();

    io.getIo().emit('addAd', { action: 'add', ad });

    res.status(200).json({ ad, room });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};


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
    } else if (option === 'notexpired') {
      adList = await Ad.find({ auctionEnded: false }).sort({
        createdAt: -1,
      });
    } else {
      adList = await Ad.find().sort({ createdAt: -1 });
    }
    res.status(200).json(adList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
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
    const ad = await Ad.findById(adId).populate('owner', { password: 0 });
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    res.status(200).json(ad);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
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
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    if (ad.owner != req.user.id)
      return res
        .status(401)
        .json({ errors: [{ msg: 'Unauthorized to delete this ad' }] });
    // Update all fields sent in body
    if (req.body.basePrice) {
      req.body.currentPrice = req.body.basePrice;
    }

    let updatedAd = await Ad.findByIdAndUpdate(adId, req.body);
    updatedAd = await Ad.findById(adId);

    res.status(200).json(updatedAd);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   DELETE /ad/:id
// @desc    Delete an ad
exports.deleteAd = async (req, res, next) => {
  const adId = req.params.id;
  try {
    let ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    if (ad.owner != req.user.id)
      return res
        .status(401)
        .json({ errors: [{ msg: 'Unauthorized to delete this ad' }] });
    if (ad.auctionStarted || ad.auctionEnded)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Cannot delete, auction started/ended' }] });
    await Ad.deleteOne(ad);
    res.status(200).json({ msg: 'Deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
