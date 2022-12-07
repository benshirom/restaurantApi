const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

let userSchema = new mongoose.Schema({
  fullName: {
    firstName:{type: String, default: ""},
    lastName:{type: String, default: ""}
  },
  email:{type: String, default: ""},
  phone:{type: String, default: ""},
  password:{type: String, default: ""},
 
  // role of the user if regular user or admin
  role: {
    type: String, default: "user"
  },

  verified: { type: Boolean, default: false },
  active: { type: Boolean, default: true },

  worker: {
    pin: {type: String, default:null},
    jobs: [{ type: String }],
    restaurantID: [mongoose.ObjectId],

  },

  custumer: {
    address: {
      country:{type: String, default: ""} ,
      city:{type: String, default: ""} ,
      Street: {type: String, default: ""},
      num: {type: Number, default:null}
  },
    ordersaArr: [mongoose.ObjectId]
  },

});
userSchema.plugin(timestamps);
exports.UserModel = mongoose.model("users", userSchema);
