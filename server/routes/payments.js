const express = require("express");
const router = express.Router();
const Payment = require("../models/PaymentSchema.js");

// Create a new payment for an ad
router.post("/", async (req, res) => {
  try {
    const { adId, amount } = req.body;
    const payment = new Payment({
      ad: adId,
      amount: amount,
      purchased: true
    });
    const payments = await Payment.find({ ad: adId });
    console.log(payments);
    //only one payment per ad
    if (payments.length > 0) {
      return res.status(400).json({ message: "Payment already exists" });
    }
    
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get payments for a specific ad
router.get("/:adId", async (req, res) => {
  try {
    const adId = req.params.adId;
    const payments = await Payment.find({ ad: adId });
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
