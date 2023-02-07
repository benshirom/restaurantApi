const mongoose = require("mongoose");

let tableSchema = new mongoose.Schema({
    //order id
    orderID: { type:mongoose.ObjectId, default:null}, 
    seats:{ type: Number, default: 0 },
    isCatched:{type:Boolean,default:false},
    status:{ type: String, default: "" },
    tableNumber:{ type: Number, default: 0 }
},{timestamps:true})
exports.TableModel = mongoose.model("tables", tableSchema);
