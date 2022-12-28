const mongoose = require("mongoose");

let VerificationSchema = new mongoose.Schema({
  id: {type: String, default: ""},
  uniqueString: {type: String, default: ""},
  createdAt: { type: Date, default: Date.now()},
  //6 h
  expiresAt: { type: Date, default: Date.now()+ 21600000},
 
})


exports.VerificationModel = mongoose.model("verify", VerificationSchema);
