const express = require('express');
const { body } = require('express-validator');
const adController = require('../controllers/ad');

const router = express.Router();

const isAuth = require('../middlewares/isAuth');

// @route   POST /ad
// @desc    Post a new ad
// @access  protected
router.post(
  '/',
  isAuth,
  [
    body('productName', 'Invalid productName').trim().not().isEmpty(),
    body('basePrice', 'Invalid basePrice').trim().isNumeric(),
    body('duration', 'Invalid duration').trim().isNumeric(),
    body('startTime', 'Invalid startTime').optional().isISO8601(), // Validate ISO8601 date format
    body('endTime', 'Invalid endTime').optional().isISO8601(),
  ],
  adController.addAd
);

// @route   GET /ad?user=<userId>&option=<active>
// @desc    Retrieve list of all ads. Optional query param of user.
// @access  protected
router.get('/?', isAuth, adController.retrieveAds);

// @route   GET /ad/:id
// @desc    Find one ad
// @access  protected
router.get('/:id', isAuth, adController.findAd);

// @route   PUT /ad/:id
// @desc    Update an ad
// @access  protected
router.put('/:id', isAuth, adController.updateAd);

// @route   DELETE /ad/:id
// @desc    Delete an ad
// @access  protected
router.delete('/:id', isAuth, adController.deleteAd);

module.exports = router;