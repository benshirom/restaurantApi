const mongoose = require("mongoose");

let restaurantVerificationSchema = new mongoose.Schema({
  restaurantId: String,
  uniqueString: String,
  createdAt: { type: Date, default: Date.now()},
  expiresAt: { type: Date, default: Date.now()+ 21600000},
 
})

exports.restaurantVerificationModel = mongoose.model("verifyrestaurants", restaurantVerificationSchema);
