const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

let itemOderSchema = new mongoose.Schema({
    itemMenuId: mongoose.ObjectId,
    
    note:{ type:String, default:""},

    
})
itemOderSchema.plugin(timestamps);
exports.itemOderModel = mongoose.model("itemoder", itemOderSchema);
