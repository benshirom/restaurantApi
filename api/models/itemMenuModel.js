const mongoose = require("mongoose");

let itemMenuSchema = new mongoose.Schema({
    workerID: { type:mongoose.ObjectId, default:null},
    name: { type: String, default: "" },
    info: { type: String, default: "" },
    img: { type: String, default: "" },
    video: { type: String, default: "" },
    calories: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    category: { type: String, default: "" },
    subCategory: { type: String, default: "" },
    active: { type: Boolean, default: true },


},{timestamps:true})
exports.itemMenuModel = mongoose.model("itemmenus", itemMenuSchema);
