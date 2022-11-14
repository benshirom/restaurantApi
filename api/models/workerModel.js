const mongoose = require("mongoose");

let WorkerSchema = new mongoose.Schema({
    fullName: {
        firstName: String,
        lastName: String
    },
    email: String,
    password: String,
    pin: Number,
    jobs: [{ type: String }],
    role: {
        type: String, default: "user"
    },
    phone: String,

    restaurantID: [mongoose.ObjectId],

    date_created: {
        type: Date, default: Date.now()
    },

    verified: { type: Boolean, default: false },
    active: { type: Boolean, default: true }




})

exports.WorkerModel = mongoose.model("Workers", WorkerSchema);