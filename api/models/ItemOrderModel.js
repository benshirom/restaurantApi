const mongoose = require("mongoose");

let itemOrderSchema = new mongoose.Schema({
    itemMenuId: mongoose.ObjectId,
    
    note:{ type:String, default:""},

    
},{timestamps:true})
exports.ItemOrderModel = mongoose.model("itemorders", itemOrderSchema);
