const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Types;

const paymentSchema = new mongoose.Schema(
  {
    ad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ad",
      required: true,
    },
    amount: {
      type: Decimal128,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    purchased: {
      type: Boolean,
      default: false,
    
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("payment", paymentSchema);
