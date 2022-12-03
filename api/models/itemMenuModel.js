const { string } = require("joi");
const mongoose = require("mongoose");

let itemMenuSchema = new mongoose.Schema({
    workerID: mongoose.ObjectId,
    name: String,
    info: { type: String, default: "" },
    img: { type: String, default: "" },
    video: { type: String, default: "" },
    calories: { type: Number, default: 0 },
    Price: { type: Number, default: 0 },
    category: {
        name: String,
        subcategory: { type: String, default: "" }
    },
    
    date_created: {
        type: Date, default: Date.now()
    },
})
exports.itemMenuModel = mongoose.model("itemmenus", itemMenuSchema);
