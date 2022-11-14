const mongoose = require("mongoose");

let itemMenuSchema = new mongoose.Schema({
    workerID: mongoose.ObjectId,
    date_created: {
        type: Date, default: Date.now()
    },
    info: String,
    img: String,
    video: String,
    Price: { type: Number, default: 0 },
    category: {
        name: String,
        subcategory: String
    },

})
exports.itemMenuModel = mongoose.model("itemMenus", itemMenuSchema);
