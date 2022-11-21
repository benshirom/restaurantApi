const mongoose = require("mongoose");

let itemMenuSchema = new mongoose.Schema({
    workerID: mongoose.ObjectId,
    name: String,
    info: String,
    img: String,
    video: String,
    calories: { type: Number, default: 0 },
    Price: { type: Number, default: 0 },
    category: {
        name: String,
        subcategory: String
    },
    
    date_created: {
        type: Date, default: Date.now()
    },
})
exports.itemMenuModel = mongoose.model("itemMenus", itemMenuSchema);
