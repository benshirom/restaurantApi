const mongoose = require("mongoose");

let restaurantSchema = new mongoose.Schema({
    name: String,
    email: String,
    date_created: {
        type: Date, default: Date.now()
    },
    phone: String,
    address: {
        type: String, default: ""
    },
    creatorID: mongoose.ObjectId,
    workersArray: [mongoose.ObjectId],
    info:String,





})

exports.RestaurantModel = mongoose.model("restaurants", restaurantSchema);
