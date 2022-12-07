const mongoose = require("mongoose");

let itemOderSchema = new mongoose.Schema({
    itemMenuId: mongoose.ObjectId,
    
    note:{ type:String, default:""},

    
},{timestamps:true})
exports.itemOderModel = mongoose.model("itemoder", itemOderSchema);
