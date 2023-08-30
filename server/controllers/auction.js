const Ad = require('../models/Ad');
const User = require('../models/User');
const io = require('../socket');

// @route   POST /auction/start/:adId
// @desc    Start auction
exports.startAuction = async (req, res, next) => {
  const { adId } = req.params;
  try {
    const now = new Date();
    console.log("came here!!");
    let ad = await Ad.findById(adId);
    
    ad.auctionStarted = true;
    await ad.save();
    // io.getIo().emit('auctionStarted', { action: 'started', data: ad });
    io.getAdIo()
      .to(ad._id.toString())
      .emit('auctionStarted', { action: 'started', data: ad });
    res.status(200).json({ msg: 'Auction started' });

    // Run down timer
    ad.timer = parseInt(ad.duration);
    ad.auctionEnded = false;
    let duration = parseInt(ad.duration);
    let timer = parseInt(ad.timer);
    let intervalTimer = setInterval(async () => {
      timer -= 1;
      await ad.updateOne({ timer: timer });
      io.getAdIo()
        .to(ad._id.toString())
        .emit('timer', {
          action: 'timerUpdate',
          data: { timer: timer, _id: ad._id },
        });
    }, 1000);
    setTimeout(async () => {
      clearInterval(intervalTimer);
      let auctionEndAd = await Ad.findById(ad._id).populate('owner', { password: 0 });
      auctionEndAd.auctionEnded = true;
      auctionEndAd.timer = 0;
      if (auctionEndAd.currentBidder) {
        console.log('ad sold');
        auctionEndAd.purchasedBy = auctionEndAd.currentBidder;
        auctionEndAd.sold = true;
        await auctionEndAd.save();
        // Add product to winner
        let winner = await User.findById(auctionEndAd.currentBidder);
        winner.purchasedProducts.push(auctionEndAd._id);
        await winner.save();
        io.getAdIo()
          .to(auctionEndAd._id.toString())
          .emit('auctionEnded', { action: 'sold', ad: auctionEndAd, winner: winner });
      } else {
        io.getAdIo()
          .to(auctionEndAd._id.toString())
          .emit('auctionEnded', { action: 'notSold', data: auctionEndAd });
        await auctionEndAd.save();
      }
    }, (duration + 1) * 1000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

const runTimer = async (ad) => {};
