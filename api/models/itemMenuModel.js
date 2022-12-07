const mongoose = require("mongoose");

let itemMenuSchema = new mongoose.Schema({
    workerID: mongoose.ObjectId,
    name: String,
    info: { type: String, default: "" },
    img: { type: String, default: "" },
    video: { type: String, default: "" },
    calories: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    category: String,
    subCategory: { type: String, default: "" },
    

},{timestamps:true})
exports.itemMenuModel = mongoose.model("itemmenus", itemMenuSchema);
