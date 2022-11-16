const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  fullName: {
    firstName: String,
    lastName: String
  },
  email: String,
  phone: String,
  password: String,
  date_created: {
    type: Date, default: Date.now()
  },
  // role of the user if regular user or admin
  role: {
    type: String, default: "user"
  },

  verified: { type: Boolean, default: false },
  active: { type: Boolean, default: true },

  worker: {
    pin: Number,
    jobs: [{ type: String }],
    restaurantID: [mongoose.ObjectId],

  },

  custumer: {
    address: {
      country:{type: String, default: ""} ,
      city:{type: String, default: ""} ,
      Street: {type: String, default: ""},
      num: Number
  },
    ordersaArr: [mongoose.ObjectId]
  }

})

exports.UserModel = mongoose.model("users", userSchema);
