const mongoose = require("mongoose");

let itemOrderSchema = new mongoose.Schema({

    itemMenuId: { type:mongoose.ObjectId, default:null},
    
    note:{ type:String, default:""},

},{timestamps:true})
exports.itemOrderModel = mongoose.model("itemorders", itemOrderSchema);
