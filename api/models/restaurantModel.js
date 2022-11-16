const mongoose = require("mongoose");

let restaurantSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    info:String,
    creatorID: mongoose.ObjectId,
    address: {
        Country:{type: String, default: ""} ,
        Street: {type: String, default: ""}
    },
    date_created: {
        type: Date, default: Date.now()
    },
    gallry:[{type: String}], 
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

exports.RestaurantModel = mongoose.model("restaurants", restaurantSchema);
