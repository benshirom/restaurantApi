const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

let restaurantSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    info:String,
    address: {
        country:{type: String, default: ""} ,
        city:{type: String, default: ""} ,
        Street: {type: String, default: ""},
        num: Number
    },
    creatorID: mongoose.ObjectId,
 
    gallry:{
        img:[{type: String, default: ""}],
        video:[{type: String, default: ""}],
    },
    //Item Menu Id
    menu:[mongoose.ObjectId],
    //Worker Id
    workersArray: [mongoose.ObjectId],
    //Table Id
    tables:[mongoose.ObjectId],
    //order Id
    orders:[mongoose.ObjectId],

    verified: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  
})
restaurantSchema.plugin(timestamps);
exports.RestaurantModel = mongoose.model("restaurants", restaurantSchema);
