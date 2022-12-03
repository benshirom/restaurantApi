const mongoose = require("mongoose");

let VerificationSchema = new mongoose.Schema({
  id: String,
  uniqueString: String,
  createdAt: { type: Date, default: Date.now()},
  expiresAt: { type: Date, default: Date.now()+ 21600000},
 
})

exports.VerificationModel = mongoose.model("verify", VerificationSchema);
